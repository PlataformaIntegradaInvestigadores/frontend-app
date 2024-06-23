import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/profile/domain/entities/post.interface';
import { PostService } from 'src/app/profile/domain/services/post.service';
import { User } from 'src/app/profile/domain/entities/user.interfaces';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Input() user!: User;
  @Output() deletePost = new EventEmitter<string>();

  constructor(private postService: PostService) { }

  /**
   * Emite el evento para eliminar una publicación.
   * @param postId - El ID de la publicación a eliminar.
   */
  onDeletePost(postId: string): void {
    this.deletePost.emit(postId);
  }

  /**
   * Carga las publicaciones de un usuario específico.
   * @param userId - El ID del usuario.
   */
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
