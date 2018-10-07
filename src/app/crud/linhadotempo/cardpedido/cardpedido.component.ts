import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { Pedido } from '../../pedido';
import { ApiService } from '../../../api/api.service';
import { Pessoa } from '../../pessoa';
import { PedidoItens } from '../../pedido-itens';
import { Produto } from '../../produto';

@Component({
  selector: 'app-cardpedido',
  templateUrl: './cardpedido.component.html',
  styleUrls: ['./cardpedido.component.css']
})
export class CardpedidoComponent implements OnInit {
  @ViewChild('pedidoFn')
  pedidoFn: any;
  @Input()
  pedido: any;
  @Output()
  atualizar: EventEmitter<any> = new EventEmitter();
  pessoa: Pessoa;
  pedidoItens: Array<PedidoItens>;
  produtos: Array<Produto>;
  columnsPedidoItens: Array<any> = [
    {
      header: 'Produto',
      field: this.produto
    },
    {
      header: 'Valor',
      field: this.valor.bind(this)
    }
  ];
  dialog = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.pessoa = this.pedido.pessoas;
    this.pedidoItens = this.pedido.pedidos_itens;
  }

  produto(val) {
    return val.produto.descricao;
  }

  valor(val) {
    return this.apiService.currencyFormat(val.vlrtotal);
  }

  excluir() {}
  editar() {
    this.dialog = true;
  }

  salvar() {
    this.apiService
      .confirmDialog(this.pedidoFn, { resource: 'pedidos', chave: 'idpedido' })
      .subscribe(obj => {
        this.atualizar.emit();
        this.dialog = false;
      });
  }

  cancelar() {
    this.dialog = false;
  }
}
