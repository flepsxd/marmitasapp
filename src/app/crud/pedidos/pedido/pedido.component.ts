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
    etapa: 'A',
    status: 'A'
  };
  @Input()
  idpedido: number;
  @Input()
  etapa: string;

  dadosPessoas: Array<Pessoa>;

  colsPedidosItens: Array<any> = [
    {
      header: 'Produto',
      field: 'idproduto',
      class: 'id',
      fn: function(dados) {
        return this.apiService.produtos.filter(
          val => (val.idpedido = dados.idpedido)
        )[0].descricao;
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
      chave: 'idpedido_item'
    };
    this.getPessoas();
    this.getDados();

    this.pedidoForm = this.formBuilder.group({
      idpessoa: [this.pedido.idpessoa, Validators.required],
      pessoa: [
        this.apiService.getById('pessoas', 'idpessoa', this.pedido.idpessoa) ||
          null
      ],
      datahora: [this.pedido.datahora],
      formatData: [new Date(this.pedido.datahora)],
      etapa: [this.pedido.etapa, Validators.required],
      valor: [this.pedido.valor, Validators.required],
      observacoes: [this.pedido.observacoes, Validators.required],
      statusB: [this.pedido.status == 'A' ? true : false],
      status: [this.pedido.status, Validators.required]
    });

    this.pedidoForm.get('formatData').valueChanges.subscribe(value => {
      this.pedidoForm.patchValue({ datahora: value.toJSON() });
    });
  }

  getDados() {
    if (this.idpedido) {
      this.pedido = this.apiService.getById(
        'pedidos',
        'idpedido',
        this.idpedido
      );
      this.dadosPedidosItens = this.apiService.getById(
        'pedido_itens',
        'idpedido',
        this.idpedido,
        false
      );
    } else {
      if (this.etapa) {
        this.pedido.etapa = this.etapa;
      }
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

  alteraStatus() {
    this.pedidoForm.patchValue({
      status: this.pedidoForm.get('statusB').value ? 'A' : 'F'
    });
  }

  getPessoas($event = { query: null }) {
    this.dadosPessoas = this.apiService.filterAtivo('pessoas', $event.query);
  }
}
