/**
 * Representa un post en el feed
 */
export interface FeedPost {
  id: string;
  content: string;
  files?: PostFile[];
  tags: string[];
  is_public: boolean;
  author: FeedAuthor;
  created_at: Date;
  updated_at: Date;
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;
  engagement_score?: number;
}

/**
 * Representa un archivo adjunto a un post
 */
export interface PostFile {
  id: string;
  file: string;
  file_type: string;
  file_size: number;
  uploaded_at: Date;
}

/**
 * Representa el autor de un post
 */
export interface FeedAuthor {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  email: string;
}

/**
 * Representa un comentario en un post
 */
export interface Comment {
  id: string;
  content: string;
  author: FeedAuthor;
  post: string;
  parent?: string;
  created_at: Date;
  updated_at: Date;
  likes_count: number;
  replies_count: number;
  is_liked?: boolean;
}

/**
 * Representa un like
 */
export interface Like {
  id: string;
  user: FeedAuthor;
  content_type: string;
  object_id: string;
  created_at: Date;
}

/**
 * Representa la respuesta del feed
 */
export interface FeedResponse {
  posts: FeedPost[];
  has_next: boolean;
  next_cursor?: string;
  total_count: number;
}

/**
 * Representa los filtros para el feed
 */
export interface FeedFilters {
  feed_type?: 'personalized' | 'trending' | 'latest';
  tags?: string[];
  author?: string;
  time_range?: 'day' | 'week' | 'month' | 'all';
  cursor?: string;
  limit?: number;
}

/**
 * Representa los datos para crear un nuevo post
 */
export interface CreatePostData {
  content: string;
  files?: File[];
  tags?: string[];
  is_public?: boolean;
}

/**
 * Representa las estadísticas del usuario en el feed
 */
export interface UserFeedStats {
  posts_count: number;
  likes_received: number;
  comments_received: number;
  engagement_rate: number;
  followers_count: number;
  following_count: number;
}
