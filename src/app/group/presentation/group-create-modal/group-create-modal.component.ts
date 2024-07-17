// group-create-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';
import { GroupService } from 'src/app/group/domain/entities/group.service';

@Component({
  selector: 'app-group-create-modal',
  templateUrl: './group-create-modal.component.html',
  styleUrls: ['./group-create-modal.component.css']
})
export class GroupCreateModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  groupForm: FormGroup;
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUsers: any[] = [];
  searchQuery: string = '';

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private authService: AuthService,
    private topicService: TopicService
  ) {
    this.groupForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      userSearch: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
    const userSearchControl = this.groupForm.get('userSearch');
    if (userSearchControl) {
      userSearchControl.valueChanges.subscribe(value => {
        this.searchQuery = value;
        this.filterUsers();
      });
    }
  }

  loadUsers() {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers() {
    const filterValue = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(filterValue) &&
      !this.selectedUsers.includes(user)
    );
  }

  onUserSelect(user: any) {
    if (!this.selectedUsers.includes(user)) {
      this.selectedUsers.push(user);
      const userSearchControl = this.groupForm.get('userSearch');
      if (userSearchControl) {
        userSearchControl.setValue('');
      }
      this.filterUsers();
    }
  }

  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
    this.filterUsers();
  }

  onSubmit() {
    if (this.groupForm.valid) {
      const groupData: any = {
        title: this.groupForm.get('title')?.value,
        description: this.groupForm.get('description')?.value,
      };
      if (this.selectedUsers.length > 0) {
        groupData.users = this.selectedUsers.map(user => user.id);
      }



      this.groupService.createGroup(groupData).subscribe(
        response => {
         
          
          window.location.reload();
      
        },
        error => {
          console.error('Error creating group', error);
        }
      );
    }
  }

  closeModal() {
    this.close.emit();
  }

  getControl(controlName: string) {
    return this.groupForm.get(controlName);
  }

  capitalizeInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
  }

}