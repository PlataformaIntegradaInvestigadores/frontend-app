import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebateStatisticsService {

  private apiUrl = `${environment.apiUrl}/v1/debates`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las estadísticas de posturas de un debate específico.
   * @param debateId ID del debate.
   */
  getStatistics(debateId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    return this.http.get(`${this.apiUrl}/${debateId}/statistics/`, { headers });
  }
}
