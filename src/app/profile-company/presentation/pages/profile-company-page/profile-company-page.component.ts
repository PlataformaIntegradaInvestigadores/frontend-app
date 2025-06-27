import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/jobs/domain/entities/job.interface';
import { JobsService } from 'src/app/jobs/domain/services/job.service';
import { Company } from 'src/app/profile-company/domain/entities/company.interface';
import { CompanyService } from 'src/app/profile-company/domain/services/company.service';

@Component({
    selector: 'app-company-profile',
    templateUrl: './profile-company-page.component.html',
    styleUrls: ['./profile-company-page.component.css']
})
export class CompanyProfilePageComponent implements OnInit {

    company: Company | null = null;
    companyJobs: Job[] = [];
    activeTab: 'about' | 'jobs' = 'about';
    loading = false;
    showCreateJobModal = false;

    constructor(
        private companyService: CompanyService,
        private jobsService: JobsService
    ) { }

    ngOnInit(): void {
        this.loadCompanyProfile();
        this.loadCompanyJobs();
    }

    loadCompanyProfile(): void {
        this.loading = true;
        this.companyService.getCompanyProfile().subscribe({
            next: (company) => {
                this.company = company;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading company profile:', error);
                this.loading = false;
            }
        });
    }

    loadCompanyJobs(): void {
        this.jobsService.getAllJobs().subscribe({
            next: (jobs) => {
                // Filtrar trabajos de la empresa actual
                this.companyJobs = jobs.filter(job => job.company === 'TechCorp Solutions');
            },
            error: (error) => {
                console.error('Error loading company jobs:', error);
            }
        });
    }

    setActiveTab(tab: 'about' | 'jobs'): void {
        this.activeTab = tab;
    }

    openCreateJobModal(): void {
        this.showCreateJobModal = true;
    }

    closeCreateJobModal(): void {
        this.showCreateJobModal = false;
    }

    onJobCreated(job: Job): void {
        this.companyJobs.unshift(job);
        this.closeCreateJobModal();
    }

    trackByJobId(index: number, job: Job): number {
        return job.id;
    }
}
