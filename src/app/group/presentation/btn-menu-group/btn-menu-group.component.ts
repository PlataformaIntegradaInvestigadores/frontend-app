import { Component, HostListener, Input } from '@angular/core';
import { GroupService } from '../../domain/entities/group.service';
import { ModalService } from '../../domain/services/modalService.service';


@Component({
  selector: 'btn-menu-group',
  templateUrl: './btn-menu-group.component.html',
  styleUrls: ['./btn-menu-group.component.css'],
})
export class BtnMenuGroupComponent {

  @Input() isOwner: boolean = false;
  menuOpen: boolean = false;
  showConfirmLeaveModal = false;
  showDeleteGroupModal = false;
  modalOpen: boolean = false;

  constructor(private groupService: GroupService, private modalService: ModalService) {
    this.modalService.modalOpen$.subscribe(isOpen => this.modalOpen = isOpen);
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
    this.groupService.leaveGroup("a").subscribe(() => {
      console.log('Left the group');
      this.showConfirmLeaveModal = false;
      this.modalService.setModalOpen(false);
    });
  }

  onCancelLeave() {
    this.showConfirmLeaveModal = false;
    this.modalService.setModalOpen(false);
  }

  onConfirmDelete() {
    console.log('Group deleted');
    this.showDeleteGroupModal = false;
    this.modalService.setModalOpen(false);
  }

  onCancelDelete() {
    this.showDeleteGroupModal = false;
    this.modalService.setModalOpen(false);
  }
}
