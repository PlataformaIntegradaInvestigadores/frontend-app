import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {
  DashboardCounts,
  LineChartInfo,
  NameValue,
  Word, Year,
  YearsResponse
} from "../../../shared/interfaces/dashboard.interface";
import {VisualsService} from "../../../shared/domain/services/visuals.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Topic} from "../../../shared/interfaces/author.interface";

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit {

  private apiUrl = 'http://localhost:8000/api/v1/dashboard';

  years_response!: Observable<YearsResponse>

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  getTreeMapInfo(year:number): Observable<NameValue[]> {
    return this.getTopicsYear(year).pipe(
      map(response => {
        const info: NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }
  getTreeMapInfoAcumulated(year:number): Observable<NameValue[]> {
    return this.getTopicsAcumulated(year).pipe(
      map(response => {
        const info: NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }

  getLineChartInfo(): Observable<LineChartInfo[]> {
    return this.getYears().pipe(
      map(response => {
        const series: NameValue[] = response.map(cy => ({
          name: cy.year.toString(),
          value: cy.article
        }));
        return [{
          name: 'Ecuador',
          series: series
        }];
      })
    );
  }

  getCounts(year: number): Observable<DashboardCounts> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<DashboardCounts>(`${this.apiUrl}/country/get_acumulated/`, {params});
  }

  getYears(): Observable<YearsResponse[]> {
    return this.http.get<YearsResponse[]>(`${this.apiUrl}/country/get_last_years/`);
  }

  getTopicsYear(year: number): Observable<Word[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<Word[]>(`${this.apiUrl}/country/get_top_topics_year`, {params});
  }

  getTopicsAcumulated(year: number): Observable<Word[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<Word[]>(`${this.apiUrl}/country/get_top_topics`, {params});
  }

  getAffiliationInfoAcumulated(year: number): Observable<Word[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<Word[]>(`${this.apiUrl}/affiliation/get_top_affiliations/`, {params});
  }
  getBarInfoAcumulated(year:number): Observable<NameValue[]> {
    return this.getAffiliationInfoAcumulated(year).pipe(
      map(response => {
        const info: NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }

  get_years():Observable<Year[]>{
    return this.http.get<Year[]>(`${this.apiUrl}/country/get_years/`)
  }
}
