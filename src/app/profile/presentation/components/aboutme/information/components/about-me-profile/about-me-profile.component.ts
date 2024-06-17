import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about-me-profile',
  templateUrl: './about-me-profile.component.html',
  styleUrls: ['./about-me-profile.component.css']
})
export class AboutMeProfileComponent {
  @Input() userInfo: any;
  @Input() isOwnProfile?: boolean;
  @Output() saveAboutMe = new EventEmitter<string>();
  @Output() toggleEdit = new EventEmitter<void>();

  isEditing: boolean = false;
  editableUserInfo: any = {};
  saveMessage: string = '';

  ngOnChanges(): void {
    this.editableUserInfo = { ...this.userInfo };
  }

  toggleEditAboutMe(): void {
    this.isEditing = !this.isEditing;
    this.toggleEdit.emit();
  }

  save(): void {
    this.saveAboutMe.emit(this.editableUserInfo.about_me);
    this.isEditing = false;
    this.displaySaveMessage();
  }

  cancel(): void {
    this.isEditing = false;
    this.editableUserInfo = { ...this.userInfo };
  }

  displaySaveMessage(): void {
    this.saveMessage = 'Changes saved successfully!';
    setTimeout(() => {
      this.saveMessage = '';
    }, 3000); // Hide message after 3 seconds
  }
}
