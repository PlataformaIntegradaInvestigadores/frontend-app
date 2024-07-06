// src/app/services/topic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RecommendedTopic, TopicAddedUser } from '../entities/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = `${environment.apiUrl}/v1/groups/`;
  private topicsSubject = new BehaviorSubject<TopicAddedUser[]>([]);
  topics$ = this.topicsSubject.asObservable();
  
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

  /* Para obtener los tópicos recomendados para un grupo específico */
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

  addNewTopic(groupId: string, topicName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      topic: topicName,  // Asegúrate de que el nombre del campo es correcto
      user_id: localStorage.getItem('userId')  // Incluye el user_id en el cuerpo de la solicitud
    };
    
    // Imprimir la estructura de datos que se enviará
    console.log('Datos que se enviarán:', JSON.stringify(body, null, 2));
    
    return this.http.post<any>(`${this.apiUrl}${groupId}/add-topic/`, body, { headers }).pipe(
      tap(response => {
        const currentTopics = this.topicsSubject.getValue();
        this.topicsSubject.next([...currentTopics, response]);
      }),
      catchError(error => {
        /* if (error.status === 403) {
          // Mostrar mensaje de error específico
          alert("Solo puedes ingresar un topico de investación");
        } */
        return throwError(() => error);
      })
    );
}
  

  updateTopics(newTopic: TopicAddedUser): void {
    const currentTopics = this.topicsSubject.getValue();
    this.topicsSubject.next([...currentTopics, newTopic]);
  }

  notifyTopicVisited(groupId: string, topicId: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      topic_id: topicId,
      user_id: userId
    };
    console.log('Datos que se enviarán:', JSON.stringify(body, null, 2));
    console.log('URL:', `${this.apiUrl}${groupId}/topic-visited/`);
    return this.http.post<any>(`${this.apiUrl}${groupId}/topic-visited/`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  notifyCombinedSearch(groupId: string, topicIds: string[], userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      topics: topicIds,
      user_id: userId
    };
    console.log('Datos que se enviarán:', JSON.stringify(body, null, 2));
    console.log('URL:', `${this.apiUrl}${groupId}/combined-search/`);
    return this.http.post<any>(`${this.apiUrl}${groupId}/combined-search/`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  notifyExpertice(groupId: string, topicId: number, userId: string,  expertiseLevel: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      group_id: groupId,
      topic_id: topicId,
      user_id: userId,
      expertise_level: expertiseLevel
    };
    console.log('Datos que se enviarán: EXPERTICE', JSON.stringify(body, null, 2));
    console.log('URL:', `${this.apiUrl}${groupId}/user-expertise/`);
    return this.http.post<any>(`${this.apiUrl}${groupId}/user-expertise/`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  notifyPhaseOneCompleted(groupId: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      user_id: userId
    };
    console.log('Datos que se enviarán:', JSON.stringify(body, null, 2));
    return this.http.post<any>(`${this.apiUrl}${groupId}/phase-one-completed/`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /* updateUserExpertise(groupId: string, userId: string, topicId: number, expertiseLevel: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      user_id: userId,
      topic_id: topicId,
      expertise: expertiseLevel
    };

    console.log('Datos que se enviarán:', JSON.stringify(body, null, 2));
    console.log('URL:', `${this.apiUrl}${groupId}/user-expertise/`);
    return this.http.post<any>(`${this.apiUrl}${groupId}/user-expertise/`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  } */


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