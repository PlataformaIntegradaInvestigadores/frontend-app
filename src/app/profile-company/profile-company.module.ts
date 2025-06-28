import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CompanyProfilePageComponent } from './presentation/pages/profile-company-page/profile-company-page.component';
import { ProfileCompanyRoutingModule } from './profile-company-routing.module';
import { CreateJobModalComponent } from './presentation/components/create-job-modal/create-job-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ProfileCompanyRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        CompanyProfilePageComponent,
        CreateJobModalComponent,
    ],
    providers: [],
})
export class ProfileCompanyPageModule { }
