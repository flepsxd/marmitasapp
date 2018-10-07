import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { ApiService } from '../api/api.service';
import { tap } from '../../../node_modules/rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token = '';

  get isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    private msgService: MessageService
  ) {}

  setLoggedIn(data, username) {
    this.loggedIn.next(true);
    this.token = data;
    this.router.navigate(['/pessoas']);
    this.msgService.add({
      severity: 'success',
      summary: 'Login!',
      detail: 'Usuário logado com sucesso'
    });
  }

  login(user: User): Observable<any> {
    return this.apiService.add('auth/login', user).pipe(
      tap(val => {
        localStorage.setItem('token', val.token);
        return val.token;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
