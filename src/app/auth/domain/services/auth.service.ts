import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, LoginCredentials, AuthResponse } from '../entities/interfaces';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Registra un nuevo usuario.
   * @param user - Los datos del usuario a registrar.
   * @returns Un Observable que emite la respuesta del registro.
   */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, user).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param credentials - Las credenciales del usuario (nombre de usuario y contraseña).
   * @returns Un Observable que emite la respuesta del inicio de sesión.
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/`, credentials).pipe(
      tap(response => this.setSession(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Establece la sesión del usuario almacenando los tokens en el almacenamiento local.
   * @param authResult - El resultado de la autenticación que contiene los tokens.
   */
  private setSession(authResult: AuthResponse): void {
    const decodedToken = jwtDecode(authResult.access) as any;
    localStorage.setItem('accessToken', authResult.access);
    localStorage.setItem('refreshToken', authResult.refresh);
    localStorage.setItem('userId', decodedToken.user_id);
  }

  /**
   * Cierra la sesión del usuario eliminando los tokens del almacenamiento local.
   */
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns Verdadero si el usuario está autenticado, falso en caso contrario.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Obtiene el ID del usuario actualmente autenticado.
   * @returns El ID del usuario o null si no está autenticado.
   */
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  /**
   * Refresca el token de acceso utilizando el token de actualización.
   * @returns Un Observable que emite la nueva respuesta del token de acceso.
   */
  private refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('Refresh token not found'));
    }
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/refresh/`, { refresh: refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.access);
      })
    );
  }

  /**
    * Actualiza la información del usuario.
    * @param formData - Los datos del formulario a actualizar.
    * @returns Un Observable que emite la respuesta de la actualización.
    */
  updateUser(formData: FormData): Observable<any> {
    console.log(formData);
    const userId = this.getUserId();
    if (!userId) {
      return throwError(() => new Error('User ID not found'));
    }
    return this.http.put(`${this.apiUrl}/users/${userId}/update/`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      })
    }).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshAccessToken().pipe(
            switchMap(() => this.updateUser(formData))
          );
        }
        return this.handleError(error);
      })
    );
  }


  /**
   * Obtiene una lista de usuarios.
   * @returns Un Observable que emite la lista de usuarios.
   */
  getUsers(): Observable<User[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return throwError(() => new Error('Access token not found'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<User[]>(`${this.apiUrl}/users/`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.refreshAccessToken().pipe(
            switchMap(() => this.getUsers())
          );
        }
        return this.handleError(error);
      })
    );
  }

  /**
   * Maneja los errores de las solicitudes HTTP.
   * @param error - El error de la solicitud HTTP.
   * @returns Un Observable que emite el error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);

    let errorMessages: string[] = ['An unknown error occurred!'];

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessages = [`Client-side error: ${error.error.message}`];
    } else if (error.error) {
      // Error del lado del servidor
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
}
