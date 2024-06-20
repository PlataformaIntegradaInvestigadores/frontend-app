import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '../../domain/entities/group.interface';
import { GroupServiceDos } from '../../domain/entities/groupdos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent implements OnInit, OnDestroy {
  groups: Group[] = [];
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
  }
}
