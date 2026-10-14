// consensus.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Group } from 'src/app/group/domain/entities/group.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsensusService {
  // Grupo, admin_id, users y voting_type viven en identity (profile_identity_backend);
  // social-service retiró esta ruta legacy y responde 410 Gone.
  private apiUrl = `${environment.apiIdentity}/groups/`;

  constructor(private http: HttpClient) {}

  getGroupById(groupId: string): Observable<Group> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    return this.http
      .get<Group>(`${this.apiUrl}${groupId}/`, { headers })
      .pipe(catchError(this.handleError));
  }

  removeMember(groupId: string, memberId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    return this.http
      .delete(`${this.apiUrl}${groupId}/remove-member/${memberId}/`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.error) {
      errorMessage = `Server-side error: ${error.error.detail || error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
