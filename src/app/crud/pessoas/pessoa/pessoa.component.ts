import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { Pessoa } from '../../pessoa';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  pessoaForm: FormGroup;
  pessoa: Pessoa;
  @Input() idpessoa: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { 
    
  }

  ngOnInit() {
    this.getDados();
    this.pessoaForm = this.formBuilder.group({
      nome: [this.pessoa.nome, Validators.required],
      telefone: [this.pessoa.telefone],
      email: [this.pessoa.email],
      status: [this.pessoa.status, Validators.required]
    });
  }

  getDados(){
    if (this.idpessoa) {
      let pessoas = [...this.apiService.pessoas];
      this.pessoa = pessoas.filter((val)=>val.idpessoa == this.idpessoa)[0];
    }
  }
}
