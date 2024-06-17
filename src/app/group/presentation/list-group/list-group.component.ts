import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';

@Component({
  selector: 'list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initFlowbite();
  }

  user: any;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
      console.log(this.user.isOwnProfile);
    });
  }
}