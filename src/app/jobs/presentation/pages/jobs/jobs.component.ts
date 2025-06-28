import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/jobs/domain/entities/job.interface';
import { Application } from 'src/app/jobs/domain/entities/application.interface';
import { JobsService } from 'src/app/jobs/domain/services/job.service';
import { ApplicationService } from 'src/app/jobs/domain/services/application.service';
import { AuthService } from 'src/app/auth/domain/services/auth.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  applications: Application[] = [];
  loading = false;
  applicationsLoading = false;
  activeTab: 'recommendations' | 'trending' | 'my-jobs' | 'my-applications' = 'recommendations';
  isCompany = false;
  isResearcher = false;
  jobApplications: Application[] = []; // Para las aplicaciones de un trabajo específico (vista empresa)
  showNotesModal = false;
  selectedApplication: Application | null = null;
  notesText = '';

  constructor(
    private jobsService: JobsService,
    private applicationService: ApplicationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkUserType();
  }

  private checkUserType(): void {
    const userId = this.authService.getUserId();
    const companyId = this.authService.getCompanyId();
    
    this.isCompany = !!companyId;
    this.isResearcher = !!userId && !companyId;
    
    if (this.isCompany) {
      this.activeTab = 'my-jobs';
      this.loadCompanyJobs();
    } else {
      this.activeTab = 'recommendations';
      this.loadRecommendations();
    }
  }

  loadRecommendations(): void {
    this.loading = true;
    this.jobsService.getRecommendedJobs().subscribe({
      next: (response) => {
        this.jobs = response.results;
        if (this.jobs.length > 0) {
          this.selectedJob = this.jobs[0];
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading recommendations:', error);
        this.loading = false;
      }
    });
  }

  loadTrending(): void {
    this.loading = true;
    this.jobsService.getTrendingJobs().subscribe({
      next: (response) => {
        this.jobs = response.results;
        if (this.jobs.length > 0) {
          this.selectedJob = this.jobs[0];
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading trending jobs:', error);
        this.loading = false;
      }
    });
  }

  loadCompanyJobs(): void {
    this.loading = true;
    this.jobsService.getJobs().subscribe({
      next: (jobs: Job[]) => {
        this.jobs = jobs;
        if (jobs.length > 0) {
          this.selectedJob = jobs[0];
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading company jobs:', error);
        this.loading = false;
      }
    });
  }

  loadMyApplications(): void {
    this.applicationsLoading = true;
    this.applicationService.getApplications().subscribe({
      next: (applications: Application[]) => {
        this.applications = applications;
        this.applicationsLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading applications:', error);
        this.applicationsLoading = false;
      }
    });
  }

  selectJob(job: Job): void {
    this.selectedJob = job;
    
    // Si es empresa y estamos en "my-jobs", cargar aplicaciones para este trabajo
    if (this.isCompany && this.activeTab === 'my-jobs' && job.id) {
      this.loadJobApplications(job.id);
    }
  }

  /**
   * Cargar aplicaciones para un trabajo específico (vista empresa)
   */
  loadJobApplications(jobId: number): void {
    this.applicationsLoading = true;
    this.applicationService.getJobApplications(jobId).subscribe({
      next: (applications: Application[]) => {
        this.jobApplications = applications;
        this.applicationsLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading job applications:', error);
        this.applicationsLoading = false;
      }
    });
  }

  /**
   * Actualizar el estado de una aplicación (vista empresa)
   */
  updateApplicationStatus(applicationId: number, status: string, notes?: string): void {
    this.applicationService.updateApplication(applicationId, { 
      status: status as any, 
      notes: notes 
    }).subscribe({
      next: (updatedApplication: Application) => {
        // Actualizar la aplicación en la lista
        const index = this.jobApplications.findIndex(app => app.id === applicationId);
        if (index !== -1) {
          this.jobApplications[index] = updatedApplication;
        }
      },
      error: (error: any) => {
        console.error('Error updating application status:', error);
      }
    });
  }

  /**
   * Manejar cambio en el select de estado
   */
  onStatusChange(event: Event, applicationId: number): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.updateApplicationStatus(applicationId, target.value);
    }
  }

  /**
   * Manejar cuando se envía una aplicación nueva
   */
  onApplicationSubmitted(): void {
    // Recargar aplicaciones si estamos en la vista de aplicaciones
    if (this.activeTab === 'my-applications') {
      this.loadMyApplications();
    }
  }

  /**
   * Abrir modal para editar notas
   */
  openNotesModal(application: Application): void {
    this.selectedApplication = application;
    this.notesText = application.notes || '';
    this.showNotesModal = true;
  }

  /**
   * Cerrar modal de notas
   */
  closeNotesModal(): void {
    this.showNotesModal = false;
    this.selectedApplication = null;
    this.notesText = '';
  }

  /**
   * Guardar notas de la aplicación
   */
  saveNotes(): void {
    if (!this.selectedApplication) return;

    this.applicationService.updateApplication(this.selectedApplication.id, {
      notes: this.notesText
    }).subscribe({
      next: (updatedApplication: Application) => {
        // Actualizar la aplicación en la lista
        const index = this.jobApplications.findIndex(app => app.id === this.selectedApplication!.id);
        if (index !== -1) {
          this.jobApplications[index] = updatedApplication;
        }
        this.closeNotesModal();
      },
      error: (error: any) => {
        console.error('Error updating application notes:', error);
      }
    });
  }

  setActiveTab(tab: 'recommendations' | 'trending' | 'my-jobs' | 'my-applications'): void {
    this.activeTab = tab;
    
    switch (tab) {
      case 'recommendations':
        this.loadRecommendations();
        break;
      case 'trending':
        this.loadTrending();
        break;
      case 'my-jobs':
        this.loadCompanyJobs();
        break;
      case 'my-applications':
        this.loadMyApplications();
        break;
    }
  }

  getListTitle(): string {
    switch (this.activeTab) {
      case 'recommendations':
        return 'Recomendaciones para Ti';
      case 'trending':
        return 'Trabajos Populares';
      case 'my-jobs':
        return 'Mis Trabajos Publicados';
      case 'my-applications':
        return 'Mis Postulaciones';
      default:
        return 'Trabajos Disponibles';
    }
  }
}
