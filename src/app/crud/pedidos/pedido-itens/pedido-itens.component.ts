import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { PedidoItens } from '../../pedido-itens';

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
    desconto: null,
  };
  @Input() idpedido_item: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { 
    
  }

  ngOnInit() {
    this.getDados();
    this.pedidoItensForm = this.formBuilder.group({
      idproduto: [this.pedidoItens.idproduto, Validators.required],
      vlrunitario: [this.pedidoItens.vlrunitario, Validators.required],
      quantidade: [this.pedidoItens.quantidade],
      vlrtotal: [this.pedidoItens.vlrtotal],
      desconto: [this.pedidoItens.desconto]
    });
  }

  getDados(){
    if (this.idpedido_item) {
      let pedido_itens = [...this.apiService.pedido_itens];
      this.pedidoItens = pedido_itens.filter((val)=>val.idpedido_item == this.idpedido_item)[0];
    }
  }

  confirmar() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  cancelar() {
    return new Promise((resolve, reject) => {
      reject(true);
    })
  }
}
