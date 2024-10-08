import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import {D3Service, ForceDirectedGraph, Link, Node} from "../../../d3";

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="options.width" [attr.height]="options.height">
      <g [zoomableOf]="svg" class="my-border">
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node"  *ngFor="let node of nodes"
           [draggableNode]="node" [draggableInGraph]="graph"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes!: Node[];
  @Input('links') links!: Link[];
  @Input('forces') forces: any;
  graph!: ForceDirectedGraph;
  private _options: { width: number, height: number } = {width: 400, height: 400};

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.graph.initSimulation(this.options);
  }


  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options, this.forces);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    let height: number
    let width:number

    if (window.innerHeight > 1200) {
      height = 900
    } else if (window.innerHeight < 800) {
      height = 500
    } else {
      height = window.innerHeight - 300
    }

    if(window.innerWidth > 768){
      width = window.innerWidth*0.7
    }else{
      width = window.innerWidth*0.8
    }

    return this._options = {
      width: width,
      height: 600
    };
  }
}

