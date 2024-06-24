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
  user: any;
  groups : Group [] = []
  modalOpen: boolean = false;

  isOwner: boolean = false; 
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
    this.userDataService.getUser().subscribe(user => {
      this.user = user;
      console.log('User2:', this.isOwner);
      if (this.user && this.user.isOwnProfile) {
        this.isOwner = this.user.isOwnProfile;
        this.loadGroups(this.user.id);
      } 
    });
  }

  loadGroups(userId: string): void {
    if (userId) {
      this.getGroupService.getGroupsByUserId().subscribe({
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