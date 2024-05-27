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
import {SHARED_VISUALS} from "./components/visuals/shared";

@NgModule({
  declarations: [
    SearchBoxComponent,
    HeaderComponent,
    FooterComponent,
    ...D3_DIRECTIVES,
    ...SHARED_VISUALS,
    EcuadorMapComponent,
    GraphComponent,
  ],
  exports: [
    SearchBoxComponent,
    HeaderComponent,
    FooterComponent,
    ...D3_DIRECTIVES,
    ...SHARED_VISUALS,
    EcuadorMapComponent,
    GraphComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    SharedRoutingModule,
  ],
  providers: [],
})
export class SharedModule {
}
