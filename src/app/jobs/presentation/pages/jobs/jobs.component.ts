import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/jobs/domain/entities/job.interface';
import { JobsService } from 'src/app/jobs/domain/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  loading = false;

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobsService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        if (jobs.length > 0) {
          this.selectedJob = jobs[0];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.loading = false;
      }
    });
  }

  selectJob(job: Job): void {
    this.selectedJob = job;
  }

  isJobSelected(job: Job): boolean {
    return this.selectedJob?.id === job.id;
  }

  trackByJobId(index: number, job: Job): number {
    return job.id;
  }
}
