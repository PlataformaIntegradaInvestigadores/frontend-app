import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/profile/domain/entities/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  unsubscribe() {
    throw new Error('Method not implemented.');
  }
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() { }

  /**
   * Cambia el usuario actual.
   * @param user - El nuevo usuario.
   */
  changeUser(user: User | null): void {
    this.userSubject.next(user);
  }

  /**
   * Establece el usuario actual.
   * @param user - El usuario a establecer.
   */
  setUser(user: User | null): void {
    if (user && user.id && !user.isOwnProfile) {
      user.isOwnProfile = this.isCurrentUser(user.id);
    }
    this.userSubject.next(user);
  }

  /**
   * Verifica si el usuario actual es el propietario del perfil.
   * @param userId - El ID del usuario.
   * @returns Verdadero si el usuario es el propietario del perfil, falso en caso contrario.
   */
  private isCurrentUser(userId: string): boolean {
    const currentUserId = localStorage.getItem('userId');
    return currentUserId === userId;
  }

  /**
   * Obtiene el usuario actual como un Observable.
   * @returns Un Observable que emite el usuario actual.
   */
  getUser(): Observable<User | null> {
    return this.user$;
  }
}
