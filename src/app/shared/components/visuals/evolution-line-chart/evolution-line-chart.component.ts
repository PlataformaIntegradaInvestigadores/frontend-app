import {Component, Input} from '@angular/core';

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
          "name": "1992",
          "value": 12000
        },
        {
          "name": "1994",
          "value": 7300
        },
        {
          "name": "1996",
          "value": 8940
        },
        {
          "name": "1998",
          "value": 22340
        },
        {
          "name": "2000",
          "value": 12021
        },
        {
          "name": "2002",
          "value": 7534
        },
        {
          "name": "2004",
          "value": 8423
        },
        {
          "name": "2006",
          "value": 32134
        },
        {
          "name": "2008",
          "value": 33234
        },
        {
          "name": "2010",
          "value": 6563
        },
        {
          "name": "2012",
          "value": 2323
        },
        {
          "name": "2014",
          "value": 6475
        },
        {
          "name": "2016",
          "value": 15676
        },
        {
          "name": "2018",
          "value": 53656
        },
        {
          "name": "2020",
          "value": 65754
        },
        {
          "name": "2022",
          "value": 45454
        },
        {
          "name": "2024",
          "value": 3271
        }
      ]
    }]
  @Input()
  width!: number;
  @Input()
  height!: number;

  view: [number,number] = [this.width, this.height];

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
    console.log(this.width, this.height)
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
