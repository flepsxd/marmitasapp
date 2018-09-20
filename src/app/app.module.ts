import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule, Button } from 'primeng/button';
import {TabMenuModule} from 'primeng/tabmenu';
import {CardModule} from 'primeng/card';
import {MessageModule} from 'primeng/message';
import {TableModule} from 'primeng/table';
import { DialogModule, Dialog } from 'primeng/dialog';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes, Router } from '../../node_modules/@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PessoasComponent } from './crud/pessoas/pessoas.component';
import { PedidosComponent } from './crud/pedidos/pedidos.component';
import { LancamentosComponent } from './crud/lancamentos/lancamentos.component';
import { PessoaComponent } from './crud/pessoas/pessoa/pessoa.component';
import { LancamentoComponent } from './crud/lancamentos/lancamento/lancamento.component';
import { PedidoComponent } from './crud/pedidos/pedido/pedido.component';
import { CrudComponent } from './crud/crud.component';
import { ApiService } from './api/api.service';

const appRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent, 
    canActivate: [AuthGuard],
  }
];
const childRoutes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'pessoas', 
        component: PessoasComponent,
        children: [
          {
            path: 'editar/:idpessoa',
            component: PessoaComponent
          },
          {
            path: 'novo',
            component: PessoaComponent
          }
        ]
      },
      { 
        path: 'pedidos', 
        component: PedidosComponent,
        children: [
          {
            path: 'editar/:idpedido',
            component: PedidoComponent
          },
          {
            path: 'novo',
            component: PedidoComponent
          }
        ]
      },
      { 
        path: 'lancamentos', 
        component: LancamentosComponent,
        children: [
          {
            path: 'editar/:idlancamento',
            component: LancamentoComponent
          },
          {
            path: 'novo',
            component: LancamentoComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    PessoasComponent,
    PedidosComponent,
    LancamentosComponent,
    PessoaComponent,
    LancamentoComponent,
    PedidoComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TabMenuModule,
    MessageModule,
    TableModule,
    CardModule,
    DialogModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    ),
    RouterModule.forChild(
      childRoutes
    )
  ],
  providers: [AuthService, AuthGuard, ApiService],
  exports: [RouterModule],
  entryComponents: [PessoaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
