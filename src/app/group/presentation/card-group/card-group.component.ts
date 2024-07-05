import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent {
  groups = [
    { id: 1, name: 'Group XYZ', owner: 'Bob', phase: '1/3' },
    // Añadir más grupos según sea necesario
  ];

  constructor(private router: Router) {}

  navigateToGroup(groupId: number): void {
    this.router.navigate([`/profile/my-groups/${groupId}/consensus`]);
  }
  

}
