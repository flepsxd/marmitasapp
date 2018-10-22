import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ApiService } from '../../api/api.service';
import { ProdutoComponent } from './produto/produto.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  columns: Array<{}> = [];
  cad: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.filtros = [
      {
        key: 'status',
        title: 'Status',
        type: 'toggle',
        verdadeiro: 'Ativo',
        falso: 'Inativo',
        valorVerdadeiro: 'A',
        valorFalso: 'I',
        valorFormatado: 'A',
        value: true
      }
    ];
    this.cad = {
      component: ProdutoComponent,
      chave: 'idproduto',
      resource: 'produtos',
      header: 'Cadastro de Produto'
    };
    this.columns = [
      {
        header: 'Descrição',
        field: 'descricao'
      },
      {
        header: 'Preço',
        field: 'preco',
        fn: this.apiService.currencyFormat
      },
      {
        header: 'Status',
        field: 'status_formatado',
        class: 'status'
      },
    ];
  }

}
