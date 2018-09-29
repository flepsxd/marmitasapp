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
  dados: Pedido[];
  columns: Array<{}> = [];
  cad: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cad = {
      component: PedidoComponent,
      chave: 'idpedido'
    };
    this.dados = this.apiService.pedidos;
    let pessoasId = this.apiService.getById.bind(this.apiService, 'pessoas', 'idpessoa');
    this.columns = [
      {
        header: 'Pedido',
        field: 'idpedido',
        class: 'id'
      },
      {
        header: 'Pessoa',
        field: 'idpessoa',
        fn: function(val){
          return pessoasId(val).nome;
        }
      },
      {
        header: 'Data/Hora',
        field: 'datahora',
        fn: function(dado){
          return new Date(dado).toLocaleString();
        }
      },
      {
        header: 'Status',
        field: 'status',
        class: 'status'
      },
    ];
  }

}
