import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor() { }

  /**
   * Cambia el usuario actual.
   * @param user - El nuevo usuario.
   */
  changeUser(user: any): void {
    this.userSource.next(user);
  }

  /**
   * Establece el usuario actual.
   * @param user - El usuario a establecer.
   */
  setUser(user: any): void {
    this.userSubject.next(user);
  }

  /**
   * Obtiene el usuario actual como un Observable.
   * @returns Un Observable que emite el usuario actual.
   */
  getUser(): Observable<any> {
    return this.user$;
  }
}
