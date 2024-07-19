// header.component.ts
import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { User } from 'src/app/group/presentation/user.interface';

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

  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  searchOpen: boolean = false;  // Variable para controlar la apertura del buscador

  constructor(private router: Router, private authService: AuthService) { }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  openSearch() {
    this.searchOpen = true;
  }

  closeSearch() {
    this.searchOpen = false;
    this.searchQuery = '';
    this.filteredUsers = [];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeSearch();
    }
  }

  @Input({ required: false })
  showInformation: boolean = false;

  ngOnInit(): void {
    this.showLogin = !this.authService.isLoggedIn();
    this.loadUsers();
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
    this.router.navigate([`/profile/${this.userId}/about-me`]);
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers(): void {
    const filterValue = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(filterValue)
    );
  }

  generateUserGroupUrl(userId: string): string {
    return `/profile/${userId}/about-me`;
  }
}
