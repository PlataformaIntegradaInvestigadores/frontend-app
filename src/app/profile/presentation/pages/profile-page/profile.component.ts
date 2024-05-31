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
  userId: number = 0;
  user = {
    "first_name": "Danny",
    "last_name": "Cabrera",
    "scopus_id": 1234567
  }
  isOwnProfile: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.getUserData();
    });
    if (this.userId === parseInt(this.authService.getUserId() ?? '')) {
      this.isOwnProfile = true;
    }
  }

  getUserData() {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    });
  }
}