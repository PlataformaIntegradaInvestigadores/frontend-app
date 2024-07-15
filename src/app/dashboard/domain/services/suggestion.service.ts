import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AffiliationInfo} from "../../../shared/interfaces/dashboard.interface";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = 'http://localhost:8000/api/v1/dashboard/';
  constructor(private http: HttpClient) { }

  searchAffiliations(query: string): Observable<AffiliationInfo[]> {
    let params = new HttpParams().set('query', query);
    return this.http.get<AffiliationInfo[]>(`${this.apiUrl}affiliation/search/`, { params });
  }
}
