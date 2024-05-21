/* Modules */


import {NgModule} from "@angular/core";
import {GraphComponent} from "./presentation/visuals/graph/graph.component";
import {D3Module} from "../shared/d3/d3.module";
import {LinkVisualComponent, NodeVisualComponent} from "./presentation/visuals/shared";
import { EcuadorMapComponent } from './presentation/visuals/ecuador-map/ecuador-map.component';

@NgModule({
  declarations: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    EcuadorMapComponent
    ],
  exports: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    EcuadorMapComponent
  ],
  imports: [
  ],
  providers: [
    ],
})
export class AppModule {
}
