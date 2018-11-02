import { Lancamento } from './../../lancamento';
import { MenuItem } from 'primeng/api';
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
  @Input() agendamento: any;
  @Output()
  setPedido: EventEmitter<any> = new EventEmitter();
  @Output()
  excluirPedido: EventEmitter<any> = new EventEmitter();
  @Output()
  lancamento: EventEmitter<any> = new EventEmitter();
  @Input()
  etapa: any;
  @Input()
  ordem: any;
  dados: any;
  pessoa: Pessoa;
  itens: Array<any>;
  produtos: Array<Produto>;
  mensagemExpira: any;
  columnsItens: Array<any> = [
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
  periodos: MenuItem[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    if (this.pedido) {
      this.dados = this.pedido;
      this.itens = this.dados.pedidos_itens;
      if (this.etapa.idetapa !== this.dados.etapa) {
        this.dados.etapa = this.etapa.idetapa;
        this.dados.ordem = this.ordem;
        this.apiService
          .change('pedidos', this.dados.idpedido, this.pedido)
          .subscribe();
      }
    } else {
      this.dados = this.agendamento;
      this.dados.datahora = this.apiService.timeToDate(this.dados.hora);
      this.dados.previsao = this.apiService.timeToDate(this.dados.previsao);
      this.itens = this.dados.agendamento_itens;
    }
    this.pessoa = this.dados.pessoa;
    this.periodos = [
      {
        'label': new Date(this.dados.datahora).toLocaleTimeString()
      },
      {
        'label': ('~ ' + this.time_convert(this.tempoEstimado()))
      },
      {
        'label': new Date(this.dados.previsao).toLocaleTimeString()
      },
      {
        'label': '--:--:--'
      }
    ];
    if (this.dados.lancamento) {
      this.periodos[this.periodos.length - 1] = {
        'label': new Date(this.dados.lancamento.datapagto).toLocaleTimeString(),
        'title': new Date(this.dados.lancamento.datapagto).toLocaleDateString(),
        'icon': 'pi pi-money-bill'
      };
    }
  }

  produto(val) {
    return val.produto.descricao;
  }

  valor(val) {
    return this.apiService.currencyFormat(val.vlrtotal);
  }

  excluir() {
    this.excluirPedido.emit(this.dados.idpedido);
  }

  editar() {
    this.setPedido.emit(this.pedido);
  }

  tempoEstimado() {
    const datahora = this.apiService.parseDate(this.dados.datahora);
    const previsao = this.apiService.parseDate(this.dados.previsao);
    const diffMs = previsao.getTime() - datahora.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return diffMins || 0;
  }

  compareDate(tempo = 0) {
    const previsao = this.apiService.parseDate(this.dados.previsao);
    const agora = new Date();
    const diffMs = previsao.getTime() - agora.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const val = diffMins <= tempo ? (diffMins <= 0 ? 0 : tempo) : null;
    this.mensagemExpira = val !== null ? val : this.mensagemExpira;
    return this.mensagemExpira !== undefined ? true : false;
  }

  time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}:${minutes}:00`;
  }

  lancamentoModal() {
    this.lancamento.emit(this.pedido);
  }
}
