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
import {InputSwitchModule} from 'primeng/inputswitch';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { CurrencyPipe } from '@angular/common';
 

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
import { ProdutosComponent } from './crud/produtos/produtos.component';
import { ProdutoComponent } from './crud/produtos/produto/produto.component';
import { PedidoItensComponent } from './crud/pedidos/pedido-itens/pedido-itens.component';

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
        component: PessoasComponent
      },
      { 
        path: 'pedidos', 
        component: PedidosComponent
      },
      { 
        path: 'lancamentos', 
        component: LancamentosComponent
      },
      {
        path: 'produtos',
        component: ProdutosComponent
      }
    ]
  }
]

const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
registerLocaleData(localePt, 'pt', localePtExtra);

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
    CrudComponent,
    ProdutosComponent,
    ProdutoComponent,
    PedidoItensComponent
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
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    InputTextareaModule,
    AutoCompleteModule,
    CurrencyMaskModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    ),
    RouterModule.forChild(
      childRoutes
    )
  ],
  providers: [AuthService, AuthGuard, ApiService, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig} ,{provide: LOCALE_ID, useValue: 'pt'}, CurrencyPipe],
  exports: [RouterModule],
  entryComponents: [PessoaComponent, LancamentoComponent, PedidoComponent, PedidoItensComponent, ProdutoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
