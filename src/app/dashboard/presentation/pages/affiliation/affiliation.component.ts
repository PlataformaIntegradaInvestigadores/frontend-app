import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DashboardService} from "../../../domain/services/dashboard.service";
import {LineChartInfo, NameValue} from "../../../../shared/interfaces/dashboard.interface";
import {AffiliationService} from "../../../domain/services/affiliation.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.component.html',
  styleUrls: ['./affiliation.component.css']
})
export class AffiliationComponent implements OnInit {
  affiliations!: NameValue[]
  yearOptions!: number[]

  constructor(
    private dashboardService: DashboardService,
    private affiliationService: AffiliationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  onSearchEntity(event: string) {
    this.router.navigate(['home/analitica/dashboard/by-affiliation', event]).then(nav => {
      }
    )
  }


  ngOnInit(): void {
        this.loadSummary();
  }

  loadSummary() {
    this.dashboardService.getBarInfo().subscribe(data => {
      this.affiliations = data;
      // this.charged = false;
    });
  }

  getId(name: string) {
    this.affiliationService.getId(name).subscribe(data => {
      this.onSearchEntity(data.scopus_id);
    });
  }
  navigateGeneral() {
    this.router.navigate(['home/analitica/dashboard/']).then(nav => {
      }
    )
  }
  navigateTopic() {
    this.router.navigate(['home/analitica/dashboard/topic/']).then(nav => {
      }
    )
  }
  isCharged(){
    return this.affiliations
  }
}
