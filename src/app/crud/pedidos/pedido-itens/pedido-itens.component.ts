import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { PedidoItens } from '../../pedido-itens';
import { Produto } from '../../produto';

@Component({
  selector: 'app-pedido-itens',
  templateUrl: './pedido-itens.component.html',
  styleUrls: ['./pedido-itens.component.css']
})
export class PedidoItensComponent implements OnInit {
  pedidoItensForm: FormGroup;
  pedidoItens: PedidoItens = {
    idpedido_item: null,
    idpedido: null,
    idproduto: null,
    vlrunitario: null,
    quantidade: 1,
    vlrtotal: null,
    desconto: null
  };
  @Input()
  idpedido_item: number;

  dadosProdutos: Array<Produto>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getProdutos();
    this.getDados();
    this.pedidoItensForm = this.formBuilder.group({
      idproduto: [this.pedidoItens.idproduto, Validators.required],
      produto: [
        this.apiService.getById(
          'produtos',
          'idproduto',
          this.pedidoItens.idproduto
        ) || null
      ],
      vlrunitario: [this.pedidoItens.vlrunitario, Validators.required],
      quantidade: [this.pedidoItens.quantidade],
      vlrtotal: [this.pedidoItens.vlrtotal],
      desconto: [this.pedidoItens.desconto]
    });
  }

  getDados() {
    if (this.idpedido_item) {
      this.pedidoItens = this.apiService.getById(
        'pedido_itens',
        'idpedido_item',
        this.idpedido_item
      );
    }
  }

  confirmar() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 100);
    });
  }

  cancelar() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 100);
    });
  }

  getProdutos($event = { query: null }) {
    this.dadosProdutos = this.apiService.filterAtivo('produtos', $event.query);
  }
}
