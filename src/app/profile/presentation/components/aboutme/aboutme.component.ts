import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/profile/domain/entities/user_data.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutMeComponent implements OnInit {
  user: any;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.currentUser.subscribe(user => {
      this.user = user;
      console.log('User data', this.user);
    });
  }
}