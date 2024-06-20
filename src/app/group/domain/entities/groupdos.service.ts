import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Group } from './group.interface';

@Injectable({
  providedIn: 'root'})
export class GroupServiceDos {
  private apiUrl = `${environment.apiUrl}/test/user/groups/`; // Base URL para las peticiones a /test/user/groups/

  constructor(private http: HttpClient) { }

  // Método para obtener grupos con un user_id específico sin autenticación
  getGroupsByUserId(userId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}?user_id=${userId}`)
      .pipe(
        tap(data => console.log('Response:', data)), // Imprime la respuesta en la consola
        catchError(error => {
          throw new Error('Error fetching groups: ' + error.message);
        })
      );
  }
}
