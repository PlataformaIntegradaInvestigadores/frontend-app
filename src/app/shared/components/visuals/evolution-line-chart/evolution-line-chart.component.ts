import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import {LineChartInfo, NameValue} from "../../../interfaces/dashboard.interface";

@Component({
  selector: 'app-evolution-line-chart',
  templateUrl: './evolution-line-chart.component.html',
  styleUrls: ['./evolution-line-chart.component.css']
})
export class EvolutionLineChartComponent {
  @Input() multi!: LineChartInfo[];
  @Input() width!: number;
  @Input() height!: number;
  @Output() selectedYear = new EventEmitter<any>();
  @Input() boolean = false;

  selectedSeries: string | null = null;
  selectedItem: NameValue | null = null;

  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Articles';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0000ff']
  };


  onSelect(event: NameValue): void {
    // console.log('Selected item:', event); // Log para verificar el elemento seleccionado
    this.selectedYear.emit(event.name);
    this.selectedItem = event;
  }
}
// export class EvolutionLineChartComponent {
//   @Input() multi!: LineChartInfo[];
//   @Input() width!: number;
//   @Input() height!: number;
//   @Output() selectedYear = new EventEmitter<any>();
//
//   selectedSeries: string | null = null
//
//   xAxis: boolean = true;
//   yAxis: boolean = true;
//   showYAxisLabel: boolean = true;
//   showXAxisLabel: boolean = true;
//   xAxisLabel: string = 'Year';
//   yAxisLabel: string = 'Articles';
//   timeline: boolean = true;
//
//   colorScheme: Color = {
//     name: 'custom',
//     selectable: true,
//     group: ScaleType.Ordinal,
//     domain: []
//   };
//
//
//   constructor() {
//     this.assignColors();
//   }
//
//   onSelect(event: { name: any; }): void {
//     this.selectedYear.emit(event.name);
//     this.selectedSeries = event.name;
//     this.assignColors();
//   }
//   assignColors() {
//     const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
//     this.colorScheme.domain = this.multi.map((series, index) => {
//       if (this.selectedSeries && this.selectedSeries === series.name) {
//         return '#ff0000';  // Color resaltado para la serie seleccionada
//       }
//       return colors[index % colors.length]; // Colores normales para el resto
//     });
//   }
// }
// export class EvolutionLineChartComponent {
//   @Input()
//   multi!:LineChartInfo[]
//   @Input()
//   width!: number;
//   @Input()
//   height!: number;
//   view: [number,number] = [this.width, this.height];
//
//   // options
//   legend: boolean = true;
//   showLabels: boolean = true;
//   animations: boolean = true;
//   xAxis: boolean = true;
//   yAxis: boolean = true;
//   showYAxisLabel: boolean = true;
//   showXAxisLabel: boolean = true;
//   xAxisLabel: string = 'Year';
//   yAxisLabel: string = 'Articles';
//   timeline: boolean = true;
//
//   colorScheme = {
//     domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
//   };
//
//   constructor() {
//     console.log(this.width, this.height)
//   }
//
//   onSelect(data: any): void {
//
//     console.log('Item clicked', JSON.parse(JSON.stringify(data)));
//   }
//
//   onActivate(data: any): void {
//     console.log('Activate', JSON.parse(JSON.stringify(data)));
//   }
//
//   onDeactivate(data: any): void {
//     console.log('Deactivate', JSON.parse(JSON.stringify(data)));
//   }
// }
