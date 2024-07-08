import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from "../../../domain/services/dashboard.service";
import {DashboardCounts, LineChartInfo, NameValue} from "../../../../shared/interfaces/dashboard.interface";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit{

  lineChartInfo!:LineChartInfo[]
  counts!:DashboardCounts
  treeMapInfo!:NameValue[]
  barChartInfo!:NameValue[]
  options: string[] = ['Until', 'In'];
  selectedOption: string = this.options[0];
  yearOptions: number[] = []
  year!:number

  constructor(private dashboardService:DashboardService) {
    this.getYears()
  }

  ngOnInit(): void {

    this.dashboardService.getLineChartInfo().subscribe(data =>{
      this.lineChartInfo = data;
      }
    )
    this.dashboardService.getCounts(this.year).subscribe(data => {
      this.counts = data;
      console.log(this.counts); // Aquí puedes ver la respuesta en la consola
    });
    this.dashboardService.getTreeMapInfoAcumulated(this.year).subscribe(data => {
      this.treeMapInfo = data;
      console.log(data)
    })
    this.dashboardService.getBarInfoAcumulated(this.year).subscribe(data => {
      this.barChartInfo = data;
      console.log(data)
    })
  }

  getYears() {
    this.dashboardService.getYears().subscribe(data => {
      this.yearOptions = data.map(item => item.year);
      this.year = this.yearOptions[this.yearOptions.length - 1]; // Inicializamos con el último año
      this.updateData(this.year); // Inicializamos los datos con el año seleccionado
    });
  }

  updateData(year:number){
    console.log(year)
    this.year = year
    this.dashboardService.getCounts(year).subscribe(data => {
      this.counts = data;
      console.log(this.counts); // Aquí puedes ver la respuesta en la consola
    });
    this.dashboardService.getTreeMapInfoAcumulated(year).subscribe(data => {
      this.treeMapInfo = data;
    })
    this.dashboardService.getBarInfoAcumulated(this.year).subscribe(data => {
      this.barChartInfo = data;
      console.log(data)
    })
  }


}
