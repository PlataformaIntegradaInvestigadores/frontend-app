import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {
  @Input() contactInfo: { type: string, value: string }[] = [];
  @Input() isOwnProfile?: boolean;
  @Output() saveContactInfo = new EventEmitter<{ type: string, value: string }[]>();
  @Output() toggleEdit = new EventEmitter<void>();

  isEditing: boolean = false;
  editableContactInfo: { type: string, value: string }[] = [];
  newContactValue: string = '';
  saveMessage: string = '';

  ngOnChanges(): void {
    this.editableContactInfo = [...this.contactInfo];
  }

  toggleEditContactInfo(): void {
    this.isEditing = !this.isEditing;
    this.toggleEdit.emit();
  }

  save(): void {
    this.saveContactInfo.emit(this.editableContactInfo);
    this.isEditing = false;
    this.displaySaveMessage();
  }

  cancel(): void {
    this.isEditing = false;
    this.editableContactInfo = [...this.contactInfo];
  }

  addContactInfo(): void {
    const type = this.detectContactType(this.newContactValue);
    if (type && this.newContactValue) {
      this.editableContactInfo.push({ type, value: this.newContactValue });
      this.newContactValue = '';
    }
  }

  removeContactInfo(contact: { type: string, value: string }): void {
    const index = this.editableContactInfo.indexOf(contact);
    if (index > -1) {
      this.editableContactInfo.splice(index, 1);
    }
  }

  detectContactType(value: string): string {
    // Prioritize social media links
    if (/facebook\.com/.test(value)) {
      return 'facebook';
    } else if (/twitter\.com/.test(value) || /x\.com/.test(value)) { // Add x.com
      return 'x';
    } else if (/linkedin\.com/.test(value)) {
      return 'linkedin';
    } else if (/^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(value)) {
      return 'website';
    } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      return 'email';
    } else if (/^\d{10}$/.test(value)) {
      return 'phone';
    } else {
      return 'other';
    }
  }

  isUrl(value: string): boolean {
    const urlPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    const socialMediaPattern = /(facebook\.com|twitter\.com|x\.com|linkedin\.com)/; // Add x.com
    return urlPattern.test(value) || socialMediaPattern.test(value);
  }

  getContactIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'phone':
        return 'fa-solid fa-phone';
      case 'email':
        return 'fa-solid fa-envelope';
      case 'website':
        return 'fa-solid fa-link';
      case 'facebook':
        return 'fa-brands fa-facebook';
      case 'x':
        return 'fa-brands fa-x-twitter'; // Assuming there is a FontAwesome icon for X
      case 'linkedin':
        return 'fa-brands fa-linkedin';
      default:
        return 'fa-solid fa-info-circle';
    }
  }

  displaySaveMessage(): void {
    this.saveMessage = 'Changes saved successfully!';
    setTimeout(() => {
      this.saveMessage = '';
    }, 3000); // Hide message after 3 seconds
  }
}
