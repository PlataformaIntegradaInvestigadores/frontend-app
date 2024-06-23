import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserProfile, ScopusData } from 'src/app/profile/domain/entities/user.interfaces';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnChanges {
  @Input() user: UserProfile | null = null;
  @Input() isOwnProfile: boolean = false;

  showForm = false;
  isLoggedIn: boolean = false;
  scopusData: ScopusData = { citations: 0, documents: 0 };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.checkLoginStatus();
    }
  }

  /**
   * Alterna el formulario de edición.
   */
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  /**
   * Verifica el estado de inicio de sesión del usuario.
   */
  checkLoginStatus(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');

    this.isLoggedIn = !!(accessToken && refreshToken && userId);
  }

  /**
   * Indica si debe mostrarse el mensaje para usuarios conectados.
   */
  get shouldShowLoggedInMessage(): boolean {
    return this.isLoggedIn && this.isOwnProfile && !this.hasUserDetails;
  }

  /**
   * Indica si debe mostrarse el mensaje para usuarios desconectados.
   */
  get shouldShowLoggedOutMessage(): boolean {
    return !this.isLoggedIn && !this.hasUserDetails || (this.isLoggedIn && !this.isOwnProfile && !this.hasUserDetails);
  }

  /**
   * Indica si el usuario tiene detalles en su perfil.
   */
  get hasUserDetails(): boolean {
    return !!this.user && !!(this.user.institution || this.user.website || this.user.investigation_camp || this.user.email_institution);
  }
}
