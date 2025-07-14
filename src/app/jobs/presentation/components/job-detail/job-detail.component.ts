import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Job } from 'src/app/jobs/domain/entities/job.interface';
import { ApplicationCreate, Application } from 'src/app/jobs/domain/entities/application.interface';
import { ApplicationService } from 'src/app/jobs/domain/services/application.service';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  @Input() job: Job | null = null;
  @Input() showCompanyActions = false; // Nueva propiedad para mostrar acciones de empresa
  @Output() applicationSubmitted = new EventEmitter<void>();
  @Output() editJob = new EventEmitter<Job>(); // Nuevo evento para editar trabajo
  @Output() deleteJob = new EventEmitter<Job>(); // Nuevo evento para eliminar trabajo
  @Output() statusUpdated = new EventEmitter<{ applicationId: number, status: string }>(); // Evento para actualizar estado
  @Output() viewAllApplications = new EventEmitter<number>(); // Evento para ver todas las postulaciones

  showApplicationModal = false;
  applicationData: ApplicationCreate = { job: 0 };
  selectedFile: File | null = null;
  isSubmitting = false;
  isResearcher = false;
  loadingAllApplications = false;
  showAllApplications = false;

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
    * Construye la URL completa del archivo usando la URL base del backend
    */
  getFullFileUrl(relativePath: string): string {
    if (!relativePath) return '';

    // Si ya es una URL completa, devolverla tal como está
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }

    // Construir la URL completa
    const baseUrl = environment.apiUrl.replace('/api', '');
    let url = relativePath;

    // Asegurar que la URL comience con '/'
    if (!url.startsWith('/')) {
      url = '/' + url;
    }

    return `${baseUrl}${url}`;
  }

  /**
   * Verificar si el usuario puede postularse a este trabajo
   */
  canApplyToJob(): boolean {
    if (!this.job || !this.isResearcher) {
      return false;
    }

    // No puede postularse si ya postuló
    if (this.job.has_applied) {
      return false;
    }

    return true;
  }

  /**
   * Obtener el texto del botón de postulación
   */
  getApplicationButtonText(): string {
    if (!this.job) return 'Postularse';

    if (this.job.has_applied) {
      return 'Ya postulado';
    }

    return 'Postularse';
  }

  /**
   * Obtener el estado de la postulación del usuario
   */
  getUserApplicationStatus(): string | null {
    if (!this.job?.user_application) return null;
    return this.job.user_application.status_display;
  }

  /**
   * Verificar si es una empresa
   */
  get isCompany(): boolean {
    const companyId = this.authService.getCompanyId();
    return !!companyId;
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

    // Resetear el input file
    const fileInput = document.getElementById('resumeFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  /**
   * Manejar selección de archivo
   */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else if (file) {
      alert('Por favor selecciona un archivo PDF válido.');
      event.target.value = '';
      this.selectedFile = null;
    } else {
      this.selectedFile = null;
    }
  }

  /**
   * Enviar aplicación
   */
  submitApplication(): void {
    if (!this.job?.id) return;

    // Validar que el CV sea obligatorio
    if (!this.selectedFile) {
      alert('El CV es obligatorio para postular a este trabajo.');
      return;
    }

    this.isSubmitting = true;

    const applicationData: ApplicationCreate = {
      job: this.job.id,
      cover_letter: this.applicationData.cover_letter,
      resume_file: this.selectedFile // Ahora siempre será requerido
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

  canSubmitApplication(): boolean {
    return this.selectedFile !== null && this.selectedFile !== undefined;
  }


  /**
   * Emitir evento para editar trabajo
   */
  onEditJob(): void {
    if (this.job) {
      this.editJob.emit(this.job);
    }
  }

  /**
   * Emitir evento para eliminar trabajo
   */
  onDeleteJob(): void {
    if (this.job) {
      this.deleteJob.emit(this.job);
    }
  }

  /**
   * Actualizar el estado de una postulación (solo para empresas)
   */
  updateApplicationStatus(applicationId: number, status: string): void {
    if (!this.isCompany) return;

    this.applicationService.updateApplication(applicationId, {
      status: status as any
    }).subscribe({
      next: (updatedApplication) => {
        // Emitir evento para que el componente padre actualice los datos
        // Enviamos el ID de la aplicación y el nuevo estado para que se actualice correctamente
        this.statusUpdated.emit({ applicationId, status });

        // Actualizar las aplicaciones recientes en el job actual si existen
        if (this.job && this.job.recent_applications) {
          const index = this.job.recent_applications.findIndex(app => app.id === applicationId);
          if (index !== -1) {
            this.job.recent_applications[index].status = status;
            this.job.recent_applications[index].status_display =
              this.getStatusOptions().find(opt => opt.value === status)?.label || '';
          }
        }
      },
      error: (error: any) => {
        console.error('Error updating application status:', error);
        alert('Error al actualizar el estado de la postulación');
      }
    });
  }

  /**
   * Obtener clases CSS para el badge de estado
   */
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-orange-100 text-orange-800'; // Naranja para "Cerrado"

      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Obtener opciones de estado para el select
   */
  getStatusOptions(): { value: string, label: string }[] {
    return [
      { value: 'pending', label: 'Pendiente' },
      { value: 'reviewing', label: 'En revisión' },
      { value: 'interviewed', label: 'Entrevistado' },
      { value: 'accepted', label: 'Aceptado' },
      { value: 'rejected', label: 'Cerrado' }, // 🎭 MAQUILLADO: de "Rechazado" a "Cerrado"
      { value: 'withdrawn', label: 'Retirado' }
    ];
  }
  /**
   * Manejar cambio de estado desde la vista de empresa
   */
  onStatusChange(event: Event, applicationId: number): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      // Llamar a updateApplicationStatus en lugar de emitir directamente
      // Esto asegura que la base de datos se actualice correctamente
      this.updateApplicationStatus(applicationId, target.value);
    }
  }

  /**
   * Ver todas las postulaciones
   */
  onViewAllApplications(): void {
    if (this.job?.id) {
      this.viewAllApplications.emit(this.job.id);
    }
  }

  /**
   * Verificar si la empresa tiene postulaciones recientes para mostrar
   */
  hasRecentApplications(): boolean {
    return !!(this.isCompany && this.job?.recent_applications && this.job.recent_applications.length > 0);
  }

  /**
   * Verificar si hay más postulaciones que las mostradas
   */
  hasMoreApplications(): boolean {
    if (!this.job?.applications_count || !this.job?.recent_applications) {
      return false;
    }
    return this.job.applications_count > this.job.recent_applications.length;
  }

  /**
   * Obtener el número de postulaciones recientes mostradas
   */
  getRecentApplicationsCount(): number {
    return this.job?.recent_applications?.length || 0;
  }

  /**
   * Obtener el total de postulaciones
   */
  getTotalApplicationsCount(): number {
    return this.job?.applications_count || 0;
  }

  /**
   * Verificar si no hay postulaciones para empresas
   */
  hasNoApplications(): boolean {
    return !!(this.isCompany && this.job?.applications_count === 0);
  }
}
