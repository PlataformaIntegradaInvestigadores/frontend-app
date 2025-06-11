import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthModalService, AuthModalState } from '../../domain/services/auth-modal.service';
import { UserType } from '../../domain/entities/interfaces';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  modalState: AuthModalState = { isOpen: false, type: null, userType: 'user' };
  private destroy$ = new Subject<void>();

  constructor(private authModalService: AuthModalService) {}
  ngOnInit(): void {
    this.authModalService.modalState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.modalState = state;
        
        // Prevenir scroll del body cuando el modal está abierto
        if (state.isOpen) {
          document.body.classList.add('modal-open');
          document.body.style.overflow = 'hidden';
        } else {
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Restaurar scroll del body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  /**
   * Cierra el modal
   */
  closeModal(): void {
    this.authModalService.closeModal();
  }

  /**
   * Maneja el click en el backdrop para cerrar el modal
   */
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  /**
   * Cambia a modo registro
   */
  switchToRegister(): void {
    this.authModalService.switchToRegister();
  }
  /**
   * Cambia a modo login
   */
  switchToLogin(): void {
    this.authModalService.switchToLogin();
  }

  /**
   * Cambia el tipo de usuario
   */
  switchUserType(userType: UserType): void {
    this.authModalService.switchUserType(userType);
  }
}
