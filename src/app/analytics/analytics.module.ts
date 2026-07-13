import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard.component';
import { ProjectionComponent } from './components/projection/projection.component';
import { ComparatorComponent } from './components/comparator/comparator.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ModelDetailsComponent } from './components/model-details/model-details.component';

@NgModule({
  declarations: [
    AnalyticsDashboardComponent,
    ProjectionComponent,
    ComparatorComponent,
    RankingComponent,
    ModelDetailsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule
  ]
})
export class AnalyticsModule { }
