/* Modules */
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {HomePageModule} from "../search-engine/presentation/home-page/home-page.module";
import {VisualsService} from "../shared/domain/services/visuals.service";
import { GeneralComponent } from './presentation/pages/general/general.component';
import {
  EvolutionLineChartComponent
} from "../shared/components/visuals/evolution-line-chart/evolution-line-chart.component";
import {LineChartModule} from "@swimlane/ngx-charts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import { SearchBarComponent } from './presentation/components/shared/search-bar/search-bar.component';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { AffiliationComponent } from './presentation/pages/affiliation/affiliation.component';
import {MatIconModule} from "@angular/material/icon";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { TopicComponent } from './presentation/pages/topic/topic.component';
import {RouterModule} from "@angular/router";
import { DashboardPageComponent } from './presentation/pages/dashboard-page/dashboard-page.component';
import {CountUpModule} from "ngx-countup";


@NgModule({
  declarations: [
    GeneralComponent,
    SearchBarComponent,
    AffiliationComponent,
    TopicComponent,
    DashboardPageComponent,
  ],
  exports: [
    GeneralComponent,
    SearchBarComponent,
    AffiliationComponent
  ],
    imports: [
        DashboardRoutingModule,
        RouterModule,
        FormsModule,
        NgForOf,
        NgIf,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatIconModule,
        SharedModule,
        CountUpModule,
    ],
  providers: [VisualsService
    ],
})
export class DashboardModule {
}
