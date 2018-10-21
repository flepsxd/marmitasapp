import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
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
    previsao: new Date().toJSON(),
    valor: null,
    observacoes: '',
    status: 'A'
  };
  @Input()
  idpedido: number;
  @Input()
  etapa: string;
  @Input() source: any;

  dadosPessoas: Array<Pessoa>;
  pessoas: Array<Pessoa>;
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
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.cadPedidoItem = {
      component: PedidoItensComponent,
      resource: 'pedidositens',
      extraURL: `/pedido/${this.idpedido}`,
      chave: 'idpedido_item'
    };
    this.loadPessoa();

    this.pedidoForm = this.formBuilder.group({
      idpedido: [this.pedido.idpedido],
      idpessoa: [this.pedido.idpessoa],
      idendereco: [this.pedido.idendereco],
      pessoas: [this.pedido.pessoas],
      datahora: [this.pedido.datahora],
      formatData: [this.apiService.parseDate(this.pedido.datahora)],
      tempoprevisto: [],
      previsao: [this.pedido.previsao],
      previsaoFormat: [this.apiService.parseDate(this.pedido.previsao)],
      valor: [this.pedido.valor],
      observacoes: [this.pedido.observacoes],
      status: [this.pedido.status],
      endereco: this.formBuilder.group({
        idbairro: [null],
        idcidade: [null],
        cidade: [null],
        bairro: [null],
        endereco: [null],
        numero: [null],
        complemento: [null],
        cep: [null, Validators.maxLength(9)]
      })
    });

    this.getDados();

    this.pedidoForm.get('formatData').valueChanges.subscribe(value => {
      this.pedidoForm.patchValue({ datahora: this.apiService.dateToJSON(value) });
      const previsao = new Date(value);
      previsao.setMinutes(
        previsao.getMinutes() + this.pedidoForm.get('tempoprevisto').value
      );
      this.pedidoForm.patchValue({ previsaoFormat: previsao });
    });
    this.pedidoForm.get('previsaoFormat').valueChanges.subscribe(value => {
      this.pedidoForm.patchValue({ previsao: this.apiService.dateToJSON(value) });
    });

    this.pedidoForm.get('tempoprevisto').valueChanges.subscribe(value => {
      const datahora = new Date(this.pedidoForm.get('formatData').value);
      const previsao = new Date(
        datahora.setMinutes(datahora.getMinutes() + value)
      );
      this.pedidoForm.patchValue({ previsaoFormat: previsao });
    });

    this.pedidoForm.get('pessoas').valueChanges.subscribe(value => {
      if (typeof value === 'object') {
        this.pedidoForm.patchValue({ endereco: value.endereco });
      }
    });
  }

  loadPessoa() {
    this.apiService.get('pessoas', { ativo: true }).subscribe(resp => {
      this.pessoas = resp.dados;
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
      this.addValidation();
    } else if (this.idpedido) {
      this.apiService.getId('pedidos', this.idpedido).subscribe(resp => {
        this.pedido = resp.dados;
        this.dadosPedidosItens = this.pedido.pedidos_itens || [];
        this.pedidoForm.patchValue(this.pedido);
        this.pedidoForm.patchValue({
          tempoprevisto: this.calculaPrevisaoETempo()
        });
        this.pedidoForm.patchValue({
          formatData: this.apiService.parseDate(this.pedido.datahora),
          previsaoFormat: this.apiService.parseDate(this.pedido.previsao)
        });
        this.pedidoForm
          .get('endereco')
          .patchValue(this.pedido.endereco || this.pedido.pessoas.endereco);
        this.addValidation();
      });
    } else {
      this.dadosPedidosItens = [];
      this.addValidation();
    }
  }

  addValidation() {
    this.pedidoForm.get('idpessoa').setValidators(Validators.required);
    this.pedidoForm.get('idendereco').setValidators(Validators.required);
  }

  confirmar() {
    const pedido = this.pedidoForm.value;
    pedido.pedidos_itens = this.dadosPedidosItens;
    return pedido;
  }

  getPessoas($event = { query: null }) {
    if (!$event.query) {
      this.dadosPessoas = this.pessoas;
    } else {
      this.dadosPessoas = this.apiService.filter(
        this.pessoas,
        $event.query,
        function(ele) {
          return (
            (ele.telefone + '')
              .toLowerCase()
              .replace(/\D/gm, '')
              .includes($event.query.toLowerCase().replace(/\D/gm, '')) ||
            (ele.nome + '')
              .toLowerCase()
              .replace(/\D/gm, '')
              .includes($event.query.toLowerCase().replace(/\D/gm, ''))
          );
        }
      );
    }
  }

  aoAtualizar() {
    let valor = 0;
    this.dadosPedidosItens.forEach(function(val, index) {
      valor += val.vlrtotal;
    });
    this.pedidoForm.get('valor').patchValue(valor);
  }

  cadastrarPessoa($event) {
    if (typeof this.pedidoForm.get('pessoas').value === 'string') {
      this.novaPessoa = {
        idpessoa: null,
        nome: '',
        status: 'A',
        telefone: this.pedidoForm.get('pessoas').value
      };
      this.cadastroPessoa = true;
    }
  }

  salvarPessoa() {
    const pessoa = this.cadPessoa.confirmar();
    this.apiService.add('pessoas', pessoa).subscribe(resp => {
      this.pedidoForm.get('pessoas').patchValue(resp.dados);
      this.cadastroPessoa = false;
      this.loadPessoa();
    });
  }

  somenteNumero(event = null, control = null): boolean {
    if(control && this.pedidoForm.get(control).value)  {
      this.pedidoForm.get(control).patchValue(this.pedidoForm.get(control).value.toString().replace(/[^0-9]/g, ''));
    }
    if(event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }

  }
}
