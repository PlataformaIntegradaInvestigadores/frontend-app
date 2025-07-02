import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError, Subject } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, Company, LoginCredentials, AuthResponse, UserType } from '../entities/interfaces';
import { User as Users } from 'src/app/group/presentation/user.interface';
import { jwtDecode } from 'jwt-decode';
import { CompanyAuthService } from './company-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userTypeSubject: BehaviorSubject<UserType | null> = new BehaviorSubject<UserType | null>(null);
  private tokenRefreshSubject: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpClient,
    private companyAuthService: CompanyAuthService
  ) {
    const token = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType') as UserType;
    if (token) {
      this.tokenSubject.next(token);
    }
    if (userType) {
      this.userTypeSubject.next(userType);
    }
  }

  /**
   * Registra un nuevo usuario investigador.
   * @param user - Los datos del usuario a registrar.
   * @returns Un Observable que emite la respuesta del registro.
   */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, user).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Registra una nueva empresa.
   * @param company - Los datos de la empresa a registrar.
   * @returns Un Observable que emite la respuesta del registro.
   */
  registerCompany(company: Company): Observable<any> {
    return this.companyAuthService.register(company);
  }

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param credentials - Las credenciales del usuario.
   * @param userType - Tipo de usuario (investigador o empresa).
   * @returns Un Observable que emite la respuesta del inicio de sesión.
   */
  login(credentials: LoginCredentials, userType: UserType = 'user'): Observable<AuthResponse> {
    const endpoint = userType === 'company' ? '/companies/token/' : '/token/';
    
    return this.http.post<AuthResponse>(`${this.apiUrl}${endpoint}`, credentials).pipe(
      tap(response => {
        this.setSession(response, userType);
        // Notificar al monitor de tokens que reinicie el monitoreo
        this.notifyTokenRefresh();
      }),
      catchError(this.handleError)
    );
  }
  /**
   * Obtiene el tipo de usuario actual.
   * @returns El tipo de usuario o null.
   */
  getUserType(): UserType | null {
    return this.userTypeSubject.value || localStorage.getItem('userType') as UserType;
  }

  /**
   * Observable del tipo de usuario.
   */
  get userType$(): Observable<UserType | null> {
    return this.userTypeSubject.asObservable();
  }

  /**
   * Verifica si el usuario actual es una empresa.
   * @returns True si es empresa, false si no.
   */
  isCompany(): boolean {
    return this.getUserType() === 'company';
  }

  /**
   * Verifica si el usuario actual es un investigador.
   * @returns True si es investigador, false si no.
   */
  isUser(): boolean {
    return this.getUserType() === 'user';
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
  refreshToken(): Observable<AuthResponse> {
    return this.refreshAccessToken();
  }

  /**
   * Refresca el token de acceso utilizando el token de actualización (método privado).
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
        this.notifyTokenRefresh();
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
    return this.http.put(`${this.apiUrl}/users/${userId}/update/`, formData).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * Obtiene una lista de usuarios.
   * @returns Un Observable que emite la lista de usuarios.
   */
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/users/`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Observable para notificar cuando el token ha sido refrescado.
   */
  get tokenRefresh$(): Observable<void> {
    return this.tokenRefreshSubject.asObservable();
  }

  /**
   * Notifica que el token ha sido refrescado.
   */
  private notifyTokenRefresh(): void {
    this.tokenRefreshSubject.next();
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
    }    return throwError(() => new Error(errorMessages.join('\n')));
  }

  /**
   * Establece la sesión del usuario almacenando los tokens en el almacenamiento local.
   * @param authResult - El resultado de la autenticación que contiene los tokens.
   * @param userType - Tipo de usuario.
   */
  private setSession(authResult: AuthResponse, userType: UserType): void {
    localStorage.setItem('accessToken', authResult.access);
    localStorage.setItem('refreshToken', authResult.refresh);
    localStorage.setItem('userType', userType);
    
    // Decodificar token para obtener IDs
    const decodedToken = jwtDecode(authResult.access) as any;
    
    if (userType === 'user') {
      localStorage.setItem('userId', authResult.user_id || decodedToken.user_id);
    } else if (userType === 'company') {
      localStorage.setItem('companyId', authResult.company_id || decodedToken.company_id);
    }
    
    this.tokenSubject.next(authResult.access);
    this.userTypeSubject.next(userType);
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
    this.tokenSubject.next(null);
    this.userTypeSubject.next(null);
    
    // Notificar al monitor que detenga el monitoreo
    this.notifyLogout();
  }

  /**
   * Notifica que se ha cerrado sesión.
   */
  private notifyLogout(): void {
    // Podemos emitir un evento específico para logout si es necesario
    // Por ahora, el monitor se detiene automáticamente cuando no hay token
  }

  /**
   * Verifica si el usuario está autenticado y el token no ha expirado.
   * @returns Verdadero si el usuario está autenticado y el token es válido, falso en caso contrario.
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }
    
    return !this.isTokenExpired(token);
  }

  /**
   * Verifica si un token JWT ha expirado.
   * @param token El token JWT a verificar.
   * @returns True si el token ha expirado, false en caso contrario.
   */
  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = jwtDecode(token) as any;
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Si no se puede decodificar, considerarlo expirado
    }
  }

  /**
   * Obtiene el tiempo restante hasta la expiración del token en segundos.
   * @returns Segundos hasta la expiración o 0 si el token ha expirado.
   */
  getTokenExpirationTime(): number {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return 0;
    }
    
    try {
      const decodedToken = jwtDecode(token) as any;
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = decodedToken.exp - currentTime;
      return Math.max(0, timeUntilExpiration);
    } catch (error) {
      console.error('Error decoding token:', error);
      return 0;
    }
  }

  /**
   * Obtiene el ID del usuario actualmente autenticado.
   * @returns El ID del usuario o null si no está autenticado.
   */
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  /**
   * Obtiene el ID de la empresa actualmente autenticada.
   * @returns El ID de la empresa o null si no está autenticada.
   */
  getCompanyId(): string | null {
    return localStorage.getItem('companyId');
  }

  /**
   * Obtiene el ID del usuario o empresa según el tipo.
   * @returns El ID correspondiente o null.
   */
  getCurrentUserId(): string | null {
    const userType = this.getUserType();
    return userType === 'company' ? this.getCompanyId() : this.getUserId();
  }
}
