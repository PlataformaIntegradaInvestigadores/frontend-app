/* Modules */
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {HomePageModule} from "../search-engine/presentation/home-page/home-page.module";
import {VisualsService} from "../shared/domain/services/visuals.service";
import { GeneralComponent } from './presentation/pages/general/general.component';
import {GraphicAnalyticComponent} from "./presentation/components/graphic-analytic/graphic-analytic.component";
import {
  EvolutionLineChartComponent
} from "../shared/components/visuals/evolution-line-chart/evolution-line-chart.component";
import {LineChartModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    GraphicAnalyticComponent,
    GeneralComponent,
  ],
    exports: [
        GraphicAnalyticComponent,
        GeneralComponent

    ],
  imports: [
    SharedModule,
  ],
  providers: [VisualsService
    ],
})
export class DashboardModule {
}
