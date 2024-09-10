import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NameValue} from "../../../interfaces/dashboard.interface";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {VisualsService} from "../../../domain/services/visuals.service";

@Component({
  selector: 'app-tree-map-chart',
  templateUrl: './tree-map-chart.component.html',
  styleUrls: ['./tree-map-chart.component.css']
})
export class TreeMapChartComponent implements OnInit, OnChanges {
  @Input()
  single!: NameValue[]

  @Input()
  width!: number;
  @Input()
  height!: number;
  @Output() selectedTopic = new EventEmitter<any>();

  gradient: boolean = false;
  animations: boolean = true;
  colorsCharged: boolean = false;
  colorScheme!: Color;

  @Input()
  general:Boolean = false
  @Input()
  affiliation:Boolean = false
  @Input()
  topic:Boolean = false
  single1!:NameValue[]
  colorScheme1!:Color

  ngOnInit() {
    if (this.single) {
      this.colorScheme = this.visualsService.createColorScheme(this.single.length)
      this.colorsCharged = true;
      this.single1 = this.single.slice(0,5)
      this.colorScheme1 = this.visualsService.createColorScheme(this.single1.length)

    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['single']) {
      this.colorsCharged = false
      this.colorScheme = this.visualsService.createColorScheme(this.single.length);
      this.single1 = this.single.slice(0,5)
      this.colorScheme1 = this.visualsService.createColorScheme(this.single1.length);
      this.colorsCharged = true;

    }
  }


  constructor(private visualsService: VisualsService) {
  }



  onSelect(event: NameValue): void {
    this.selectedTopic.emit(event.name);
  }

    protected readonly window = window;

}
