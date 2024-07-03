import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();


  constructor() { }

  changeUser(user: any) {
    this.userSource.next(user);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser(): Observable<any> {
    return this.user$.pipe();
  }

}
