import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { Pessoa } from '../../pessoa';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  pessoaForm: FormGroup;
  status: boolean;
  dadosCidades: Array<any>;
  cidades: Array<any>;
  bairros: Array<any>;
  dadosBairros: Array<any>;
  pessoa: Pessoa = {
    idpessoa: null,
    nome: '',
    email: '',
    telefone: null,
    status: 'A'
  };
  @Input()
  idpessoa: number;
  @Input() source: Pessoa;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getDados();
    this.pessoaForm = this.formBuilder.group({
      idpessoa: [this.pessoa.idpessoa],
      nome: [this.pessoa.nome, Validators.required],
      telefone: [this.pessoa.telefone],
      email: [this.pessoa.email],
      status: [this.pessoa.status, Validators.required],
      statusB: [this.pessoa.status === 'A'],
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

    this.pessoaForm.get('statusB').valueChanges.subscribe(val => {
      this.pessoaForm.patchValue({ status: val ? 'A' : 'I' });
    });
  }

  getDados() {
    if (this.source) {
      this.pessoa = this.source;
    } else  if (this.idpessoa) {
      this.apiService.getId('pessoas', this.idpessoa).subscribe(resp => {
        this.pessoa = resp.dados;
        this.pessoaForm.patchValue(this.pessoa);
        this.pessoaForm.patchValue({ statusB: this.pessoa.status === 'A' });
      });
    }
  }

  confirmar() {
    return this.pessoaForm.value;
  }
}
