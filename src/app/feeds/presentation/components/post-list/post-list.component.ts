import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedPost } from '../../types/post.types';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input() posts: FeedPost[] = [];
  @Input() isLoading: boolean = false;
  @Input() emptyMessage: string = 'No hay publicaciones disponibles';
  @Input() showActions: boolean = true;
  @Input() currentUserId: string | null = null;
  
  @Output() toggleLike = new EventEmitter<FeedPost>();
  @Output() deletePost = new EventEmitter<string>();
  @Output() sharePost = new EventEmitter<FeedPost>();
  @Output() viewProfile = new EventEmitter<string>();

  /**
   * Maneja el toggle de like en un post
   */
  onToggleLike(post: FeedPost): void {
    this.toggleLike.emit(post);
  }

  /**
   * Maneja la eliminación de un post
   */
  onDeletePost(postId: string): void {
    this.deletePost.emit(postId);
  }

  /**
   * Maneja el compartir un post
   */
  onSharePost(post: FeedPost): void {
    this.sharePost.emit(post);
  }

  /**
   * Maneja la navegación al perfil del autor
   */
  onViewProfile(userId: string): void {
    this.viewProfile.emit(userId);
  }

  /**
   * Track function para optimizar el renderizado de la lista
   */
  trackByPostId(index: number, post: FeedPost): string {
    return post.id;
  }
}
