import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DashboardCounts, Word, YearsResponse} from "../../interfaces/dashboard.interface";

@Injectable({
  providedIn: 'root'
})
export class VisualsService {

  private apiUrl = 'http://localhost:8010/api/v1/dashboard';

  constructor(private http: HttpClient) {
  }

  getCounts(year: number): Observable<DashboardCounts> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<DashboardCounts>(`${this.apiUrl}/country/get_acumulated/`, {params});
  }

  getTopics(number_top: number): Observable<Word[]> {
    let params = new HttpParams().set('number_top', number_top.toString());
    return this.http.get<Word[]>(`${this.apiUrl}/country/get_topics/`, {params});
  }

  getProvinces():Observable<any>{
    return this.http.get<YearsResponse[]>(`${this.apiUrl}/province/get_provinces/`);
  }




}
