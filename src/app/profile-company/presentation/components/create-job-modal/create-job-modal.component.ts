import { Component, EventEmitter, Output } from '@angular/core';
import { Job } from 'src/app/jobs/domain/entities/job.interface';

@Component({
  selector: 'app-create-job-modal',
  templateUrl: './create-job-modal.component.html',
  styleUrls: ['./create-job-modal.component.css']
})
export class CreateJobModalComponent {

  @Output() jobCreated = new EventEmitter<Job>();
  @Output() closeModal = new EventEmitter<void>();

  jobForm = {
    title: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    remote: false,
    applicationDeadline: ''
  };

  jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  constructor() { }

  onSubmit(): void {
    if (this.isFormValid()) {
      const newJob: Job = {
        id: Date.now(), // En un caso real, esto vendría del backend
        title: this.jobForm.title,
        company: 'TechCorp Solutions', // En un caso real, esto vendría del contexto de la empresa
        location: this.jobForm.location,
        type: this.jobForm.type,
        salary: this.jobForm.salary,
        description: this.jobForm.description,
        requirements: this.jobForm.requirements.filter(req => req.trim() !== ''),
        benefits: this.jobForm.benefits.filter(benefit => benefit.trim() !== ''),
        postedDate: new Date(),
        applicationDeadline: new Date(this.jobForm.applicationDeadline),
        contactEmail: 'hr@techcorp-solutions.com',
        remote: this.jobForm.remote
      };

      this.jobCreated.emit(newJob);
      this.resetForm();
    }
  }

  onClose(): void {
    this.closeModal.emit();
    this.resetForm();
  }

  addRequirement(): void {
    this.jobForm.requirements.push('');
  }

  removeRequirement(index: number): void {
    if (this.jobForm.requirements.length > 1) {
      this.jobForm.requirements.splice(index, 1);
    }
  }

  addBenefit(): void {
    this.jobForm.benefits.push('');
  }

  removeBenefit(index: number): void {
    if (this.jobForm.benefits.length > 1) {
      this.jobForm.benefits.splice(index, 1);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  isFormValid(): boolean {
    return !!(
      this.jobForm.title.trim() &&
      this.jobForm.location.trim() &&
      this.jobForm.salary.trim() &&
      this.jobForm.description.trim() &&
      this.jobForm.applicationDeadline &&
      this.jobForm.requirements.some(req => req.trim() !== '') &&
      this.jobForm.benefits.some(benefit => benefit.trim() !== '')
    );
  }

  private resetForm(): void {
    this.jobForm = {
      title: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: [''],
      benefits: [''],
      remote: false,
      applicationDeadline: ''
    };
  }
}
