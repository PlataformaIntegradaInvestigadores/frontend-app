import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {DashboardService} from "../../../domain/services/dashboard.service";
import {LineChartInfo, NameValue} from "../../../../shared/interfaces/dashboard.interface";
import {AffiliationService} from "../../../domain/services/affiliation.service";

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.component.html',
  styleUrls: ['./affiliation.component.css']
})
export class AffiliationComponent implements OnChanges{
  affiliations: NameValue[]=[]
  affiliation: string =""
  options: string[] = ['Until', 'In'];
  selectedOption: string = this.options[0];
  lineChartAffiliation!: LineChartInfo[]
  treeMapInfo!:NameValue[]
  scopusId!:string
  charged: boolean = false
  year!: number
  yearOptions!: number[]

  constructor(private dashboardService:DashboardService, private affiliationService: AffiliationService) {
    this.dashboardService.getBarInfo().subscribe(data =>{
      this.affiliations = data
    })
  }
  getYears() {
    this.dashboardService.getYears().subscribe(data => {
      this.yearOptions = data.map(item => item.year);
      this.year = this.yearOptions[this.yearOptions.length - 1]; // Inicializamos con el último año
      this.updateData(this.year); // Inicializamos los datos con el año seleccionado
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
        if(changes['scopusId']){
          this.getScopusId(this.scopusId)
        }
    }


  getScopusId(scopus_id: string){
    this.scopusId = scopus_id
    this.affiliationService.getLineChartAffiliationInfo(scopus_id).subscribe(
      data => {
        this.affiliation = data[0].name
        this.lineChartAffiliation = data
        this.charged = true
      }
    )
    this.affiliationService.getTreeMapInfo(scopus_id).subscribe(
      data => {
        this.treeMapInfo = data
      }
    )
  }
  getInfo(scopus_id: string, name: string){
    this.affiliationService.getLineChartAffiliationInfo(scopus_id).subscribe(
      data => {
        this.lineChartAffiliation = data
      }
    )
  }

  updateData(year: number) {

  }



}
