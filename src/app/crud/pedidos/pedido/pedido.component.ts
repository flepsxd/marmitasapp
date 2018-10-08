import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { Pedido } from '../../pedido';
import { Pessoa } from '../../pessoa';
import { PedidoItens } from '../../pedido-itens';
import { PedidoItensComponent } from '../pedido-itens/pedido-itens.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidoForm: FormGroup;
  status: boolean;
  pedido: Pedido = {
    idpedido: null,
    idagendamento: null,
    idpessoa: null,
    idendereco: null,
    datahora: new Date().toJSON(),
    valor: null,
    observacoes: '',
    status: 'A'
  };
  @Input()
  idpedido: number;
  @Input()
  etapa: string;

  dadosPessoas: Array<Pessoa>;
  pessoas: Array<Pessoa>;
  colsPedidosItens: Array<any> = [
    {
      header: 'Produto',
      field: 'produto',
      fn: function(dados) {
        return dados.descricao;
      }
    },
    {
      header: 'Valor Unitário',
      field: 'vlrunitario',
      class: 'valor',
      fn: this.apiService.currencyFormat
    },
    {
      header: 'Quantidade',
      field: 'quantidade',
      class: 'unidade'
    },
    {
      header: 'Valor Total',
      field: 'vlrtotal',
      fn: this.apiService.currencyFormat,
      class: 'valor'
    },
    {
      header: 'Desconto',
      field: 'desconto',
      class: 'valor',
      fn: this.apiService.currencyFormat
    }
  ];
  dadosPedidosItens: Array<PedidoItens>;
  cadPedidoItem: Object;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.cadPedidoItem = {
      component: PedidoItensComponent,
      resource: 'pedidositens',
      extraURL: `/pedido/${this.idpedido}`,
      chave: 'idpedido_item'
    };
    this.apiService.get('pessoas', { ativo: true }).subscribe(resp => {
      this.pessoas = resp.dados;
    });
    this.getDados();

    this.pedidoForm = this.formBuilder.group({
      idpedido: [this.pedido.idpedido],
      idpessoa: [this.pedido.idpessoa],
      idendereco: [this.pedido.idendereco],
      pessoas: [this.pedido.pessoas],
      datahora: [this.pedido.datahora],
      formatData: [new Date(this.pedido.datahora)],
      valor: [this.pedido.valor],
      observacoes: [this.pedido.observacoes],
      status: [this.pedido.status]
    });

    this.pedidoForm.get('formatData').valueChanges.subscribe(value => {
      this.pedidoForm.patchValue({ datahora: value.toJSON() });
    });
  }

  getDados() {
    if (this.idpedido) {
      this.apiService.getId('pedidos', this.idpedido).subscribe(resp => {
        this.pedido = resp.dados;
        this.pedidoForm.patchValue(this.pedido);
        this.addValidation();
      });
    } else {
      this.addValidation();
    }
  }

  addValidation() {
    this.pedidoForm.get('idpessoa').setValidators(Validators.required);
    this.pedidoForm.get('idendereco').setValidators(Validators.required);
  }

  confirmar() {
    return this.pedidoForm.value;
  }

  getPessoas($event = { query: null }) {
    this.dadosPessoas = this.apiService.filter(this.pessoas, $event.query);
  }
}
