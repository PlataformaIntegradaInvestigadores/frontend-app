import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './post.interface';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = `${environment.apiUrl}/posts/`;

    constructor(private http: HttpClient) { }

    createPost(postData: FormData): Observable<Post> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });
        return this.http.post<Post>(`${this.apiUrl}create/`, postData, { headers });
    }

    getPosts(userId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}?user_id=${userId}`);
    }

    deletePost(postId: string): Observable<void> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });
        return this.http.delete<void>(`${this.apiUrl}${postId}/delete/`, { headers });
    }
}
