import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedPost } from '../../types/post.types';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css']
})
export class PostActionsComponent {
  @Input() post!: FeedPost;
  @Input() showActions: boolean = true;
  @Input() showComments: boolean = true;
  @Input() isLiking: boolean = false;
  @Input() showCommentsSection: boolean = false;
  
  @Output() likeClick = new EventEmitter<void>();
  @Output() commentToggle = new EventEmitter<void>();

  onLikeClick(): void {
    this.likeClick.emit();
  }

  onCommentToggle(): void {
    this.commentToggle.emit();
  }
}
