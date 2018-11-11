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
import { Agendamento } from '../../agendamento';
import { Pessoa } from '../../pessoa';
import { AgendamentoItensComponent } from '../agendamento-itens/agendamento-itens.component';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {
  agendamentoForm: FormGroup;
  status: boolean;
  agendamento: Agendamento = {
    idagendamento: null,
    idpessoa: null,
    hora: null,
    previsao: null,
    valor: null,
    observacoes: '',
    status: 'A',
    proximodia: true
  };
  @Input()
  idagendamento: number;
  @Input() source: any;

  dadosPessoas: Array<Pessoa> = [];
  pessoas: Array<Pessoa>;
  cadastroPessoa = false;
  @ViewChild('cadPessoa')
  cadPessoa: any;
  novaPessoa: Pessoa;
  colsAgendamentoItens: Array<any> = [
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
  dadosAgendamentoItens: Array<any>;
  cadAgendamentoItem: Object;

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.cadAgendamentoItem = {
      component: AgendamentoItensComponent,
      resource: 'agendamentoitens',
      extraURL: `/agendamentos/${this.idagendamento}`,
      chave: 'idagendamento_item'
    };
    this.loadPessoa();

    this.agendamentoForm = this.formBuilder.group({
      idagendamento: [this.agendamento.idagendamento],
      idpessoa: [this.agendamento.idpessoa],
      pessoa: [this.agendamento.pessoa, Validators.required],
      hora: [this.agendamento.hora],
      formatHour: [this.apiService.timeToDate(this.agendamento.hora)],
      tempo_previsto: [null, Validators.required],
      previsao: [this.agendamento.previsao],
      previsaoFormat: [this.apiService.timeToDate(this.agendamento.previsao)],
      valor: [this.agendamento.valor, Validators.required],
      observacoes: [this.agendamento.observacoes],
      status: [this.agendamento.status, Validators.required],
      statusB: [this.agendamento.status === 'A'],
      proximodia: [this.agendamento.proximodia]
    });

    this.getDados();

    this.agendamentoForm.get('formatHour').valueChanges.subscribe(value => {
      this.agendamentoForm.patchValue({ hora: this.apiService.parseDate(value).toLocaleTimeString() });
      const previsao = this.apiService.parseDate(value);
      previsao.setMinutes(
        previsao.getMinutes() + this.agendamentoForm.get('tempo_previsto').value
      );
      this.agendamentoForm.patchValue({ previsaoFormat: previsao });
    });
    this.agendamentoForm.get('previsaoFormat').valueChanges.subscribe(value => {
      this.agendamentoForm.patchValue({ previsao: this.apiService.parseDate(value).toLocaleTimeString() });
    });

    this.agendamentoForm.get('tempo_previsto').valueChanges.subscribe(value => {
      const datahora = new Date(this.agendamentoForm.get('formatHour').value);
      const previsao = new Date(
        datahora.setMinutes(datahora.getMinutes() + value)
      );
      this.agendamentoForm.patchValue({ previsaoFormat: previsao });
    });
  }

  loadPessoa() {
    this.apiService.get('pessoas', { ativo: true }).subscribe(resp => {
      this.pessoas = resp.dados;
    });
  }

  calculaPrevisaoETempo() {
    const hora = this.apiService.timeToDate(this.agendamentoForm.get('hora').value);
    const previsao = this.apiService.timeToDate(this.agendamentoForm.get('previsao').value);
    const diffMs = previsao.getTime() - hora.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return diffMins || 0;
  }

  getDados() {
    if (this.source && !this.idagendamento) {
      this.agendamento = this.source;
      this.dadosAgendamentoItens = [];
    } else if (this.idagendamento) {
      this.apiService.getId('agendamentos', this.idagendamento).subscribe(resp => {
        this.agendamento = resp.dados;
        this.dadosAgendamentoItens = this.agendamento.agendamento_itens || [];
        this.agendamentoForm.patchValue(this.agendamento);
        this.agendamentoForm.patchValue({
          tempo_previsto: this.calculaPrevisaoETempo(),
          statusB: this.agendamento.status === 'A',
          proximodia: (this.agendamento.proximodia === 1 || this.agendamento.proximodia),
          formatHour: this.apiService.timeToDate(this.agendamento.hora),
          previsaoFormat: this.apiService.timeToDate(this.agendamento.previsao)
        });
      });
    } else {
      this.dadosAgendamentoItens = [];
    }
  }

  cancelar() {
    this.cadastroPessoa = false;
  }

  confirmar() {
    const agendamento = this.agendamentoForm.value;
    agendamento.agendamento_itens = this.dadosAgendamentoItens;
    agendamento.hora = agendamento.formatHour.toLocaleTimeString();
    agendamento.previsao = agendamento.previsaoFormat.toLocaleTimeString();
    return agendamento;
  }

  validaForm() {
    return this.apiService.validaForm(this.agendamentoForm);
  }

  getPessoas($event = { query: null }) {
    this.dadosPessoas = this.apiService.filterPessoa($event, this.pessoas);
  }

  aoAtualizar() {
    let valor = 0;
    this.dadosAgendamentoItens.filter(val => !val.deletar).forEach(function(val, index) {
      valor += val.vlrtotal;
    });
    this.agendamentoForm.get('valor').patchValue(valor);
  }

  cadastrarPessoa($event) {
    setTimeout(function() {
      const value = this.agendamentoForm.get('pessoa').value;
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
      this.agendamentoForm.get('idpessoa').patchValue(resp.dados.idpessoa);
      this.agendamentoForm.get('pessoa').patchValue(resp.dados);
      this.cadastroPessoa = false;
      this.loadPessoa();
    });
  }

  somenteNumero(event = null, control = null): boolean {
    if (control && this.agendamentoForm.get(control).value)  {
      this.agendamentoForm.get(control).patchValue(this.agendamentoForm.get(control).value.toString().replace(/[^0-9]/g, ''));
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
