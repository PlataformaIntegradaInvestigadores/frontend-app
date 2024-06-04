// profile-data.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnChanges {
  @Input() user: any;
  @Input() isOwnProfile: boolean = false;

  showForm = false;
  isLoggedIn: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.checkLoginStatus();
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  checkLoginStatus() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');

    this.isLoggedIn = !!(accessToken && refreshToken && userId);
  }

  get shouldShowLoggedInMessage(): boolean {
    return this.isLoggedIn && this.isOwnProfile && !this.hasUserDetails;
  }

  get shouldShowLoggedOutMessage(): boolean {
    return !this.isLoggedIn && !this.hasUserDetails || (this.isLoggedIn && !this.isOwnProfile && !this.hasUserDetails);
  }

  get hasUserDetails(): boolean {
    return this.user && (this.user.institution || this.user.website || this.user.investigation_camp || this.user.email_institution);
  }
}