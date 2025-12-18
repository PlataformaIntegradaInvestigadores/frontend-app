// src/app/shared/domain/services/rag-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AskRequest, AskResponse } from '../interfaces/rag-api.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RagApiService {
  private base = environment.apiRag;

  constructor(private http: HttpClient) {}

  ask(payload: AskRequest): Observable<AskResponse> {
    return this.http.post<AskResponse>(`${this.base}/ask`, payload);
  }

  health(): Observable<any> {
    return this.http.get(`${this.base}/health`);
  }
}
