import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iuser } from '../models/iuser';
import { HttpClient } from '@angular/common/http';
import { ILogUser } from '../models/ilog-user';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  user: BehaviorSubject<boolean>; //observer
  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<boolean>(this.isUserLoggedIn);
  }

  get isUserLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  login(user: ILogUser) {
    let backendToken: string = `userToken:${user.email}`;
    localStorage.setItem('token', backendToken);
    this.user.next(true);
    return this.http.get(`http://localhost:3000/users`);
  }
  logout() {
    localStorage.removeItem('token');
    this.user.next(false);
  }

  getUserState(): Observable<boolean> {
    return this.user.asObservable();
  }

  //? get the user
  getUsers(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users`);
  }

  signup(user: Iuser): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/users`,
      JSON.stringify(user)
    );
  }
}
