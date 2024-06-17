// information.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class InformationService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('accessToken');
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
    }

    getInformation(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/profile-information/${userId}/`, this.getHeaders());
    }

    updateInformation(info: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/profile-information/`, info, this.getHeaders());
    }

    deleteInformation(): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/profile-information/`, this.getHeaders());
    }

    getPublicInformation(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/profile-information/${userId}/`);
    }
}
