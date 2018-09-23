import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.items = [
      { label: 'Pessoas', routerLink: '/pessoas'},
      { label: 'Pedidos', routerLink: '/pedidos'},
      { label: 'Lançamentos', routerLink: '/lancamentos'},
      { label: 'Produtos', routerLink: '/produtos'},
      { label: 'Linha do Tempo'},
      { label: 'Logout', command: (event) => { this.authService.logout(); }}
    ];
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }
}
