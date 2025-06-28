import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job, JobCreate } from 'src/app/jobs/domain/entities/job.interface';
import { JobsService } from 'src/app/jobs/domain/services/job.service';
import { Company } from 'src/app/profile-company/domain/entities/company.interface';
import { CompanyService } from 'src/app/profile-company/domain/services/company.service';
import { AuthService } from 'src/app/auth/domain/services/auth.service';

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
    companyId: string | null = null;

    constructor(
        private companyService: CompanyService,
        private jobsService: JobsService,
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // Obtener el ID de la empresa desde la ruta
        this.route.params.subscribe(params => {
            this.companyId = params['id'];
            if (this.companyId) {
                this.loadCompanyProfile();
                this.loadCompanyJobs();
            }
        });
    }

    loadCompanyProfile(): void {
        if (!this.companyId) return;
        
        this.loading = true;
        // Si es la empresa autenticada, usar getMyProfile, sino getCompanyProfile
        const currentCompanyId = this.authService.getCompanyId();
        
        if (currentCompanyId === this.companyId) {
            this.companyService.getMyProfile().subscribe({
                next: (company: Company) => {
                    this.company = company;
                    this.loading = false;
                },
                error: (error: any) => {
                    console.error('Error loading company profile:', error);
                    this.loading = false;
                }
            });
        } else {
            this.companyService.getCompanyProfile(this.companyId).subscribe({
                next: (company: Company) => {
                    this.company = company;
                    this.loading = false;
                },
                error: (error: any) => {
                    console.error('Error loading company profile:', error);
                    this.loading = false;
                }
            });
        }
    }

    loadCompanyJobs(): void {
        if (this.companyId) {
            this.jobsService.getJobsByCompany(this.companyId).subscribe({
                next: (jobs: Job[]) => {
                    this.companyJobs = jobs;
                },
                error: (error: any) => {
                    console.error('Error loading company jobs:', error);
                    this.companyJobs = [];
                }
            });
        }
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

    onJobCreated(jobData: JobCreate): void {
        this.jobsService.createJob(jobData).subscribe({
            next: (createdJob: Job) => {
                this.companyJobs.unshift(createdJob);
                this.closeCreateJobModal();
                // Optionally show success message
            },
            error: (error: any) => {
                console.error('Error creating job:', error);
                // Optionally show error message
            }
        });
    }

    trackByJobId(index: number, job: Job): number {
        return job.id;
    }

    /**
     * Get formatted salary for display
     */
    getFormattedSalary(job: Job): string {
        if (job.salary_min && job.salary_max) {
            return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`;
        } else if (job.salary_min) {
            return `From $${job.salary_min.toLocaleString()}`;
        } else if (job.salary_max) {
            return `Up to $${job.salary_max.toLocaleString()}`;
        }
        return 'Salary not specified';
    }

    /**
     * Get job type classes for styling
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
     * Check if current user is the company owner
     */
    isCompanyOwner(): boolean {
        const currentCompanyId = this.authService.getCompanyId();
        return currentCompanyId === this.companyId;
    }
}
