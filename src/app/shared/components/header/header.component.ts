import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navOpen: boolean = false;
  isActive: boolean = true;

  constructor(private router: Router) {}

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
  @Input({ required: false })
  showInformation: boolean = false; // or false based on your logic
}
