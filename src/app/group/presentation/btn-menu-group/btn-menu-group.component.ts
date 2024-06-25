import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalService } from '../../domain/services/modalService.service';
import { GetGroupsService } from '../../domain/services/getGroupsUser.service';
import { GroupService } from '../../domain/entities/group.service';


@Component({
  selector: 'btn-menu-group',
  templateUrl: './btn-menu-group.component.html',
  styleUrls: ['./btn-menu-group.component.css'],
})
export class BtnMenuGroupComponent {

  @Input() isOwner: boolean = false;
  @Input() groupId: string = '';
  @Output() groupDeleted = new EventEmitter<string>();
  @Output() groupLeaveed = new EventEmitter<string>();
  menuOpen: boolean = false;
  showConfirmLeaveModal = false;
  showDeleteGroupModal = false;
  modalOpen: boolean = false;

  constructor(private groupService: GroupService, private modalService: ModalService) {
    this.modalService.modalOpen$.subscribe(isOpen => this.modalOpen = isOpen);
  }

  ngOnChanges(): void {
    console.log('isOwner:', this.isOwner);
  }

 @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
     if (this.menuOpen && !this.modalOpen) {
      this.menuOpen = false;
      this.modalService.setModalOpen(false);
      console.debug('Menu closed by clicking outside');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.modalService.setModalOpen(this.menuOpen);
    console.debug('Menu toggled', this.menuOpen);
  }

  deleteGroup() {
    console.debug('Opening delete group modal');
    this.showDeleteGroupModal = true;
    this.modalService.setModalOpen(true);
  }

  leaveGroup() {
    this.showConfirmLeaveModal = true;
    this.modalService.setModalOpen(true);
  }

  onConfirmLeave() {
    this.groupService.leaveGroup(this.groupId).subscribe(() => {
      console.log('Left the group');
      this.showConfirmLeaveModal = false;
      this.modalService.setModalOpen(false);
      this.groupLeaveed.emit(this.groupId);  // Emitir un evento para notificar al componente padre
      window.location.reload();
    });
  }

  onCancelLeave() {
    this.showConfirmLeaveModal = false;
    this.modalService.setModalOpen(false);
  }

  onConfirmDelete() {
    this.groupService.deleteGroup(this.groupId).subscribe(() => {
      console.log('Group deleted');
      this.showDeleteGroupModal = false;
      this.modalService.setModalOpen(false);
      this.groupDeleted.emit(this.groupId);  // Emitir un evento para notificar al componente padre
      window.location.reload();  // Recargar la página después de eliminar el grupo
    });
  }

  onCancelDelete() {
    this.showDeleteGroupModal = false;
    this.modalService.setModalOpen(false);
  }
}
