import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';
import { Group } from '../../domain/entities/group.interface';
import { GroupServiceDos } from '../../domain/entities/groupdos.service';


@Component({
  selector: 'list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements AfterViewInit, OnInit {
  user: any;
  groups : Group [] = []
  modalOpen: boolean = false;

  constructor(private userDataService: UserDataService, private groupService: GroupServiceDos, private router:Router) { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  ngOnInit(): void {
    this.userDataService.getUser().subscribe(user => {
      this.user = user;
      if (this.user.isOwnProfile) {
        this.loadGroups();
      }
    });
  }

  loadGroups(): void {
    const userId = '6kVoleSRyj';  // Suponiendo que tienes un ID de usuario a usar
    this.groupService.getGroupsByUserId(userId).subscribe({
      next: (groups) => {
        this.groups = groups.map(group => ({
          ...group,
          owner: 'Default Owner',  // Valor quemado temporal
          phase: '1/3'  // Valor quemado temporal
        }));
      },
      error: (error) => console.error('Error fetching groups:', error)
    });
  }

  navigateToGroup(groupId: number): void {
    if (!this.modalOpen) {
      this.router.navigate([`/profile/my-groups/${groupId}/consensus`]);
    }
  }

  onModalOpenChange(open: boolean) {
    this.modalOpen = open;
  }

  onConfirmLeave() {
    // Aquí puedes manejar la lógica cuando se confirma la salida del grupo
    console.log('Group left');
  }

  onCancelLeave() {
    // Aquí puedes manejar la lógica cuando se cancela la salida del grupo
    console.log('Leave cancelled');
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
}