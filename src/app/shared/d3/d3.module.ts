/* Modules */

import {NgModule} from "@angular/core";
import {DraggableDirective, ZoomableDirective} from "./directives";
import {ForceDirectedGraph, Link} from "./models";

@NgModule({
  declarations: [
    DraggableDirective,
    ZoomableDirective,
  ],
  exports:[
    DraggableDirective,
    ZoomableDirective,
    ForceDirectedGraph,
    Link,
    Node,
  ],
  imports: [

  ],
  providers: [
    ],
})
export class D3Module {
}
