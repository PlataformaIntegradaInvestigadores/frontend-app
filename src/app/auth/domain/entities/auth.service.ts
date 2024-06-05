import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './interfaces';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<{ access: string, refresh: string }>(`${this.apiUrl}/api/token/`, credentials).pipe(
      tap(response => this.setSession(response)),
      catchError(this.handleError)
    );
  }

  private setSession(authResult: { access: string, refresh: string }): void {
    const decodedToken = jwtDecode(authResult.access) as any;
    localStorage.setItem('accessToken', authResult.access);
    localStorage.setItem('refreshToken', authResult.refresh);
    localStorage.setItem('userId', decodedToken.user_id);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);

    let errorMessages: string[] = ['An unknown error occurred!'];

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessages = [`Client-side error: ${error.error.message}`];
    } else if (error.error) {
      // Server-side error
      if (error.status === 400 && error.error.errors) {
        errorMessages = [];
        for (const key in error.error.errors) {
          if (error.error.errors.hasOwnProperty(key)) {
            errorMessages.push(`${error.error.errors[key].join(', ')}`);
          }
        }
      } else {
        errorMessages = [`Server-side error: ${error.error.detail || error.message}`];
      }
    }

    return throwError(() => new Error(errorMessages.join('\n')));
  }
  private refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('Refresh token not found'));
    }
    return this.http.post<{ access: string }>(`${this.apiUrl}/api/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.access);
      })
    );
  }

  updateUser(user: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      return throwError(() => new Error('User ID not found'));
    }
    return this.http.put(`${this.apiUrl}/users/${userId}/update/`, user, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    }).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshAccessToken().pipe(
            switchMap(() => this.updateUser(user))
          );
        }
        return this.handleError(error);
      })
    );
  }
}
