// Interfaces y tipos compartidos para el módulo de feeds

export interface PostCreatorData {
  content: string;
  tags?: string[];
  attachments?: any[];
  files?: File[];
}

export interface PostInteractionData {
  postId: string;
  action: 'like' | 'unlike' | 'share' | 'delete';
  data?: any;
}

export interface PostListConfig {
  showActions?: boolean;
  showComments?: boolean;
  allowDelete?: boolean;
  allowEdit?: boolean;
  emptyMessage?: string;
}

// Re-export desde domain para facilitar el uso
export { FeedPost, Comment, CreateCommentData, CommentsResponse } from '../../domain/entities/feed.interface';
