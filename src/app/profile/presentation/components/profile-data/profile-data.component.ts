import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserProfile, ScopusData} from 'src/app/profile/domain/entities/user.interfaces';
import {Author} from 'src/app/shared/interfaces/author.interface';
import {LineChartInfo, Year} from "../../../../shared/interfaces/dashboard.interface";
import {AuthorService} from "../../../../search-engine/domain/services/author.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnChanges, OnInit {
  @Input() user: UserProfile | undefined;
  @Input() isOwnProfile: boolean = false;
  @Input() authorCentinela: Author | undefined;

  showForm = false;
  isLoggedIn: boolean = false;
  scopusData: ScopusData = {citations: 0, documents: 0};

  idRoute!: string

  years: LineChartInfo[] | undefined
  charged: boolean = false

  name!: string

  constructor(private authorService: AuthorService, private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.checkLoginStatus();
    }
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.idRoute = params?.get('id')!;
      if (this.isNumeric(this.idRoute)) {
        this.authorService.getAuthorById(this.idRoute).subscribe(data => {
          this.name = data.auth_name
          this.authorService.getLineChartInfo(this.idRoute, this.name).subscribe(data => {
            // this.years = []
            this.years = data
            this.charged = true
          })
        })
      }
    });
  }

  isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

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
  goToScopus(scopus_id: string | number | undefined) {
    window.open(`https://www.scopus.com/authid/detail.uri?authorId=${scopus_id}`, '_blank');
  }

}
