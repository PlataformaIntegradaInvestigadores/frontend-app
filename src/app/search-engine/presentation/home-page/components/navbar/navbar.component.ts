import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'search-engine-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {


  constructor(private router: Router) {
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu!.classList.toggle('hidden');
  }
}
