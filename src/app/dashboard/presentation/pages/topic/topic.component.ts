import {Component, SimpleChanges} from '@angular/core';
import {LineChartInfo, NameValue} from "../../../../shared/interfaces/dashboard.interface";
import {DashboardService} from "../../../domain/services/dashboard.service";
import {AffiliationService} from "../../../domain/services/affiliation.service";
import {TopicService} from "../../../domain/services/topic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  tops!: NameValue[]
  constructor(private dashboardService:DashboardService, private topicService: TopicService, private router: Router) {
    this.dashboardService.getTreeMap().subscribe(data =>{
      this.tops = data
    })
  }
  onSearchEntity(event: string) {
    this.router.navigate(['home/analitica/dashboard/by-topic', event]).then(nav => {
      }
    )
  }
  navigateGeneral() {
    this.router.navigate(['home/analitica/dashboard/']).then(nav => {
      }
    )
  }
  navigateAffiliation() {
    this.router.navigate(['home/analitica/dashboard/affiliations/']).then(nav => {
      }
    )
  }

  isCharged(){
    return this.tops
}




}
