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
  formapagtos: Array<any> = [];
  filtros: Array<any>;

  constructor(private apiService: ApiService) {

    this.apiService.get('formapagtos').subscribe(resp => {
      this.formapagtos = resp.dados;
      this.filtros[1].opcoes = this.formapagtos;
    });
      this.filtros = [
        {
          type: 'date',
          title: 'Data',
          key: 'datahora'
        },
        {
          type: 'multiple',
          title: 'Forma de Pagamento',
          key: 'idformapagto',
          dataKey: 'idformapagto',
          keyLabel: 'descricao',
          array: true
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
        header: 'Próximo Dia',
        field: 'proximodia',
        fn: function(val) {
          return val === 1 ? 'Sim' : 'Não';
        }
      },
      {
        header: 'Valor',
        field: 'valor',
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
