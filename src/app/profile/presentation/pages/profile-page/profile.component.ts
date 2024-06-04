// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/domain/entities/auth.service';
import { UserService } from 'src/app/profile/domain/entities/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string = '0';
  user = {
    "first_name": "Danny",
    "last_name": "Cabrera",
    "scopus_id": 1234567,
    "institution": 'Escuela Politécnica Nacional',
    "website": 'dannycabrera.com',
    "investigation_camp": 'Software Engineering',
    "profile_picture": "http://127.0.0.1:8000/media/profile_pictures/default_profile_picture.png",
    "email_institution": 'danny.cabrera@epn.edu.ec',
    "user_id": this.userId
  }
  isOwnProfile: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserData();
      this.user.user_id = this.userId;
      this.checkIfOwnProfile();
    });
  
  }

  getUserData() {
    this.userService.getUserById(this.userId.toString()).subscribe(data => {
      this.user = data;
    });
  }

  checkIfOwnProfile() {
    this.isOwnProfile = this.userId === this.authService.getUserId();
  }
}
