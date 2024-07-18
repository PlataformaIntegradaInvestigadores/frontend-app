import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NameValue} from "../../../interfaces/dashboard.interface";
import {Color, ScaleType} from "@swimlane/ngx-charts";

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
  @Output() selectedTopic = new EventEmitter<any>();

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#440154','#462372',
      '#3d4d8a', '#375a80', '#355f7d', '#2f6d73',
      '#2e7270', '#2c766d', '#2a7b69', '#297f66', '#278463', '#258860', '#238d5c', '#219258',
      '#209654', '#1e9b50', '#1ca04d', '#1aa349', '#19a745', '#17ac41', '#16b13d', '#14b539',
      '#12b635', '#10b830', '#0fb92c', '#0fba28', '#0fbc24', '#10bd20', '#10be1d', '#11bf1a',
      '#11c017', '#12c114', '#13c211', '#14c30e'
    ]
  };

  constructor() {
  }


  onSelect(event: NameValue): void {
    console.log('Selected item:', event); // Log para verificar el elemento seleccionado
    this.selectedTopic.emit(event.name);
  }

}
