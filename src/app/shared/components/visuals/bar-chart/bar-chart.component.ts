import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NameValue} from "../../../interfaces/dashboard.interface";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {VisualsService} from "../../../domain/services/visuals.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input()
  single!: NameValue[]
  @Input()
  width!: number;
  @Input()
  height!:number;
  @Output() selectedAffiliation = new EventEmitter<any>();


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Affiliation';
  showYAxisLabel = true;
  yAxisLabel = 'Articles';

  colorScheme!: Color

  colorsCharged: boolean = false
  ngOnInit() {
    if(this.single){
      // console.log('single' + this.single)
      this.colorScheme = this.visualsService.createColorScheme(this.single.length)
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['single']) {
      this.colorsCharged = false
      this.colorScheme = this.visualsService.createColorScheme(this.single.length);
      this.colorsCharged = true;
    }
  }

  constructor(private visualsService:VisualsService) {
    // console.log('constructor: ' + this.single)
  }


  onSelect(event: NameValue): void {
    // console.log('Selected item:', event.name); // Log para verificar el elemento seleccionado
    this.selectedAffiliation.emit(event.name);

  }
}
