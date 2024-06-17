import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/profile/domain/entities/post.interface';
import { PostService } from 'src/app/profile/domain/services/post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Input() user: any;
  @Output() deletePost = new EventEmitter<string>();

  constructor(private postService: PostService) { }

  onDeletePost(postId: string) {
    this.deletePost.emit(postId);
  }

  loadPosts(userId: string): void {
    this.postService.getPosts(userId).subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }
}
