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
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUserData();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  /**
   * Carga los datos del usuario si están disponibles, de lo contrario, carga los datos del autor.
   */
  private loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data: UserProfile) => {
        this.user = { ...data, id: this.userId, isOwnProfile: this.isOwnProfile };
        this.authorCentinela = undefined;  // Limpiar datos del autor
        this.checkIfOwnProfile();
        this.userDataService.setUser(this.user, this.authorCentinela);
        this.setTitle();
        console.log('User data:', this.user);
      },
      error: (err) => {
        console.error('Error fetching user data', err);
        this.loadAuthorData(); // Si ocurre un error, cargar los datos del autor
      }
    });
  }

  /**
   * Carga los datos del autor.
   */
  private loadAuthorData(): void {
    this.authorService.getAuthorById(this.userId).subscribe({
      next: (data: Author) => {
        this.authorCentinela = data;
        this.user = null;  // Limpiar datos del usuario
        this.titleService.setTitle(`${data.first_name} ${data.last_name}`);
        console.log('Author data:', this.authorCentinela);
      },
      error: (err) => {
        console.error('Error fetching author data', err);
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
   * Establece el título de la página usando el nombre y apellido del usuario o del autor.
   */
  private setTitle(): void {
    if (this.user) {
      const title = `${this.user.first_name} ${this.user.last_name}`;
      this.titleService.setTitle(title);
    } else if (this.authorCentinela) {
      const title = `${this.authorCentinela.first_name} ${this.authorCentinela.last_name}`;
      this.titleService.setTitle(title);
    }
  }
}
