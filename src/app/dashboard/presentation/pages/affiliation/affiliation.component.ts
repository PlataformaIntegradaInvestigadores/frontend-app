import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {DashboardService} from "../../../domain/services/dashboard.service";
import {LineChartInfo, NameValue} from "../../../../shared/interfaces/dashboard.interface";
import {AffiliationService} from "../../../domain/services/affiliation.service";

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.component.html',
  styleUrls: ['./affiliation.component.css']
})
// export class AffiliationComponent implements OnChanges{
export class AffiliationComponent{
  // affiliations: NameValue[]=[]
  // affiliation: string =""
  //
  // constructor(private dashboardService:DashboardService, private affiliationService: AffiliationService) {
  //   this.dashboardService.getBarInfo().subscribe(data =>{
  //     this.affiliations = data
  //   })
  // }
  //
  // ngOnChanges(changes: SimpleChanges): void {
  //       if(changes['scopusId']){
  //         this.getScopusId(this.scopusId)
  //       }
  //   }
  //
  // lineChartAffiliation!: LineChartInfo[]
  // treeMapInfo!:NameValue[]
  // scopusId!:string
  // charged: boolean = false
  // getScopusId(scopus_id: string){
  //   this.scopusId = scopus_id
  //   this.affiliationService.getLineChartAffiliationInfo(scopus_id).subscribe(
  //
  //     data => {
  //       this.affiliation = data[0].name
  //       this.lineChartAffiliation = data
  //       this.charged = true
  //     }
  //   )
  //   this.affiliationService.getTreeMapInfo(scopus_id).subscribe(
  //     data => {
  //       this.treeMapInfo = data
  //     }
  //   )
    // this.affiliationService.getYears(scopus_id).subscribe(data => {
    //   this.lineChartAffiliation = data
    // })
  // }
  // getInfo(scopus_id: string, name: string){
  //   this.affiliationService.getLineChartAffiliationInfo(scopus_id, name).subscribe(
  //     data => {
  //       this.lineChartAffiliation = data
  //     }
  //   )
  // }




}
