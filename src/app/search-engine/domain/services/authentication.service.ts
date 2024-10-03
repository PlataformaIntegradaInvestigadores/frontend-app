import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  rootURL:string = environment.apiCentinela;
  constructor(private httpClient: HttpClient) {
   }

  login(username: string, password: string) :Observable<any> {
    return this.httpClient.post(`${this.rootURL}/v1/auth/login/`, { username, password })
    .pipe(
      map((response) => {
        return response
      })
    )
  }

  isAuthenticated() {
    console.log(localStorage.getItem('authState'));
    return !!localStorage.getItem('authState');
  }
}
