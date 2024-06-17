import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { InformationService } from 'src/app/profile/domain/services/information.service';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  userInfo: any = {};
  disciplines: string[] = [];
  contactInfo: { type: string, value: string }[] = [];

  user: any;
  isloggedIn: boolean = false;

  constructor(
    private informationService: InformationService,
    private authService: AuthService,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.userDataService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.fetchPublicInformation(this.user.user_id);
      }
    });

    this.isloggedIn = this.authService.isLoggedIn();
  }

  fetchPublicInformation(userId: string): void {
    this.informationService.getPublicInformation(userId).subscribe(info => {
      this.userInfo = info || {};
      this.disciplines = info.disciplines || [];
      this.contactInfo = info.contact_info || [];
    });
  }

  saveAboutMe(aboutMe: string): void {
    this.informationService.updateInformation({ about_me: aboutMe }).subscribe(response => {
      this.userInfo.about_me = response.about_me;
    });
  }

  saveDisciplines(disciplines: string[]): void {
    this.informationService.updateInformation({ disciplines }).subscribe(response => {
      this.disciplines = response.disciplines;
    });
  }

  saveContactInfo(contactInfo: { type: string, value: string }[]): void {
    this.informationService.updateInformation({ contact_info: contactInfo }).subscribe(response => {
      this.contactInfo = response.contact_info;
    });
  }

  toggleEdit(): void {
    // Implement logic to handle toggle edit state if needed
  }
}
