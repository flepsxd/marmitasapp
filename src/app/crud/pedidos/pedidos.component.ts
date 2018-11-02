import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { ApiService } from '../../api/api.service';
import { PedidoComponent } from './pedido/pedido.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  columns: Array<{}> = [];
  etapas: Array<any> = [];
  cad: any;
  filtros: Array<any>;

  constructor(private apiService: ApiService) {
    this.apiService.get('etapas').subscribe(resp => {
      this.etapas = resp.dados;
      this.filtros = [
        {
          type: 'date',
          title: 'Data',
          key: 'datahora'
        },
        {
          type: 'multiple',
          title: 'Status',
          key: 'pedidos_ordem.idetapa',
          dataKey: 'idetapa',
          keyLabel: 'descricao',
          array: true,
          opcoes: this.etapas
        }
      ];
    });
  }

  ngOnInit() {
    this.cad = {
      component: PedidoComponent,
      resource: 'pedidos',
      chave: 'idpedido'
    };
    this.columns = [
      {
        header: 'Pedido',
        field: 'idpedido',
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
        header: 'Valor',
        field: 'valor',
        class: 'valor',
        fn: this.apiService.currencyFormat
      },
      {
        header: 'Status',
        field: 'status_formatado',
        class: 'status'
      },
    ];
  }
}
