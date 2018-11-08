import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.items = [
      { label: 'Usuários', routerLink: '/usuarios'},
      { label: 'Pessoas', routerLink: '/pessoas'},
      { label: 'Produtos', routerLink: '/produtos'},
      { label: 'Pedidos', routerLink: '/pedidos'},
      { label: 'Agendamentos', routerLink: '/agendamentos'},
      { label: 'Lançamentos', routerLink: '/lancamentos'},
      { label: 'Linha do Tempo', routerLink: '/linhadotempo'},
      { label: 'Relatórios', routerLink: '/relatorios'},
      { label: 'Logout', command: (event) => { this.authService.logout(); }}
    ];
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }
}
