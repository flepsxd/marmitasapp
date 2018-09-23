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
    this.columns = [
      {
        descricao: 'Nome',
        campo: 'nome'
      },
      {
        descricao: 'Telefone',
        campo: 'telefone'
      },
      {
        descricao: 'E-mail',
        campo: 'email'
      },
      {
        descricao: 'Status',
        campo: 'status'
      },
    ];
  }

}
