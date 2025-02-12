import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LLMSearchService {
  private apiUrl = environment.apiCentinela;

  constructor(private http: HttpClient) {}

  semanticSearch(query: string, topK: number = 10): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/llm-search/semantic-search/`, {
      query,
      top_k: topK
    });
  }
}