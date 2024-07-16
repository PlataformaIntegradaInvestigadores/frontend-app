import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AffiliationInfo, TopicInfo} from "../../../shared/interfaces/dashboard.interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = environment.apiCentinela+'/api/v1/dashboard/';
  constructor(private http: HttpClient) { }

  searchAffiliations(query: string): Observable<AffiliationInfo[]> {
    let params = new HttpParams().set('query', query);
    return this.http.get<AffiliationInfo[]>(`${this.apiUrl}affiliation/search/`, { params });
  }
  searchTopics(query: string): Observable<TopicInfo[]>{
    let params = new HttpParams().set('query', query);
    return this.http.get<TopicInfo[]>(`${this.apiUrl}country/search/`, { params });
  }
}
