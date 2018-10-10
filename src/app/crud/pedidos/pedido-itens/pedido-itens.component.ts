import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { PedidoItens } from '../../pedido-itens';
import { Produto } from '../../produto';
import { Observable } from '../../../../../node_modules/rxjs';

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
  produtos: Array<Produto>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.get('produtos').subscribe(resp => {
      this.produtos = resp.dados;
    });
    this.getDados();

    this.pedidoItensForm = this.formBuilder.group({
      idpedido_item: [this.pedidoItens.idpedido_item],
      idproduto: [this.pedidoItens.idproduto, Validators.required],
      produto: [this.pedidoItens.produto],
      vlrunitario: [this.pedidoItens.vlrunitario, Validators.required],
      quantidade: [this.pedidoItens.quantidade],
      vlrtotal: [this.pedidoItens.vlrtotal],
      desconto: [this.pedidoItens.desconto]
    });
  }

  getDados() {
    if (this.idpedido_item) {
      this.apiService
        .getId('pedidositens', this.idpedido_item)
        .subscribe(resp => {
          this.pedidoItens = resp.dados;
          this.pedidoItensForm.patchValue(this.pedidoItens);
        });
    }
  }

  confirmarProprio() {
    return new Observable(observer => {
      observer.next(this.pedidoItensForm.value);
      observer.complete();
    });
  }

  getProdutos($event = { query: null }) {
    this.dadosProdutos = this.apiService.filter(this.produtos, $event.query);
  }
}
