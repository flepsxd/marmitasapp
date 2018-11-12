import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../lancamento';
import { ApiService } from '../../api/api.service';
import { LancamentoComponent } from './lancamento/lancamento.component';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {
  dados: Lancamento[];
  columns: Array<{}> = [];
  formapagtos: Array<any> = [];
  cad: any;
  filtros: Array<any> = [];


  constructor(
    private apiService: ApiService
  ) {
    this.apiService.get('formapagtos').subscribe(resp => {
      this.formapagtos = resp.dados;
      this.filtros[0].opcoes = this.formapagtos;
    });
    this.filtros = [
      {
        type: 'multiple',
        title: 'Forma de Pagamento',
        key: 'idformapagto',
        dataKey: 'idformapagto',
        keyLabel: 'descricao',
        array: true
      }];
  }

  ngOnInit() {
    this.cad = {
      component: LancamentoComponent,
      chave: 'idlancamento',
      resource: 'lancamentos',
      header: 'Cadastro de Lançamento'
    };
    this.dados = this.apiService.lancamentos;
    this.columns = [
      {
        header: 'Lançamento',
        field: 'idlancamento',
        class: 'id'
      },
      {
        header: 'Pessoa',
        field: 'pessoa_nome'
      },
      {
        header: 'Data/Hora',
        field: 'datahora',
        fn: function(dado) {
          return new Date(dado).toLocaleString();
        }
      },
      {
        header: 'Data/Hora Pago',
        field: 'datapagto',
        fn: function(dado) {
          return new Date(dado).toLocaleString();
        }
      },
      {
        header: 'Valor Base',
        field: 'valor',
        class: 'valor',
        fn: this.apiService.currencyFormat
      },
      {
        header: 'Valor Pago',
        field: 'valorpago',
        class: 'valor',
        fn: this.apiService.currencyFormat
      },
      {
        header: 'Forma de Pagamento',
        field: 'formapagtodesc',
        class: 'status'
      },
    ];
  }
}
