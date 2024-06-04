import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUserById(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
    }
}
