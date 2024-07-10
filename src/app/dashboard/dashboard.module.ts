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


@NgModule({
  declarations: [
    GeneralComponent,
    SearchBarComponent,
    AffiliationComponent,
  ],
  exports: [
    GeneralComponent,
    SearchBarComponent,
    AffiliationComponent
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    NgForOf,
    NgIf,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModule,
  ],
  providers: [VisualsService
    ],
})
export class DashboardModule {
}
