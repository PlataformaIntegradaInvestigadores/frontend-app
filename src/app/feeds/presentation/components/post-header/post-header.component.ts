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
  
  /**
   * Genera tooltip informativo para el score de engagement
   */
  getEngagementTooltip(): string {
    const score = this.post.engagement_score || 0;
    const likes = this.post.likes_count || 0;
    const comments = this.post.comments_count || 0;
    
    let rating = 'bajo';
    if (score > 10) rating = 'alto';
    else if (score > 5) rating = 'medio';
    
    let tooltip = `Engagement ${rating}: ${score.toFixed(1)}`;
    tooltip += `\nLikes: ${likes}, Comentarios: ${comments}`;
    
    // Si hay metadata de trending, mostrarla
    if (this.post.trending_metadata) {
      const { hours_old, trending_rank } = this.post.trending_metadata;
      tooltip += `\nPublicado hace: ${hours_old.toFixed(1)} horas`;
      tooltip += `\nRanking de tendencia: ${trending_rank.toFixed(1)}`;
    }
    
    return tooltip;
  }
}
