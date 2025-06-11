import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthModalState {
  isOpen: boolean;
  type: 'login' | 'register' | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  private modalStateSubject = new BehaviorSubject<AuthModalState>({
    isOpen: false,
    type: null
  });

  public modalState$ = this.modalStateSubject.asObservable();

  /**
   * Abre el modal de login
   */
  openLogin(): void {
    this.modalStateSubject.next({
      isOpen: true,
      type: 'login'
    });
  }

  /**
   * Abre el modal de registro
   */
  openRegister(): void {
    this.modalStateSubject.next({
      isOpen: true,
      type: 'register'
    });
  }

  /**
   * Cierra cualquier modal
   */
  closeModal(): void {
    this.modalStateSubject.next({
      isOpen: false,
      type: null
    });
  }

  /**
   * Cambia entre login y register
   */
  switchToLogin(): void {
    this.modalStateSubject.next({
      isOpen: true,
      type: 'login'
    });
  }

  /**
   * Cambia entre register y login
   */
  switchToRegister(): void {
    this.modalStateSubject.next({
      isOpen: true,
      type: 'register'
    });
  }

  /**
   * Obtiene el estado actual del modal
   */
  getCurrentState(): AuthModalState {
    return this.modalStateSubject.value;
  }
}
