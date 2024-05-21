/* Modules */


import {NgModule} from "@angular/core";
import {GraphComponent} from "./presentation/visuals/graph/graph.component";
import {LinkVisualComponent, NodeVisualComponent} from "./presentation/visuals/shared";
import { EcuadorMapComponent } from './presentation/visuals/ecuador-map/ecuador-map.component';
import {ZoomableDirective} from "../shared/d3/directives";

@NgModule({
  declarations: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    EcuadorMapComponent,
    ZoomableDirective
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
export class DashboardModule {
}
