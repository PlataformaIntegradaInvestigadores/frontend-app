import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent {
  @Input() disciplines: string[] = [];
  @Input() isOwnProfile?: boolean;
  @Output() saveDisciplines = new EventEmitter<string[]>();
  @Output() toggleEdit = new EventEmitter<void>();

  isEditing: boolean = false;
  editableDisciplines: string[] = [];
  newDiscipline: string = '';
  saveMessage: string = '';

  ngOnChanges(): void {
    this.editableDisciplines = [...this.disciplines];
  }

  toggleEditDisciplines(): void {
    this.isEditing = !this.isEditing;
    this.toggleEdit.emit();
  }

  save(): void {
    this.saveDisciplines.emit(this.editableDisciplines);
    this.isEditing = false;
    this.displaySaveMessage();
  }

  cancel(): void {
    this.isEditing = false;
    this.editableDisciplines = [...this.disciplines];
  }

  addDiscipline(): void {
    if (this.newDiscipline) {
      this.editableDisciplines.push(this.newDiscipline);
      this.newDiscipline = '';
    }
  }

  removeDiscipline(index: number): void {
    this.editableDisciplines.splice(index, 1);
  }

  displaySaveMessage(): void {
    this.saveMessage = 'Changes saved successfully!';
    setTimeout(() => {
      this.saveMessage = '';
    }, 3000); // Hide message after 3 seconds
  }
}
