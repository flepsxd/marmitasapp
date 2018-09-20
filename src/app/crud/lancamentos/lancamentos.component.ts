import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../lancamento';
import { ApiService } from '../../api/api.service';
import { LancamentoComponent } from './lancamento/lancamento.component';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {
  dados: Lancamento[];
  columns: Array<{}> = [];
  cad: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cad = {
      component: LancamentoComponent,
      chave: 'idlancamento'
    };
    this.dados = this.apiService.lancamentos;
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
