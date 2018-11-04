import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { AgendamentoComponent } from './agendamento/agendamento.component';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {
  columns: Array<{}> = [];
  cad: any;
  filtros: Array<any>;

  constructor(private apiService: ApiService) {
      this.filtros = [
        {
          type: 'date',
          title: 'Data',
          key: 'datahora'
        }
      ];
  }

  ngOnInit() {
    this.cad = {
      component: AgendamentoComponent,
      resource: 'agendamentos',
      chave: 'idagendamento'
    };
    this.columns = [
      {
        header: 'Agendamento',
        field: 'idagendamento',
        class: 'id'
      },
      {
        header: 'Pessoa',
        field: 'pessoa_nome'
      },
      {
        header: 'Hora',
        field: 'hora'
      },
      {
        header: 'Previsão',
        field: 'previsao'
      },
      {
        header: 'Valor',
        field: 'valor',
        class: 'valor',
        fn: this.apiService.currencyFormat
      }
    ];
  }
}
