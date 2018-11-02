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
  cad: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cad = {
      component: LancamentoComponent,
      chave: 'idlancamento'
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
    ];
  }
}
