import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/profile/domain/services/user_data.service';
import { Group } from '../../domain/entities/group.interface';
import { GetGroupsService } from '../../domain/services/getGroupsUser.service';
import { LoadingService } from '../../domain/services/loadingService.service';


@Component({
  selector: 'list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements AfterViewInit, OnInit {
  userId: string | null = null;
  user: any;
  groups : Group [] = []
  modalOpen: boolean = false;

  isOwnerMap: { [key: string]: boolean } = {};
  loading$ = this.loadingService.loading$;

  constructor(
    private userDataService: UserDataService, 
    private getGroupService: GetGroupsService,
    private router:Router,
    private loadingService: LoadingService) { }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log('Authenticated User ID:', this.userId);
    if (this.userId) {
      this.loadGroups();
    }
  }

  loadGroups(): void {
    this.getGroupService.getGroupsByUserId().subscribe({
      next: (groups) => {
        this.groups = groups.map(group => ({
          ...group,
          owner: 'Default Owner',  // Valor quemado temporal
          phase: '1/3'  // Valor quemado temporal
        }));
        console.log('Groups loaded:', this.groups);
        this.updateIsOwnerMap();
        console.log('isOwnerMap:', this.isOwnerMap);
      },
      error: (error) => console.error('Error fetching groups:', error)
    });
  }

  updateIsOwnerMap(): void {
    if (this.userId) {
      this.groups.forEach(group => {
        this.isOwnerMap[group.id] = this.userId === group.admin_id;
        console.log(`Group ID: ${group.id},Auth ID: ${this.userId}, Admin ID: ${group.admin_id}, isOwner: ${this.isOwnerMap[group.id]}`);
      });
    }
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
}