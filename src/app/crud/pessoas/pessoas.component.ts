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
  columns: Array<{}> = [];
  cad: any;
  filtros: Array<any> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.filtros = [
      {
        key: 'status',
        title: 'Status',
        type: 'toggle',
        verdadeiro: 'Ativo',
        falso: 'Inativo',
        valorVerdadeiro: 'A',
        valorFalso: 'I'
      }
    ];
    this.cad = {
      component: PessoaComponent,
      chave: 'idpessoa',
      resource: 'pessoas',
      header: 'Cadastro de Pessoas'
    };
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
        field: 'status_formatado',
        class: 'status'
      }
    ];
  }
}
