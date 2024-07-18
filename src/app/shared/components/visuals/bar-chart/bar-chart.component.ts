import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NameValue} from "../../../interfaces/dashboard.interface";
import {Color, ScaleType} from "@swimlane/ngx-charts";

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

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#440154', '#440558', '#450a5c', '#450f60', '#451465', '#461969', '#461d6d', '#462372',
      '#472775', '#472c7a', '#46307e', '#453583', '#443987', '#433e8c', '#414290', '#3f478d',
      '#3d4d8a', '#3b5187', '#395684', '#375a80', '#355f7d', '#33637a', '#316876', '#2f6d73',
      '#2e7270', '#2c766d', '#2a7b69', '#297f66', '#278463', '#258860', '#238d5c', '#219258',
      '#209654', '#1e9b50', '#1ca04d', '#1aa349', '#19a745', '#17ac41', '#16b13d', '#14b539',
      '#12b635', '#10b830', '#0fb92c', '#0fba28', '#0fbc24', '#10bd20', '#10be1d', '#11bf1a',
      '#11c017', '#12c114', '#13c211', '#14c30e'
    ]
  };
  color = '#440154'

  constructor() {
  }

  onSelect(event: NameValue): void {
    console.log('Selected item:', event.name); // Log para verificar el elemento seleccionado
    this.selectedAffiliation.emit(event.name);

  }
}
