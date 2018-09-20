import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    //return localStorage.getItem('username');
    return this.loggedIn.asObservable(); 
  }

  constructor(
    private router: Router
  ) {}

  login(user: User){
    if (user.username !== '' && user.password !== '' ) { 
      this.loggedIn.next(true);
      localStorage.setItem('username', user.username);
      this.router.navigate(['/pessoas']);
    }
  }

  logout() {                  
    localStorage.removeItem('username');     
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}