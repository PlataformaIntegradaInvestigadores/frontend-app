import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment, CreateCommentData, CommentsResponse } from '../entities/feed.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly baseUrl = `${environment.apiUrl}/v1/feeds`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los comentarios de un post
   */
  getPostComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/posts/${postId}/comments/`);
  }

  /**
   * Crea un nuevo comentario en un post
   */
  createComment(postId: string, commentData: CreateCommentData): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/posts/${postId}/comments/`, commentData);
  }

  /**
   * Obtiene las respuestas de un comentario
   */
  getCommentReplies(commentId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments/${commentId}/replies/`);
  }

  /**
   * Actualiza un comentario existente
   */
  updateComment(commentId: string, content: string): Observable<Comment> {
    return this.http.patch<Comment>(`${this.baseUrl}/comments/${commentId}/`, { content });
  }

  /**
   * Elimina un comentario
   */
  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/comments/${commentId}/`);
  }

  /**
   * Da like a un comentario
   */
  likeComment(commentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments/${commentId}/like/`, {});
  }

  /**
   * Quita like de un comentario
   */
  unlikeComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${commentId}/like/`);
  }
}
