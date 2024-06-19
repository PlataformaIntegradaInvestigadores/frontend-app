import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutMeComponent implements OnInit {
  user: any;
  isloggedIn: boolean = false;

  constructor(private userDataService: UserDataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userDataService.getUser().subscribe(user => {
      this.user = user;
    });
    this.isloggedIn = this.authService.isLoggedIn();
  }
}
