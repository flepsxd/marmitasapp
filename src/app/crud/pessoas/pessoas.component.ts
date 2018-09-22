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
      chave: 'idpessoa',
      header: 'Cadastro de Pessoas'
    };
    this.dados = this.apiService.pessoas;
    this.columns = [
      {
        header: 'Nome',
        field: 'nome'
      },
      {
        header: 'Telefone',
        field: 'telefone'
      },
      {
        header: 'E-mail',
        field: 'email'
      },
      {
        header: 'Status',
        field: 'status',
        fn: function(dado){
          return dado == 'A' ? 'Ativo' : 'Inativo';
        }
      },
    ];
  }

}
