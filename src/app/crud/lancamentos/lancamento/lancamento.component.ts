import { Pessoa } from './../../pessoa';
import { ApiService } from './../../../api/api.service';
import { Lancamento } from './../../lancamento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  lancamentoForm: FormGroup;
  lancamento: Lancamento = {
    idlancamento: null,
    idpessoa: null,
    idpedido: null,
    valor: null,
    datahora: new Date(),
    valorpago: null,
    datapagto: new Date()
  };
  @Input() idlancamento: number;
  @Input() source: any;
  @Input() vinculoPessoa = false;

  dadosPessoas: Array<Pessoa>;
  pessoas: Array<Pessoa>;
  cadastroPessoa = false;
  @ViewChild('cadPessoa')
  cadPessoa: any;
  novaPessoa: Pessoa;

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.loadPessoas();

    this.lancamentoForm = this.formBuilder.group({
      idlancamento: [this.lancamento.idlancamento],
      idpedido: [this.lancamento.idpedido],
      idpessoa: [this.lancamento.idpessoa, Validators.required],
      pessoa: [{value: this.lancamento.pessoa, disabled: this.vinculoPessoa}],
      valor: [this.lancamento.valor],
      datahora: [this.lancamento.datahora, Validators.required],
      formatData: [this.apiService.parseDate(this.lancamento.datahora), Validators.required],
      valorpago: [this.lancamento.valorpago, Validators.required],
      datapagto: [this.lancamento.datapagto, Validators.required],
      formatDataPagto: [this.apiService.parseDate(this.lancamento.datapagto), Validators.required]
    });

    this.getDados();
  }

  loadPessoas() {
    if (this.vinculoPessoa) {
        this.apiService.getId('pessoas', (this.source ? this.source.idpessoa : this.lancamento.idpessoa)).subscribe(resp => {
          this.pessoas = [resp.dados];
          this.lancamentoForm.get('pessoa').patchValue(resp.dados);
        });
    } else {
      this.apiService.get('pessoas').subscribe(resp => {
        this.pessoas = resp.dados;
      });
    }
  }

  getDados() {
    if (this.source) {
      this.lancamento = this.source;
      this.lancamentoForm.patchValue(this.lancamento);
    } else if (this.idlancamento) {
      this.apiService.getId('lancamentos', this.idlancamento).subscribe(resp => {
        this.lancamento = resp.dados;
        this.lancamentoForm.patchValue(this.lancamento);
      });
    }
  }

  confirmar() {
    return this.lancamentoForm.value;
  }

  getPessoas($event = { query: null }) {
    this.dadosPessoas = this.apiService.filterPessoa($event, this.pessoas);
  }

  cadastrarPessoa($event) {
    setTimeout(function() {
      const value = this.lancamentoForm.get('pessoa').value;
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
      this.lancamentoForm.get('pessoas').patchValue(resp.dados);
      this.cadastroPessoa = false;
      this.loadPessoas();
    });
  }

  validaForm() {
    return this.apiService.validaForm(this.lancamentoForm);
  }


}
