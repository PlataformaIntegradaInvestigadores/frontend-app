import {Component, Input} from '@angular/core';
import {NameValue} from "../../../interfaces/dashboard.interface";

@Component({
  selector: 'app-tree-map-chart',
  templateUrl: './tree-map-chart.component.html',
  styleUrls: ['./tree-map-chart.component.css']
})
export class TreeMapChartComponent {
  @Input()
  single!: NameValue[]

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
