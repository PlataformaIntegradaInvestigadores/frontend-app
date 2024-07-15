import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  Affiliation, AffiliationCounts,
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

  constructor(private http: HttpClient) {
  }
  getOptionYears(scopus_id: string): Observable<YearsResponse[]> {
    let params = new HttpParams().set('scopus_id', scopus_id.toString())
    return this.http.get<YearsResponse[]>(`${this.apiUrl}/affiliation/get_years/`, {params});

  }
  getSummary(scopus_id: string): Observable<AffiliationCounts> {
    let params = new HttpParams().set('scopus_id', scopus_id.toString())
    return this.http.get<AffiliationCounts>(`${this.apiUrl}/affiliation/get_articles_topics/`, {params});
  }
  getSummaryYear(scopus_id: string, year: number): Observable<AffiliationCounts> {
    let params = new HttpParams()
      .set('scopus_id', scopus_id.toString())
      .set('year', year.toString())
    return this.http.get<AffiliationCounts>(`${this.apiUrl}/affiliation/get_articles_topics_year/`, {params});
  }

  getSummaryAcumulated(scopus_id: string,year: number): Observable<AffiliationCounts> {
    let params = new HttpParams()
      .set('scopus_id', scopus_id.toString())
      .set('year', year.toString())
    return this.http.get<AffiliationCounts>(`${this.apiUrl}/affiliation/get_articles_topics_acumulated/`, {params});
  }

  getYears(scopus_id: string): Observable<Affiliation[]> {
    let params = new HttpParams()
      .set('scopus_id', scopus_id.toString())
    return this.http.get<Affiliation[]>(`${this.apiUrl}/affiliation/get_affiliation_years/`, {params});
  }

  getLineChartAffiliationInfo(scopus_id: string): Observable<LineChartInfo[]> {
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

  getYear(scopus_id: string, year: number): Observable<Affiliation[]> {
    let params = new HttpParams()
      .set('scopus_id', scopus_id.toString())
      .set('year', year.toString())
    return this.http.get<Affiliation[]>(`${this.apiUrl}/affiliation/get_year/`, {params});
  }

  getLineChartAffiliationYear(scopus_id: string, year: number): Observable<LineChartInfo[]> {
    return this.getYear(scopus_id, year).pipe(
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

  getRangeYear(scopus_id: string, year: number): Observable<Affiliation[]> {
    let params = new HttpParams()
      .set('scopus_id', scopus_id.toString())
      .set('year', year.toString())
    return this.http.get<Affiliation[]>(`${this.apiUrl}/affiliation/get_year_range/`, {params});
  }

  getLineChartAffiliationRange(scopus_id: string, year: number): Observable<LineChartInfo[]> {
    return this.getRangeYear(scopus_id, year).pipe(
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

  getTopics(scopus_id: string): Observable<Word[]> {
    let params = new HttpParams().set('scopus_id', scopus_id.toString())
    return this.http.get<Word[]>(`${this.apiUrl}/affiliation/get_affiliation_topics/`, {params});
  }
  getTreeMapInfo(scopus_id: string): Observable<NameValue[]> {
    return this.getTopics(scopus_id).pipe(
      map(response => {
        const info: NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }

  getTopicsAcumulated(scopus_id: string, year: number): Observable<Word[]> {
    let params = new HttpParams()
      .set('scopus_id', scopus_id.toString())
      .set('year', year.toString())
    return this.http.get<Word[]>(`${this.apiUrl}/affiliation/get_topics_acumulated/`, {params});
  }
  getTreeMapAcumulated(scopus_id: string, year: number): Observable<NameValue[]> {
    return this.getTopicsAcumulated(scopus_id, year).pipe(
      map(response => {
        const info: NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }

  getTopicsYear(scopus_id: string, year: number): Observable<Word[]> {
    let params = new HttpParams()
      .set('scopus_id', scopus_id.toString())
      .set('year', year.toString())
    return this.http.get<Word[]>(`${this.apiUrl}/affiliation/get_topics_year/`, {params});
  }
  getTreeMapYear(scopus_id: string, year: number): Observable<NameValue[]> {
    return this.getTopicsYear(scopus_id, year).pipe(
      map(response => {
        const info: NameValue[] = response.map(t => ({
          name: t.text,
          value: t.size
        }));
        return info
      })
    )
  }
}
