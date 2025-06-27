import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsComponent } from './presentation/pages/jobs/jobs.component';
import { JobsPageRoutingModule } from './jobs-page-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        JobsPageRoutingModule,
        SharedModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        JobsComponent
    ],
    providers: [],
})
export class JobsPageModule { }
