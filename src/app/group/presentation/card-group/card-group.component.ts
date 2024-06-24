import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '../../domain/entities/group.interface';
import { ModalService } from '../../domain/services/modalService.service';

@Component({
  selector: 'card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent  {


  @Input() group: Group | undefined;
  @Input() isOwner: boolean = false;
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
      console.log('isOwner2', this.isOwner);
    }
  }
}
