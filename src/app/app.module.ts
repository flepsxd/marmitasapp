import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { FlexLayoutModule } from '@angular/flex-layout';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule, Button } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DialogModule, Dialog } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DragDropModule } from 'primeng/dragdrop';
import { GrowlModule } from 'primeng/growl';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {StepsModule} from 'primeng/steps';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputMaskModule} from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
import {BlockUIModule} from 'primeng/blockui';
import {TabViewModule} from 'primeng/tabview';

import {TreeTableModule} from 'primeng/treetable';

import { DragulaModule } from 'ng2-dragula';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import {
  CurrencyMaskConfig,
  CURRENCY_MASK_CONFIG
} from 'ng2-currency-mask/src/currency-mask.config';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

import { CurrencyPipe } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './api/intercept.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
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
import { LinhadotempoComponent } from './crud/linhadotempo/linhadotempo.component';
import { CardpedidoComponent } from './crud/linhadotempo/cardpedido/cardpedido.component';
import { EnderecoComponent } from './crud/endereco/endereco.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { UsuariosComponent } from './crud/usuarios/usuarios.component';
import { UsuarioComponent } from './crud/usuarios/usuario/usuario.component';
import { BlockDivComponent } from './block-div/block-div.component';
import { AgendamentosComponent } from './crud/agendamentos/agendamentos.component';
import { AgendamentoComponent } from './crud/agendamentos/agendamento/agendamento.component';
import { AgendamentoItensComponent } from './crud/agendamentos/agendamento-itens/agendamento-itens.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioTreeComponent } from './relatorio-tree/relatorio-tree.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { EtapaComponent } from './configuracoes/etapa/etapa.component';
import { FormapagtoComponent } from './configuracoes/formapagto/formapagto.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];
const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'pessoas',
        component: PessoasComponent
      },
      {
        path: 'pedidos',
        component: PedidosComponent
      },
      {
        path: 'agendamentos',
        component: AgendamentosComponent
      },
      {
        path: 'lancamentos',
        component: LancamentosComponent
      },
      {
        path: 'produtos',
        component: ProdutosComponent
      },
      {
        path: 'linhadotempo',
        component: LinhadotempoComponent
      },
      {
        path: 'relatorios',
        component: RelatorioComponent
      },
      {
        path: 'configuracoes',
        component: ConfiguracoesComponent
      }
    ]
  }
];

const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
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
    PedidoItensComponent,
    LinhadotempoComponent,
    CardpedidoComponent,
    EnderecoComponent,
    FiltrosComponent,
    UsuariosComponent,
    UsuarioComponent,
    BlockDivComponent,
    AgendamentosComponent,
    AgendamentoComponent,
    AgendamentoItensComponent,
    RelatorioComponent,
    RelatorioTreeComponent,
    ConfiguracoesComponent,
    EtapaComponent,
    FormapagtoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    DragDropModule,
    GrowlModule,
    DropdownModule,
    ToggleButtonModule,
    MultiSelectModule,
    TriStateCheckboxModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    StepsModule,
    ProgressSpinnerModule,
    InputMaskModule,
    PasswordModule,
    FlexLayoutModule,
    BlockUIModule,
    TabViewModule,
    TreeTableModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    RouterModule.forChild(childRoutes),
    DragulaModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    ApiService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
    CurrencyPipe,
    MessageService,
    ConfirmationService
  ],
  exports: [RouterModule],
  entryComponents: [
    PessoaComponent,
    LancamentoComponent,
    PedidoComponent,
    PedidoItensComponent,
    ProdutoComponent,
    UsuarioComponent,
    AgendamentoComponent,
    AgendamentoItensComponent,
    EtapaComponent,
    FormapagtoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
