// group.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/domain/entities/auth.service';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    private apiUrl = `${environment.apiUrl}/groups/`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    createGroup(groupData: { title: string, description: string, users?: any[] }): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });

        return this.http.post(this.apiUrl, groupData, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Client-side error: ${error.error.message}`;
        } else if (error.error) {
            // Server-side error
            errorMessage = `Server-side error: ${error.error.detail || error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
