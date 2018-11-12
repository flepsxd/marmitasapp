import { EtapaComponent } from './etapa/etapa.component';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FormapagtoComponent } from './formapagto/formapagto.component';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  dados: Array<any>;
  columnsEtapas: Array<{}> = [];
  columnsFormapagto: Array<{}> = [];
  cadEtapas: any;
  cadFormaPagto: any;


  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.cadEtapas = {
      component: EtapaComponent,
      chave: 'idetapa',
      resource: 'etapas',
      header: 'Cadastro de Etapas'
    };
    this.cadFormaPagto = {
      component: FormapagtoComponent,
      chave: 'idformapagto',
      resource: 'formapagtos',
      header: 'Cadastro de Forma de Pagamento'
    };
    this.columnsEtapas = [
      {
        header: 'Descrição',
        field: 'descricao'
      },
      {
        header: 'Finalizado?',
        field: 'finalizado',
        fn: function(dado) {
          return dado === 1 ? 'Sim' : 'Não';
        }
      },
      {
        header: 'Gera Lançamento?',
        field: 'geralancamento',
        fn: function(dado) {
          return dado === 1 ? 'Sim' : 'Não';
        }
      }
    ];
    this.columnsFormapagto = [
      {
        header: 'Forma de Pagamento',
        field: 'descricao'
      }
    ];
  }

}
