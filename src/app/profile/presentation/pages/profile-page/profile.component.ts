import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { UserService } from 'src/app/profile/domain/services/user.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string = '0';
  user: any = {
    first_name: 'Danny',
    last_name: 'Cabrera',
    scopus_id: 1234567,
    institution: 'Escuela Politécnica Nacional',
    website: 'dannycabrera.com',
    investigation_camp: 'Software Engineering',
    profile_picture: 'http://127.0.0.1:8000/media/profile_pictures/default_profile_picture.png',
    email_institution: 'danny.cabrera@epn.edu.ec',
    user_id: this.userId,
    isOwnProfile: true,
  };
  isOwnProfile: boolean = false;
  private routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserData();
      this.user.user_id = this.userId;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  /**
   * Obtiene los datos del usuario y actualiza el estado del componente.
   */
  getUserData(): void {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
      this.user.user_id = this.userId;
      this.checkIfOwnProfile();
      this.userDataService.setUser(this.user);
      this.setTitle();
    });
  }

  /**
   * Verifica si el perfil pertenece al usuario autenticado.
   */
  checkIfOwnProfile(): void {
    this.isOwnProfile = this.userId === this.authService.getUserId();
    this.user.isOwnProfile = this.isOwnProfile;
  }

  /**
   * Establece el título de la página usando el nombre y apellido del usuario.
   */
  setTitle(): void {
    const title = `${this.user.first_name} ${this.user.last_name}`;
    this.titleService.setTitle(title);
  }
}
