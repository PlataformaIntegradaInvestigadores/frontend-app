import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'search-engine-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showHomeButton: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        this.showHomeButton = url.endsWith('analitica') || url.endsWith('author-list');
      }
    });
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu!.classList.toggle('hidden');
  }
}
