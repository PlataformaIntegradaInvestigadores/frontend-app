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
  year:number = 2023


  constructor(private dashboardService:DashboardService) {
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
    this.dashboardService.getTreeMapInfo(this.year).subscribe(data => {
      this.treeMapInfo = data;
      console.log(data)
    })
  }

  updateData(year:number){
    console.log(year)
    this.dashboardService.getCounts(year).subscribe(data => {
      this.counts = data;
      console.log(this.counts); // Aquí puedes ver la respuesta en la consola
    });
    this.dashboardService.getTreeMapInfo(year).subscribe(data => {
      this.treeMapInfo = data;
    })
  }


}
