import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token = '';
  private url = 'http://marmitasapi/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  setLoggedIn(data, username) {
      this.loggedIn.next(true);
      localStorage.setItem('username', username);
      this.token = data.token;
      this.router.navigate(['/pessoas']);
  }

  login(user: User): Observable<any> {
      return this.http.post(this.url + 'login', user, this.httpOptions);
  }

  logout() {
    localStorage.removeItem('username');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
