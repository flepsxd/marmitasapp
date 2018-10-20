import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
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
  setPedido: EventEmitter<any> = new EventEmitter();
  @Output()
  excluirPedido: EventEmitter<any> = new EventEmitter();
  @Input()
  idetapa: any;
  @Input()
  ordem: any;
  pessoa: Pessoa;
  pedidoItens: Array<PedidoItens>;
  produtos: Array<Produto>;
  mensagemExpira: any;
  columnsPedidoItens: Array<any> = [
    {
      header: 'Produto',
      field: this.produto
    },
    {
      header: 'Valor',
      class: 'valor',
      field: this.valor.bind(this)
    }
  ];
  dialog = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.pessoa = this.pedido.pessoas;
    this.pedidoItens = this.pedido.pedidos_itens;
    if (this.idetapa !== this.pedido.etapa) {
      this.pedido.etapa = this.idetapa;
      this.pedido.ordem = this.ordem;
      this.apiService
        .change('pedidos', this.pedido.idpedido, this.pedido)
        .subscribe();
    }
  }

  produto(val) {
    return val.produto.descricao;
  }

  valor(val) {
    return this.apiService.currencyFormat(val.vlrtotal);
  }

  excluir() {
    this.excluirPedido.emit(this.pedido.idpedido);
  }
  editar() {
    this.setPedido.emit(this.pedido);
  }

  compareDate(tempo = 0) {
    const previsao = this.apiService.parseDate(this.pedido.previsao);
    const agora = new Date();
    const diffMs = previsao.getTime() - agora.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const val = diffMins <= tempo ? (diffMins <= 0 ? 0 : tempo) : null;
    this.mensagemExpira = val !== null ? val : this.mensagemExpira;
    return this.mensagemExpira !== undefined ? true : false;
  }
}
