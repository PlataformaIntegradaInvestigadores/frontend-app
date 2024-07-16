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
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit {

  private apiUrl = environment.apiCentinela+'/api/v1/dashboard';


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

  getCountsYear(year: number): Observable<DashboardCounts> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<DashboardCounts>(`${this.apiUrl}/country/get_year/`, {params});
  }

  getYears(): Observable<YearsResponse[]> {
    return this.http.get<YearsResponse[]>(`${this.apiUrl}/country/get_last_years/`);
  }

  getTopicsYear(year: number): Observable<Word[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<Word[]>(`${this.apiUrl}/country/get_top_topics_year/`, {params});
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

  getBarInfoYear(year:number):Observable<NameValue[]>{
    return this.getTopAffiliationsYear(year).pipe(
      map(response => {
        const info:NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }

  getTopAffiliationsYear(year: number):Observable<Word[]>{
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<Word[]>(`${this.apiUrl}/affiliation/get_top_affiliations_year/`,{params})
  }

  getTreeMap(): Observable<NameValue[]> {
    return this.getTopics(10).pipe(
      map(response => {
        console.log(response)
        const info: NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }

  private getTopics(number_top: number) {
    let params = new HttpParams().set('number_top', number_top.toString());
    console.log('si')
    return this.http.get<Word[]>(`${this.apiUrl}/country/get_topics/`, {params});
  }

  getBarInfo():Observable<NameValue[]>{
    return this.getTopAffiliations().pipe(
      map(response => {
        const info:NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }

  getTopAffiliations():Observable<Word[]>{
    return this.http.get<Word[]>(`${this.apiUrl}/affiliation/get_affiliations/`)
  }

  getLineChartInfoYear(year: number): Observable<LineChartInfo[]> {
    return this.getYear(year).pipe(
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

  getYear(year: number): Observable<YearsResponse[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<YearsResponse[]>(`${this.apiUrl}/country/get_year_info/`, {params});
  }

  getLineChartInfoRange(year: number): Observable<LineChartInfo[]> {
    return this.getYearsRange(year).pipe(
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

  getYearsRange(year: number): Observable<YearsResponse[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<YearsResponse[]>(`${this.apiUrl}/country/get_range_info/`, {params});
  }

  getProvinces():string{
    return `${this.apiUrl}/province/get_provinces/`;
  }
  getProvincesYear(year:number):string{
    return `${this.apiUrl}/province/get_provinces_year/?year=${year}`;
  }

  getProvincesAcumulated(year:number):string{
    return `${this.apiUrl}/province/get_provinces_acumulated/?year=${year}`;
  }


}
