// src/app/services/topic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RecommendedTopic, TopicAddedUser } from '../entities/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = `${environment.apiUrl}/v1/groups/`;


  constructor(private http: HttpClient) { 
    
    console.log('TopicService.apiUrl', this.apiUrl);
  }

  getRandomRecommendedTopics(groupId: string): Observable<RecommendedTopic[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get<RecommendedTopic[]>(`${this.apiUrl}${groupId}/topics/random/`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getRecommendedTopicsByGroup(groupId: string): Observable<RecommendedTopic[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get<RecommendedTopic[]>(`${this.apiUrl}${groupId}/recommended-topics/`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTopicsAddedByGroup(groupId: string): Observable<TopicAddedUser[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get<TopicAddedUser[]>(`${this.apiUrl}${groupId}/added-topics/`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getGroupTopics(groupId: string): Observable<{ recommended_topics: RecommendedTopic[], added_topics: TopicAddedUser[] }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get<{ recommended_topics: RecommendedTopic[], added_topics: TopicAddedUser[] }>(`${this.apiUrl}${groupId}/topics/`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.error) {
      errorMessage = `Server-side error: ${error.error.detail || error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
