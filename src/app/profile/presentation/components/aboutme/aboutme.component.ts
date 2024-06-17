// aboutme.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/domain/entities/auth.service';
import { UserDataService } from 'src/app/profile/domain/entities/user_data.service';

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
      console.log(this.user);
    });
    this.isloggedIn = this.authService.isLoggedIn();
  }
}