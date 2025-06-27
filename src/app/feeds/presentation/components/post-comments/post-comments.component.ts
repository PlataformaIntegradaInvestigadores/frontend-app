import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent {
  @Input() postId!: string;
  @Input() commentsCount: number = 0;
}
