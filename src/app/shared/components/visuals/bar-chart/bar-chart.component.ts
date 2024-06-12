import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  single: any[] = [
    {
      "name": "Universidad de Cuenca",
      "value": 15000
    },
    {
      "name": "Escuela Politécnica Nacional",
      "value": 13000
    },
    {
      "name": "Universidad Central del Ecuador",
      "value": 35000
    },
    {
      "name": "Universidad San Francisco de Quito",
      "value": 8000
    },
    {
      "name": "Escuela Superior Politécnica del Litoral (ESPOL)",
      "value": 12000
    },
    {
      "name": "Pontificia Universidad Católica del Ecuador",
      "value": 14000
    },
    {
      "name": "Universidad de las Fuerzas Armadas - ESPE",
      "value": 17000
    },
    {
      "name": "Universidad Técnica de Ambato",
      "value": 11000
    },
    {
      "name": "Universidad Técnica de Manabí",
      "value": 9000
    },
    {
      "name": "Universidad Técnica Particular de Loja",
      "value": 10000
    }
  ];
  @Input()
  width!: number;
  @Input()
  height!:number;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  onSelect(event: any) {
    console.log(event);
  }
}
