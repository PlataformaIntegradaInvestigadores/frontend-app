import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  FeedPost,
  FeedResponse,
  FeedFilters,
  CreatePostData,
  Comment,
  UserFeedStats
} from '../entities/feed.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = `${environment.apiUrl}/v1`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el token de autorización
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    console.log('FeedService: Token found:', token ? 'Yes' : 'No');
    if (token) {
      console.log('FeedService: Token length:', token.length);
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Obtiene el feed principal con filtros opcionales
   */
  getFeed(filters?: FeedFilters): Observable<FeedResponse> {
    const headers = this.getHeaders();
    let params = new HttpParams();

    if (filters) {
      if (filters.feed_type) params = params.set('type', filters.feed_type);
      if (filters.tags) params = params.set('tags', filters.tags.join(','));
      if (filters.author) params = params.set('author', filters.author);
      if (filters.time_range) params = params.set('time_range', filters.time_range);
      if (filters.cursor) params = params.set('cursor', filters.cursor);
      if (filters.limit) params = params.set('limit', filters.limit.toString());
    }

    const url = `${this.apiUrl}/feed/`;
    console.log('FeedService: Making request to:', url);
    console.log('FeedService: Headers:', headers);
    console.log('FeedService: Params:', params.toString());

    return this.http.get<FeedResponse>(url, { headers, params })
      .pipe(
        map(response => {
          console.log('FeedService: Raw response:', response);
          const convertedResponse = this.convertFeedResponseDates(response);
          console.log('FeedService: Converted response:', convertedResponse);
          return convertedResponse;
        })
      );
  }

  /**
   * Obtiene posts con filtros específicos usando POST
   */
  getFilteredFeed(filters: FeedFilters): Observable<FeedResponse> {
    const headers = this.getHeaders();
    return this.http.post<FeedResponse>(`${this.apiUrl}/feed/`, filters, { headers })
      .pipe(map(response => this.convertFeedResponseDates(response)));
  }

  /**
   * Obtiene posts en tendencia
   */
  getTrendingPosts(timeRange: string = 'week', limit: number = 20): Observable<FeedResponse> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('time_range', timeRange)
      .set('limit', limit.toString());

    return this.http.get<FeedResponse>(`${this.apiUrl}/feed/trending/`, { headers, params })
      .pipe(map(response => this.convertFeedResponseDates(response)));
  }

  /**
   * Obtiene recomendaciones de posts
   */
  getRecommendations(limit: number = 20): Observable<FeedResponse> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('limit', limit.toString());

    return this.http.get<FeedResponse>(`${this.apiUrl}/feed/recommendations/`, { headers, params })
      .pipe(map(response => this.convertFeedResponseDates(response)));
  }

  /**
   * Crea un nuevo post
   */
  createPost(postData: CreatePostData): Observable<FeedPost> {
    const headers = this.getHeaders();
    const formData = new FormData();

    formData.append('content', postData.content);

    if (postData.tags) {
      formData.append('tags', JSON.stringify(postData.tags));
    }

    // Asegurar que todos los posts sean públicos por defecto
    const isPublic = postData.is_public !== undefined ? postData.is_public : true;
    formData.append('is_public', isPublic.toString());

    if (postData.files) {
      postData.files.forEach((file, index) => {
        formData.append(`files`, file);
      });
    }

    return this.http.post<FeedPost>(`${this.apiUrl}/posts/`, formData, { headers })
      .pipe(map(post => this.convertPostDates(post)));
  }

  /**
   * Obtiene un post específico por ID
   */
  getPost(postId: string): Observable<FeedPost> {
    const headers = this.getHeaders();
    return this.http.get<FeedPost>(`${this.apiUrl}/posts/${postId}/`, { headers })
      .pipe(map(post => this.convertPostDates(post)));
  }

  /**
   * Actualiza un post
   */
  updatePost(postId: string, updateData: Partial<CreatePostData>): Observable<FeedPost> {
    const headers = this.getHeaders();
    return this.http.patch<FeedPost>(`${this.apiUrl}/posts/${postId}/`, updateData, { headers })
      .pipe(map(post => this.convertPostDates(post)));
  }

  /**
   * Elimina un post
   */
  deletePost(postId: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}/`, { headers });
  }

  /**
   * Busca posts usando búsqueda vectorial semántica
   */
  searchPosts(query: string, tags?: string[], author?: string, useVectorSearch: boolean = true): Observable<FeedPost[]> {
    const headers = this.getHeaders();
    let params = new HttpParams().set('q', query);

    if (tags && tags.length > 0) params = params.set('tags', tags.join(','));
    if (author) params = params.set('author', author);
    
    // Parámetro para habilitar/deshabilitar búsqueda vectorial
    params = params.set('vector', useVectorSearch.toString());
    params = params.set('limit', '20');

    return this.http.get<FeedPost[]>(`${this.apiUrl}/posts/search/`, { headers, params })
      .pipe(
        map(posts => posts.map(post => this.convertPostDates(post))),
        catchError((error) => {
          console.error('Error en búsqueda de posts:', error);
          // Si falla la búsqueda vectorial, intentar búsqueda básica
          if (useVectorSearch && error.status !== 404) {
            console.log('Fallback a búsqueda básica de texto');
            return this.searchPosts(query, tags, author, false);
          }
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene estadísticas del post
   */
  getPostStats(postId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/posts/${postId}/stats/`, { headers });
  }

  /**
   * Da like/unlike a un post
   */
  toggleLikePost(postId: string): Observable<{ liked: boolean, likes_count: number }> {
    const headers = this.getHeaders();
    return this.http.post<{ liked: boolean, likes_count: number }>(`${this.apiUrl}/posts/${postId}/like/`, {}, { headers });
  }

  /**
   * Obtiene comentarios de un post
   */
  getComments(postId: string, page: number = 1, limit: number = 20): Observable<Comment[]> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Comment[]>(`${this.apiUrl}/comments/`, {
      headers,
      params: params.set('post', postId)
    }).pipe(map(comments => comments.map(comment => this.convertCommentDates(comment))));
  }

  /**
   * Crea un comentario
   */
  createComment(postId: string, content: string, parentId?: string): Observable<Comment> {
    const headers = this.getHeaders();
    const data: any = { post: postId, content };
    if (parentId) data.parent = parentId;

    return this.http.post<Comment>(`${this.apiUrl}/comments/`, data, { headers })
      .pipe(map(comment => this.convertCommentDates(comment)));
  }

  /**
   * Da like/unlike a un comentario
   */
  toggleLikeComment(commentId: string): Observable<{ liked: boolean, likes_count: number }> {
    const headers = this.getHeaders();
    return this.http.post<{ liked: boolean, likes_count: number }>(`${this.apiUrl}/likes/comments/${commentId}/`, {}, { headers });
  }

  /**
   * Obtiene estadísticas del usuario en el feed
   */
  getUserFeedStats(): Observable<UserFeedStats> {
    const headers = this.getHeaders();
    return this.http.get<UserFeedStats>(`${this.apiUrl}/feed/stats/`, { headers });
  }

  /**
   * Obtiene posts de un usuario específico
   */
  getUserPosts(userId: string, limit: number = 20, cursor?: string): Observable<FeedResponse> {
    const headers = this.getHeaders();
    let params = new HttpParams()
      .set('author', userId)
      .set('limit', limit.toString());

    if (cursor) {
      params = params.set('cursor', cursor);
    }

    return this.http.get<FeedResponse>(`${this.apiUrl}/feed/`, { headers, params })
      .pipe(map(response => this.convertFeedResponseDates(response)));
  }

  /**
   * Obtiene posts del usuario actual autenticado
   */
  getCurrentUserPosts(limit: number = 20, cursor?: string): Observable<FeedResponse> {
    const headers = this.getHeaders();
    let params = new HttpParams().set('limit', limit.toString());

    if (cursor) {
      params = params.set('cursor', cursor);
    }

    return this.http.get<FeedResponse>(`${this.apiUrl}/user/posts/`, { headers, params })
      .pipe(map(response => this.convertFeedResponseDates(response)));
  }

  /**
   * Registra una interacción del usuario
   */
  recordUserInteraction(postId: string, interactionType: 'view' | 'like' | 'comment' | 'share'): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.apiUrl}/interactions/`, {
      post_id: postId,
      interaction_type: interactionType
    }, { headers });
  }

  /**
   * Convierte las fechas de string a Date en la respuesta del feed
   */
  private convertFeedResponseDates(response: FeedResponse): FeedResponse {
    return {
      ...response,
      posts: response.posts.map(post => this.convertPostDates(post))
    };
  }

  /**
   * Convierte las fechas de string a Date en un post
   */
  private convertPostDates(post: FeedPost): FeedPost {
    return {
      ...post,
      created_at: new Date(post.created_at),
      updated_at: new Date(post.updated_at),
      files: post.files?.map(file => ({
        ...file,
        uploaded_at: new Date(file.uploaded_at)
      })) || []
    };
  }

  /**
   * Convierte las fechas de string a Date en un comentario
   */
  private convertCommentDates(comment: Comment): Comment {
    return {
      ...comment,
      created_at: new Date(comment.created_at),
      updated_at: new Date(comment.updated_at)
    };
  }
}
