import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, LoginCredentials, AuthResponse } from '../entities/interfaces';
import { User as Users } from 'src/app/group/presentation/user.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

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

/* todo utilizar outhservice is loging acces*/
  getToken(): Observable<string | null> {
    const token = this.tokenSubject.value;
    if (token) {
      return of(token);
    }
    const refreshToken = localStorage.getItem('accessToken');
    if (refreshToken) {
      return this.refreshAccessToken().pipe(
        tap((newToken: AuthResponse) => this.tokenSubject.next(newToken.access)), // Extract the 'access' token from the 'AuthResponse' object
        map(response => response.access)
      );
    }
    return of(null);
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
        this.tokenSubject.next(response.access);
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
  getUsers(): Observable<Users[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return throwError(() => new Error('Access token not found'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<Users[]>(`${this.apiUrl}/users/`, { headers }).pipe(
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
    const dontShowOnboarding = localStorage.getItem('dontShowOnboarding');
    localStorage.clear();
    if (dontShowOnboarding) {
      localStorage.setItem('dontShowOnboarding', dontShowOnboarding);
    }
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
}
