import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../entities/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts/`;

  constructor(private http: HttpClient) { }

  /**
   * Crea una nueva publicación.
   * @param postData - Los datos de la publicación a crear.
   * @returns Un Observable que emite la publicación creada.
   */
  createPost(postData: FormData): Observable<Post> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.post<Post>(`${this.apiUrl}create/`, postData, { headers }).pipe(
      map(post => this.convertPostDates(post))
    );
  }

  /**
   * Obtiene las publicaciones de un usuario específico.
   * @param userId - El ID del usuario cuyas publicaciones se desean obtener.
   * @returns Un Observable que emite una lista de publicaciones.
   */
  getPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?user_id=${userId}`).pipe(
      map(posts => posts.map(post => this.convertPostDates(post)))
    );
  }

  /**
   * Elimina una publicación específica.
   * @param postId - El ID de la publicación a eliminar.
   * @returns Un Observable que emite void al completar la eliminación.
   */
  deletePost(postId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.delete<void>(`${this.apiUrl}${postId}/delete/`, { headers });
  }

  /**
   * Convierte las fechas de una publicación de cadena a objeto Date.
   * @param post - La publicación a convertir.
   * @returns La publicación con fechas convertidas.
   */
  private convertPostDates(post: Post): Post {
    return {
      ...post,
      created_at: new Date(post.created_at)
    };
  }
}
