import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';

@Component({
  selector: 'app-data-nav',
  templateUrl: './data-nav.component.html',
  styleUrls: ['./data-nav.component.css']
})
export class DataNavComponent implements OnChanges {
  @Input() user: any;
  @Input() isOwnProfile: boolean = false;
  isloggedIn: boolean = false;
  navOpen: boolean = false;

  constructor(private userDataService: UserDataService, private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.userDataService.changeUser(this.user);
      this.isloggedIn = this.authService.isLoggedIn();
    }
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
