import {Component, Input} from '@angular/core';
import {NameValue} from "../../../interfaces/dashboard.interface";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  @Input()
  single!: NameValue[]
  @Input()
  width!: number;
  @Input()
  height!:number;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Affiliation';
  showYAxisLabel = true;
  yAxisLabel = 'Articles';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  onSelect(event: any) {
    console.log(event);
  }
}
