import { Component } from '@angular/core';

@Component({
  selector: 'app-evolution-line-chart',
  templateUrl: './evolution-line-chart.component.html',
  styleUrls: ['./evolution-line-chart.component.css']
})
export class EvolutionLineChartComponent {
  multi = [
    {
      "name": "Ecuador",
      "series": [
        {
          "name": "1990",
          "value": 2000
        },
        {
          "name": "2010",
          "value": 12000
        },
        {
          "name": "2012",
          "value": 7300
        },
        {
          "name": "2011",
          "value": 8940
        }
      ]
    }]
  view: [number,number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Articles';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
