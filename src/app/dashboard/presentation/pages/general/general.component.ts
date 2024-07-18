import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DashboardService} from "../../../domain/services/dashboard.service";
import {DashboardCounts, LineChartInfo, NameValue} from "../../../../shared/interfaces/dashboard.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {LowerCasePipe} from "@angular/common";
import {AffiliationService} from "../../../domain/services/affiliation.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit{

  lineChartInfo!: LineChartInfo[]
  counts!: DashboardCounts
  treeMapInfo!: NameValue[]
  barChartInfo!: NameValue[]
  provinces!: string
  options: string[] = ['Until', 'In'];
  selectedOption: string = this.options[0];
  yearOptions: number[] = []
  year!: number

  constructor(private router: Router, private route: ActivatedRoute, private dashboardService: DashboardService, private affiliationService:AffiliationService) {
    this.getYears()
  }


  ngOnInit(): void {
    this.dashboardService.getLineChartInfo().subscribe(data => {
        this.lineChartInfo = data;
      }
    );
    this.dashboardService.getCounts(this.year).subscribe(data => {
      this.counts = data;
      console.log(this.counts);
    });
    this.dashboardService.getTreeMap().subscribe(data => {
      console.log('cossjd' + this.treeMapInfo)
      this.treeMapInfo = data;
    });
    this.dashboardService.getBarInfo().subscribe(data => {
      this.barChartInfo = data;
      // console.log(data)
    });
    this.provinces = environment.apiCentinela+'api/v1/dashboard/province/get_provinces/'
  }

  isCharged(){
    return this.lineChartInfo&&this.counts&&this.treeMapInfo&&this.barChartInfo&&this.provinces
  }
  getYears() {
    this.dashboardService.getYears().subscribe(data => {
      this.yearOptions = data.map(item => item.year);
      this.year = this.yearOptions[this.yearOptions.length - 1]; // Inicializamos con el último año
      this.updateData(this.year); // Inicializamos los datos con el año seleccionado
    });
  }

  updateData(year: number) {
    this.year = year
    if (this.selectedOption === 'Until') {
      if (this.year.toString() === this.yearOptions[this.yearOptions.length - 1].toString()) {
        this.dashboardService.getTreeMap().subscribe(data => {
          this.treeMapInfo = data
        });
        this.dashboardService.getBarInfo().subscribe(data => {
          this.barChartInfo = data;
        });
        this.provinces = this.dashboardService.getProvinces()
      } else {
        this.dashboardService.getTreeMapInfoAcumulated(year).subscribe(data => {
          this.treeMapInfo = data;
        });
        this.dashboardService.getBarInfoAcumulated(year).subscribe(data => {
          this.barChartInfo = data;
        });
        this.provinces = this.dashboardService.getProvincesAcumulated(year)
      }
      this.dashboardService.getCounts(year).subscribe(data => {
        this.counts = data;
      });
      this.dashboardService.getLineChartInfoRange(year).subscribe(data =>{
        this.lineChartInfo = data;
      });

    } else if (this.selectedOption === 'In') {
      this.dashboardService.getCountsYear(year).subscribe(data => {
        this.counts = data;
      });
      this.dashboardService.getBarInfoYear(year).subscribe(data => {
        this.barChartInfo = data
      });
      this.dashboardService.getTreeMapInfo(year).subscribe(data => {
        this.treeMapInfo = data
      });
      this.dashboardService.getLineChartInfoYear(year).subscribe(data =>{
        this.lineChartInfo = data
      });
      this.provinces = this.dashboardService.getProvincesYear(year);
    }
  }
  onSearchEntity(event: string) {
    this.router.navigate(['home/analitica/dashboard/by-affiliation', event]).then(nav => {
        console.log('')
      }
    )
  }
  getId(name: string) {
    this.affiliationService.getId(name).subscribe(data => {
      this.onSearchEntity(data.scopus_id);
    });
  }
  onSearchTopic(event: string) {
    this.router.navigate(['home/analitica/dashboard/by-topic', event]).then(nav => {
        console.log('')
      }
    )
  }

}
