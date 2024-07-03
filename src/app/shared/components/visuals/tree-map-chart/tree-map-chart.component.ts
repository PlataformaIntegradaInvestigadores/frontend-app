import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tree-map-chart',
  templateUrl: './tree-map-chart.component.html',
  styleUrls: ['./tree-map-chart.component.css']
})
export class TreeMapChartComponent {
  single: any[] = [
    {
      "name": "Data Mining",
      "value": 50
    },
    {
      "name": "Machine Learning",
      "value": 70
    },
    {
      "name": "Deep Learning",
      "value": 65
    },
    {
      "name": "Artificial Intelligence",
      "value": 80
    },
    {
      "name": "Big Data",
      "value": 55
    },
    {
      "name": "Natural Language Processing",
      "value": 60
    },
    {
      "name": "Computer Vision",
      "value": 75
    },
    {
      "name": "Bioinformatics",
      "value": 50
    },
    {
      "name": "Cybersecurity",
      "value": 70
    }
  ]
  @Input()
  width!:number;
  @Input()
  height!:number;

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  onSelect(event: any) {
    console.log(event);
  }

}
