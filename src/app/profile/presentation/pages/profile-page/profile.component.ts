import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { UserService } from 'src/app/profile/domain/services/user.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';
import { UserProfile, User } from 'src/app/profile/domain/entities/user.interfaces';
import { AuthorService } from 'src/app/search-engine/domain/services/author.service';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string = '0';
  user: User | null = null;
  isOwnProfile: boolean = false;
  private routeSub: Subscription = new Subscription();
  authorCentinela: Author | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private titleService: Title,
    private authorService:AuthorService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserData();
      this.getAuthorInformation();
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
  private getUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data: UserProfile) => {
        this.user = { ...data, id: this.userId, isOwnProfile: this.isOwnProfile };
        this.checkIfOwnProfile();
        this.userDataService.setUser(this.user, this.authorCentinela); // Establecemos el usuario en UserDataService
        this.setTitle();
        console.log('User data:', this.user);
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

  /**
   * Verifica si el perfil pertenece al usuario autenticado.
   */
  private checkIfOwnProfile(): void {
    this.isOwnProfile = this.userId === this.authService.getUserId();
    if (this.user) {
      this.user.isOwnProfile = this.isOwnProfile;
    }
  }

  /**
   * Establece el título de la página usando el nombre y apellido del usuario.
   */
  private setTitle(): void {
    if (this.user) {
      const title = `${this.user.first_name} ${this.user.last_name}`;
      this.titleService.setTitle(title);
    }
  }

  getAuthorInformation(){
    try {
        this.authorService.getAuthorById(this.userId).subscribe((data) => {
          this.authorCentinela = data;
        }
      );
    } catch (error) {
      console.log(error)
    }
  }
}
