import {Component, OnInit} from '@angular/core';
import {VisualsService} from "../../../../shared/domain/services/visuals.service";
import {DashboardCounts, LineChartInfo} from "../../../../shared/interfaces/dashboard.interface";
import {DashboardService} from "../../../domain/services/dashboard.service";

@Component({
  selector: 'app-graphic-analytic',
  templateUrl: './graphic-analytic.component.html',
  styleUrls: ['./graphic-analytic.component.css']
})
export class GraphicAnalyticComponent implements OnInit{

  summaryInfo!:DashboardCounts
  lineChartInfo!:LineChartInfo
  constructor(dashboardService: DashboardService) {
  }

  ngOnInit() {


  }

}
