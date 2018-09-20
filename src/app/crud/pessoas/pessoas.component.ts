import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { ApiService } from '../../api/api.service';
import { PessoaComponent } from './pessoa/pessoa.component';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  dados: Pessoa[];
  columns: Array<{}> = [];
  cad: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cad = {
      component: PessoaComponent,
      chave: 'idpessoa'
    };
    this.dados = this.apiService.pessoas;
    this.columns = [
      {
        descricao: 'Nome',
        campo: 'nome'
      },
      {
        descricao: 'Telefone',
        campo: 'telefone'
      },
      {
        descricao: 'E-mail',
        campo: 'email'
      },
      {
        descricao: 'Status',
        campo: 'status'
      },
    ];
  }

}
