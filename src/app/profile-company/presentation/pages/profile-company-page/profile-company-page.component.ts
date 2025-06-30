import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    activeTab: 'about' = 'about'; // Solo mantenemos la pestaña "about"
    loading = false;
    companyId: string | null = null;

    constructor(
        private companyService: CompanyService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Obtener el ID de la empresa desde la ruta
        this.route.params.subscribe(params => {
            this.companyId = params['id'];
            if (this.companyId) {
                this.loadCompanyProfile();
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

    setActiveTab(tab: 'about'): void {
        this.activeTab = tab;
    }

    /**
     * Navegar a la página de Jobs para gestionar trabajos
     */
    goToJobsPage(): void {
        this.router.navigate(['/jobs']);
    }

    /**
     * Check if current user is the company owner
     */
    isCompanyOwner(): boolean {
        const currentCompanyId = this.authService.getCompanyId();
        return currentCompanyId === this.companyId;
    }
}
