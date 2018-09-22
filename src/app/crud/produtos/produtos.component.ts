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
  dados: Produto[];
  columns: Array<{}> = [];
  cad: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cad = {
      component: ProdutoComponent,
      chave: 'idproduto',
      header: 'Cadastro de Produto'
    };
    this.dados = this.apiService.produtos;
    this.columns = [
      {
        header: 'Descrição',
        field: 'descricao'
      },
      {
        header: 'Preço',
        field: 'preco',
        fn: function (dado){
          return "R$ " + dado;
        }
      },
      {
        header: 'Status',
        field: 'status',
        fn: function(dado){
          return dado == 'A' ? 'Ativo' : 'Inativo';
        }
      },
      {
        header: 'Status',
        field: 'status'
      },
    ];
  }

}
