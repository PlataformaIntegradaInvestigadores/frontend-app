import {NgModule} from '@angular/core';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms'; // Asegúrate de importar FormsModule
import {CommonModule} from '@angular/common'; // Importa CommonModule
import {HeaderComponent} from './components/header/header.component';
import {SharedRoutingModule} from './shared.routing.module';
import {FooterComponent} from "./components/footer/footer.component";
import {D3_DIRECTIVES} from "./d3/directives";
import {EcuadorMapComponent} from "./components/visuals/ecuador-map/ecuador-map.component";
import {GraphComponent} from "./components/visuals/graph/graph.component";
import {SHARED_VISUALS} from "./components/visuals";
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import {CardSummaryComponent} from "./components/visuals/card-summary/card-summary.component";
import {WordCloudComponent} from "./components/visuals/word-cloud/word-cloud.component";
import {NgxChartsModule, NumberCardModule} from "@swimlane/ngx-charts";
import {EvolutionLineChartComponent} from "./components/visuals/evolution-line-chart/evolution-line-chart.component";
import {D3Service} from "./d3";
@NgModule({
  declarations: [
    SearchBoxComponent,
    HeaderComponent,
    FooterComponent,
    ...D3_DIRECTIVES,
    ...SHARED_VISUALS,
    EcuadorMapComponent,
    CardSummaryComponent,
    WordCloudComponent,
    GraphComponent,
    EvolutionLineChartComponent
  ],
  exports: [
    SearchBoxComponent,
    HeaderComponent,
    FooterComponent,
    ...D3_DIRECTIVES,
    ...SHARED_VISUALS,
    EcuadorMapComponent,
    CardSummaryComponent,
    WordCloudComponent,
    GraphComponent,
    EvolutionLineChartComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    SharedRoutingModule,
    NgbPopoverModule,
    NumberCardModule,
    NgxChartsModule,
  ],
  providers: [D3Service],
})
export class SharedModule {
}
