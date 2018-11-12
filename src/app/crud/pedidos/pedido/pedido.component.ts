import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
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
    idformapagto: null,
    datahora: null,
    previsao: null,
    valor: null,
    observacoes: '',
    status: 'A'
  };
  @Input()
  idpedido: number;
  @Input()
  etapa: string;
  @Input() source: any;

  dadosPessoas: Array<Pessoa> = [];
  pessoas: Array<Pessoa>;
  formapagtos: Array<any>;
  cadastroPessoa = false;
  @ViewChild('cadPessoa')
  cadPessoa: any;
  novaPessoa: Pessoa;
  colsPedidosItens: Array<any> = [
    {
      header: 'Produto',
      field: 'produto',
      class: 'descricao',
      fn: function(dados) {
        return dados.descricao;
      }
    },
    {
      header: 'Quantidade',
      field: 'quantidade',
      class: 'unidade'
    },
    {
      header: 'Valor Unitário',
      field: 'vlrunitario',
      class: 'valor',
      fn: this.apiService.currencyFormat
    },
    {
      header: 'Desconto',
      field: 'desconto',
      class: 'valor',
      fn: this.apiService.currencyFormat
    },
    {
      header: 'Valor Total',
      field: 'vlrtotal',
      fn: this.apiService.currencyFormat,
      class: 'valor'
    }
  ];
  dadosPedidosItens: Array<any>;
  cadPedidoItem: Object;

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.cadPedidoItem = {
      component: PedidoItensComponent,
      resource: 'pedidositens',
      extraURL: `/pedido/${this.idpedido}`,
      chave: 'idpedido_item'
    };
    this.loadDados();

    this.pedidoForm = this.formBuilder.group({
      idpedido: [this.pedido.idpedido],
      idpessoa: [this.pedido.idpessoa],
      idendereco: [this.pedido.idendereco],
      idagendamento: [this.pedido.idagendamento],
      idformapagto: [this.pedido.idformapagto],
      formapagto: [null, Validators.required],
      pessoa: [this.pedido.pessoa, Validators.required],
      datahora: [this.pedido.datahora],
      formatData: [this.apiService.parseDate(this.pedido.datahora)],
      tempo_previsto: [null, Validators.required],
      previsao: [this.pedido.previsao],
      previsaoFormat: [this.apiService.parseDate(this.pedido.previsao)],
      valor: [this.pedido.valor, Validators.required],
      observacoes: [this.pedido.observacoes],
      status: [this.pedido.status],
      endereco: this.formBuilder.group({
        idbairro: [null],
        idcidade: [null],
        cidade: [null, Validators.required],
        bairro: [null, Validators.required],
        endereco: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        cep: [null, Validators.maxLength(9)]
      }),
    });

    this.getDados();

    this.pedidoForm.get('formapagto').valueChanges.subscribe(value => {
      this.pedidoForm.patchValue({ idformapagto: value.idformapagto});
    });

    this.pedidoForm.get('formatData').valueChanges.subscribe(value => {
      this.pedidoForm.patchValue({ datahora: this.apiService.dateToJSON(value) });
      const previsao = this.apiService.parseDate(value);
      previsao.setMinutes(
        previsao.getMinutes() + this.pedidoForm.get('tempo_previsto').value
      );
      this.pedidoForm.patchValue({ previsaoFormat: previsao });
    });
    this.pedidoForm.get('previsaoFormat').valueChanges.subscribe(value => {
      this.pedidoForm.patchValue({ previsao: this.apiService.dateToJSON(value) });
    });

    this.pedidoForm.get('tempo_previsto').valueChanges.subscribe(value => {
      const datahora = new Date(this.pedidoForm.get('formatData').value);
      const previsao = new Date(
        datahora.setMinutes(datahora.getMinutes() + value)
      );
      this.pedidoForm.patchValue({ previsaoFormat: previsao });
    });

    this.pedidoForm.get('pessoa').valueChanges.subscribe(value => {
      if (typeof value === 'object') {
        this.pedidoForm.patchValue({ endereco: value.endereco });
      }
    });
  }

  loadDados() {
    this.apiService.get('pessoas', { ativo: true }).subscribe(resp => {
      this.pessoas = resp.dados;
    });
    this.apiService.get('formapagtos').subscribe(resp => {
      this.formapagtos = resp.dados;
      this.formapagtos.forEach(el => {
        if (el.idformapagto === this.pedido.idformapagto) {
          this.pedidoForm.get('formapagto').patchValue(el);
        }
      });
    });
  }

  calculaPrevisaoETempo() {
    const datahora = this.apiService.parseDate(this.pedidoForm.get('datahora').value);
    const previsao = this.apiService.parseDate(this.pedidoForm.get('previsao').value);
    const diffMs = previsao.getTime() - datahora.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return diffMins || 0;
  }

  getDados() {
    if (this.source && !this.idpedido) {
      this.pedido = this.source;
      this.dadosPedidosItens = [];
    } else if (this.idpedido) {
      this.apiService.getId('pedidos', this.idpedido).subscribe(resp => {
        this.pedido = resp.dados;
        this.dadosPedidosItens = this.pedido.pedidos_itens || [];
        this.pedidoForm.patchValue(this.pedido);
        this.pedidoForm.patchValue({
          formatData: this.apiService.parseDate(this.pedido.datahora),
          previsaoFormat: this.apiService.parseDate(this.pedido.previsao),
          tempo_previsto: this.calculaPrevisaoETempo()
        });
        this.pedidoForm
          .get('endereco')
          .patchValue(this.pedido.endereco || this.pedido.pessoa.endereco);
      });
    } else {
      this.dadosPedidosItens = [];
    }
  }

  cancelar() {
    this.cadastroPessoa = false;
  }

  confirmar() {
    const pedido = this.pedidoForm.value;
    pedido.pedidos_itens = this.dadosPedidosItens;
    pedido.datahora = this.apiService.dateToJSON(pedido.formatData);
    pedido.previsao = this.apiService.dateToJSON(pedido.previsaoFormat);
    return pedido;
  }

  validaForm() {
    return this.apiService.validaForm(this.pedidoForm);
  }

  getPessoas($event = { query: null }) {
    this.dadosPessoas = this.apiService.filterPessoa($event, this.pessoas);
  }

  aoAtualizar() {
    let valor = 0;
    this.dadosPedidosItens.filter(val => !val.deletar).forEach(function(val, index) {
      valor += val.vlrtotal;
    });
    this.pedidoForm.get('valor').patchValue(valor);
  }

  cadastrarPessoa($event) {
    setTimeout(function() {
      const value = this.pedidoForm.get('pessoa').value;
      if (typeof value === 'string' && value) {
        this.novaPessoa = {
          idpessoa: null,
          nome: '',
          status: 'A',
          telefone: Number(value)
        };
        this.cadastroPessoa = true;
      }
    }.bind(this), 250);
  }

  salvarPessoa() {
    const pessoa = this.cadPessoa.confirmar();
    this.apiService.add('pessoas', pessoa).subscribe(resp => {
      this.pedidoForm.get('idpessoa').patchValue(resp.dados.idpessoa);
      this.pedidoForm.get('pessoa').patchValue(resp.dados);
      this.cadastroPessoa = false;
      this.loadDados();
    });
  }

  somenteNumero(event = null, control = null): boolean {
    if (control && this.pedidoForm.get(control).value)  {
      this.pedidoForm.get(control).patchValue(this.pedidoForm.get(control).value.toString().replace(/[^0-9]/g, ''));
    }
    if (event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }

  }
}
