import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/profile/domain/entities/user_data.service';

@Component({
  selector: 'list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initFlowbite();
  }

  /* groups = [
    { id: 1, name: 'Group XYZ', owner: 'Bob', phase: '1/3' },
    // Añadir más grupos según sea necesario
  ];

  constructor(private router: Router) {}

  navigateToGroup(groupId: number): void {
    this.router.navigate([`/profile/my-groups/${groupId}/consensus`]);
  }
   */

  user: any;

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.currentUser.subscribe(user => {
      this.user = user;
    }
    );
    console.log(this.user);
  }
}