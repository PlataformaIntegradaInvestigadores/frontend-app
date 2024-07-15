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
  articles!: number
  topics!: number
  yearOptions!: number[]

  constructor(private dashboardService:DashboardService, private affiliationService: AffiliationService) {
    this.dashboardService.getBarInfo().subscribe(data =>{
      this.affiliations = data
    })
  }
  getYears() {
    this.affiliationService.getOptionYears(this.scopusId).subscribe(data => {
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
    this.scopusId = scopus_id;
    this.getYears()
    this.affiliationService.getLineChartAffiliationInfo(scopus_id).subscribe(
      data => {
        this.affiliation = data[0].name
        this.lineChartAffiliation = data
        this.charged = true
      }
    );
    this.affiliationService.getTreeMapInfo(scopus_id).subscribe(
      data => {
        this.treeMapInfo = data
      }
    );

  }
  getInfo(scopus_id: string, name: string){
    this.affiliationService.getLineChartAffiliationInfo(scopus_id).subscribe(
      data => {
        this.lineChartAffiliation = data
      }
    )
  }
  updateData(year: number) {
    this.year = year
    console.log(this.year)
    if (this.selectedOption === 'Until') {
      if (this.year.toString() === this.yearOptions[this.yearOptions.length - 1].toString()) {
        this.affiliationService.getLineChartAffiliationInfo(this.scopusId).subscribe(
          data => {
            this.affiliation = data[0].name
            this.lineChartAffiliation = data
            console.log(this.lineChartAffiliation)
            this.charged = true
          }
        );
        this.affiliationService.getTreeMapInfo(this.scopusId).subscribe(
          data => {
            this.treeMapInfo = data
          }
        );
        this.affiliationService.getSummary(this.scopusId).subscribe(
          data => {
            this.articles = data.articles
            this.topics = data.topics
            console.log(this.articles)
          }
        )
      } else {
        this.affiliationService.getSummaryAcumulated(this.scopusId, this.year).subscribe(
          data => {
            this.articles = data.articles
            this.topics = data.topics
          }
        )
        this.affiliationService.getLineChartAffiliationRange(this.scopusId, this.year).subscribe(
          data => {
            this.affiliation = data[0].name
            this.lineChartAffiliation = data
            this.charged = true
          }
        );
        this.affiliationService.getTreeMapAcumulated(this.scopusId, this.year).subscribe(
          data => {
            this.treeMapInfo = data
          }
        );
      }


    } else if (this.selectedOption === 'In') {
      this.affiliationService.getSummaryYear(this.scopusId, year).subscribe(
        data => {
          this.articles = data.articles
          this.topics = data.topics
        }
      )
      this.affiliationService.getLineChartAffiliationYear(this.scopusId, this.year).subscribe(
        data => {
          this.affiliation = data[0].name
          this.lineChartAffiliation = data
          this.charged = true
        }
      );
      this.affiliationService.getTreeMapYear(this.scopusId, this.year).subscribe(
        data => {
          this.treeMapInfo = data
        }
      );
    }
  }


  protected readonly top = top;
}
