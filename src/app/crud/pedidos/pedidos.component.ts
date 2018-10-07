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
  cad: any;

  constructor(private apiService: ApiService) {}

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
        field: 'pessoas',
        fn: function(val) {
          return val.nome;
        }
      },
      {
        header: 'Data/Hora',
        field: 'datahora',
        fn: function(dado) {
          return new Date(dado).toLocaleString();
        }
      },
      {
        header: 'Status',
        field: 'status',
        class: 'status'
      }
    ];
  }
}
