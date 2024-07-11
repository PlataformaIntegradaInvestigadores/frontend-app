import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  Affiliation,
  AffiliationInfo,
  LineChartInfo,
  NameValue, Word,
  YearsResponse
} from "../../../shared/interfaces/dashboard.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AffiliationService {
  private apiUrl = 'http://localhost:8000/api/v1/dashboard';
  constructor(private http: HttpClient) { }

  getLineChartAffiliationInfo(scopus_id:string): Observable<LineChartInfo[]>{
    return this.getYears(scopus_id).pipe(
      map(response => {
        const nameAffiliation = response[0].name
        const series: NameValue[] = response.map(cy => ({
          name: cy.year.toString(),
          value: cy.total_articles
        }));
        return [{
          name: nameAffiliation,
          series: series
        }];
      })
    );
  }

  getYears(scopus_id:string): Observable<Affiliation[]> {
    let params = new HttpParams().set('scopus_id', scopus_id.toString())
    return this.http.get<Affiliation[]>(`${this.apiUrl}/affiliation/get_affiliation_years/`,{params});
  }

  getTreeMapInfo(scopus_id:string):Observable<NameValue[]>{
    return this.getTopicsAcumulated(scopus_id).pipe(
      map(response => {
        const info:NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }
  getTopicsAcumulated(scopus_id:string): Observable<Word[]> {
    let params = new HttpParams().set('scopus_id', scopus_id.toString())
    return this.http.get<Word[]>(`${this.apiUrl}/affiliation/get_affiliation_topics/`, {params});
  }

}
