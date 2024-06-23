import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '../../domain/entities/group.interface';
import { GroupServiceDos } from '../../domain/entities/groupdos.service';
import { Subscription } from 'rxjs';
import { colorSets } from '@swimlane/ngx-charts';
import { ModalService } from '../../domain/services/deleteMessage.service';

@Component({
  selector: 'card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent  {


  @Input() group: Group | undefined;
  @Output() navigate = new EventEmitter<number>();
  modalOpen: boolean = false;

  constructor(private router: Router, private modalService: ModalService) {
    this.modalService.modalOpen$.subscribe(isOpen => this.modalOpen = isOpen);
  }

  onNavigate() {
    if (this.group && !this.modalOpen) {
      const groupId = parseInt(this.group.id);
      this.navigate.emit(groupId);
      console.log('groupId', groupId);
    }
  }

  /* groups: Group[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private groupService: GroupServiceDos) {}

  ngOnInit() {
    const userId = '6kVoleSRyj';  // Suponiendo que tienes un ID de usuario a usar
    const sub = this.groupService.getGroupsByUserId(userId).subscribe({
      next: (groups) => {
        this.groups = groups.map(group => ({
          ...group,
          owner: 'Default Owner',  // Valor quemado temporal
          phase: '1/3'  // Valor quemado temporal
        }));
      },
      error: (error) => console.error('Error fetching groups:', error)
    });
    this.subscriptions.add(sub);  // Añade la suscripción para la gestión posterior
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();  // Limpia todas las suscripciones cuando el componente se destruye
  }

  navigateToGroup(groupId: string): void {
    this.router.navigate([`/profile/my-groups/${groupId}/consensus`]);
  } */
}
