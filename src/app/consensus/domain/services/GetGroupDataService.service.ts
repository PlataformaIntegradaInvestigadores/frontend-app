// consensus.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Group } from 'src/app/group/domain/entities/group.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsensusService {
  //private apiUrl = `${environment.apiUrl}/groups/`; // Ajusta la URL según tu configuración
  private apiUrl = `${environment.apiUrl}/groups/`; 

  constructor(private http: HttpClient) { }

  getGroupById(groupId: string): Observable<Group> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get<Group>(`${this.apiUrl}${groupId}/`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
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
