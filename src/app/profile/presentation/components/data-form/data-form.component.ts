import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
})
export class DataFormComponent {

  @Input() user: any;
  @Output() formSubmitted = new EventEmitter<void>();

  formData = {
    first_name: '',
    last_name: '',
    scopus_id: '',
    institution: '',
    website: '',
    investigation_camp: '',
    profile_picture: '',
    email_institution: '',
  };

  ngOnInit() {
    if (this.user) {
      this.formData = {
        first_name: this.user.first_name || '',
        last_name: this.user.last_name || '',
        scopus_id: this.user.scopus_id || '',
        institution: this.user.institution || '',
        website: this.user.website || '',
        investigation_camp: this.user.investigation_camp || '',
        profile_picture: this.user.profile_picture || '',
        email_institution: this.user.email_institution || '',
      };
    }
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log(this.formData);
    this.formSubmitted.emit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.profile_picture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  preventNonNumeric(event: KeyboardEvent): void {
    if (event.key < '0' || event.key > '9') {
      event.preventDefault();
    }
  }
}
