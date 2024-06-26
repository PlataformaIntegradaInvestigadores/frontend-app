import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/domain/entities/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navOpen: boolean = false;
  isActive: boolean = true;
  showLogin: boolean = false;
  user: any;
  userId: any;

  constructor(private router: Router, private authService: AuthService) { }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
  @Input({ required: false })
  showInformation: boolean = false;

  ngOnInit(): void {
    this.showLogin = !this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }


  profile() {
    this.authService.getUserId();
    this.userId = this.authService.getUserId();
    this.router.navigate([`${this.userId}/about-me`]);
  }
}