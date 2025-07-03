import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedPost } from '../../types/post.types';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent {
  @Input() post!: FeedPost;
  @Input() canEditPost: boolean = false;
  @Input() formattedDate!: string;
  
  @Output() profileClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<void>();

  onProfileClick(): void {
    this.profileClick.emit();
  }

  onDeleteClick(): void {
    this.deleteClick.emit();
  }

  onEditClick(): void {
    this.editClick.emit();
  }
}
