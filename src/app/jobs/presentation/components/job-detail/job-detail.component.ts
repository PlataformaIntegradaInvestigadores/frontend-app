import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Job } from 'src/app/jobs/domain/entities/job.interface';
import { ApplicationCreate } from 'src/app/jobs/domain/entities/application.interface';
import { ApplicationService } from 'src/app/jobs/domain/services/application.service';
import { AuthService } from 'src/app/auth/domain/services/auth.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  @Input() job: Job | null = null;
  @Output() applicationSubmitted = new EventEmitter<void>();
  
  showApplicationModal = false;
  applicationData: ApplicationCreate = { job: 0 };
  selectedFile: File | null = null;
  isSubmitting = false;
  isResearcher = false;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {
    this.checkUserType();
  }

  private checkUserType(): void {
    const userId = this.authService.getUserId();
    const companyId = this.authService.getCompanyId();
    this.isResearcher = !!userId && !companyId;
  }

  /**
   * Get CSS classes for job type badge
   */
  getJobTypeClasses(jobType: string): string {
    switch (jobType) {
      case 'full_time':
        return 'bg-green-100 text-green-800';
      case 'part_time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-yellow-100 text-yellow-800';
      case 'freelance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Get formatted salary for display
   */
  getFormattedSalary(job: Job): string {
    if (job.salary_min && job.salary_max) {
      return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`;
    } else if (job.salary_min) {
      return `Desde $${job.salary_min.toLocaleString()}`;
    } else if (job.salary_max) {
      return `Hasta $${job.salary_max.toLocaleString()}`;
    }
    return 'Salario a convenir';
  }

  /**
   * Convierte requirements string en array para mostrar como lista
   */
  getRequirementsArray(requirements?: string): string[] {
    if (!requirements) return [];
    return requirements.split('\n').filter(req => req.trim() !== '');
  }

  /**
   * Convierte benefits string en array para mostrar como lista
   */
  getBenefitsArray(benefits?: string): string[] {
    if (!benefits) return [];
    return benefits.split('\n').filter(benefit => benefit.trim() !== '');
  }

  /**
   * Abrir modal de aplicación
   */
  openApplicationModal(): void {
    if (!this.job) return;
    
    this.applicationData = { 
      job: this.job.id!,
      cover_letter: '',
      resume_file: undefined
    };
    this.selectedFile = null;
    this.showApplicationModal = true;
  }

  /**
   * Cerrar modal de aplicación
   */
  closeApplicationModal(): void {
    this.showApplicationModal = false;
    this.applicationData = { job: 0 };
    this.selectedFile = null;
  }

  /**
   * Manejar selección de archivo
   */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Por favor selecciona un archivo PDF válido.');
      event.target.value = '';
    }
  }

  /**
   * Enviar aplicación
   */
  submitApplication(): void {
    if (!this.job?.id) return;

    this.isSubmitting = true;
    
    const applicationData: ApplicationCreate = {
      job: this.job.id,
      cover_letter: this.applicationData.cover_letter,
      resume_file: this.selectedFile || undefined
    };

    this.applicationService.createApplication(applicationData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.closeApplicationModal();
        this.applicationSubmitted.emit();
        alert('¡Aplicación enviada exitosamente!');
      },
      error: (error: any) => {
        this.isSubmitting = false;
        console.error('Error submitting application:', error);
        if (error.error?.detail) {
          alert(`Error: ${error.error.detail}`);
        } else {
          alert('Error al enviar la aplicación. Por favor intenta de nuevo.');
        }
      }
    });
  }
}
