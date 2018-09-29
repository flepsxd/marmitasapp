import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from '../../pedido';
import { ApiService } from '../../../api/api.service';
import { Pessoa } from '../../pessoa';
import { PedidoItens } from '../../pedido-itens';

@Component({
  selector: 'app-cardpedido',
  templateUrl: './cardpedido.component.html',
  styleUrls: ['./cardpedido.component.css']
})
export class CardpedidoComponent implements OnInit {
  @Input() pedido: Pedido;
  pessoa: Pessoa;
  pedidoItens: Array<PedidoItens>;
  columnsPedidoItens: Array<any> = [
    {
      header: 'Produto',
      field: this.produto
    },
    {
      header: 'Valor',
      field: this.apiService.currencyFormat
    }
  ];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.pessoa = this.apiService.getById('pessoas', 'idpessoa', this.pedido.idpessoa);
    this.pedidoItens = this.apiService.getById('pedido_itens', 'idpedido', this.pedido.idpedido, false);
  }

  produto(val) {
    return this.apiService.getById('produtos', 'idproduto', val.idproduto).descricao;
  }

  valor(val){
    return this.apiService.currencyFormat(val.vlrtotal);
  }

}
