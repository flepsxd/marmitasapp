import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  columns: Array<{}> = [];
  cad: any;
  filtros: Array<any>;
  produtosColunas = [
    {
      header: 'Produto',
      field: 'descricao',
      class: 'descricao-total'
    },
    {
      header: 'Pessoa',
      field: 'pessoa',
      class: 'descricao-total'
    },
    {
      header: 'Valor',
      field: 'valor',
      class: 'valor',
      fn: this.apiService.currencyFormat
    },
    {
      header: 'Quantidade',
      field: 'quantidade',
      class: 'unidade'
    },
    {
      header: 'Qntd. Pedidos',
      field: 'qntdpedido',
      class: 'unidade'
    },
    {
      header: 'Status',
      field: 'status_formatado',
      class: 'status'
    }
  ];
  pessoasColunas = [
    {
      header: 'Pessoa',
      field: 'nome',
      class: 'descricao-total'
    },
    {
      header: 'Produto',
      field: 'produto',
      class: 'descricao-total'
    },
    {
      header: 'Valor',
      field: 'valor',
      class: 'valor',
      fn: this.apiService.currencyFormat
    },
    {
      header: 'Quantidade',
      field: 'quantidade',
      class: 'unidade'
    },
    {
      header: 'Qntd. Pedidos',
      field: 'qntdpedido',
      class: 'unidade'
    },
    {
      header: 'Status',
      field: 'status_formatado',
      class: 'status'
    }
  ];
  totalizadores: Array<any> = [];

  constructor(private apiService: ApiService) {
      const perini = new Date();
      perini.setHours(0, 0, 0, 0);
      const perfim = new Date(perini);
      perfim.setDate(perfim.getDate() + 30);
      this.alterarFiltroAgrupamento();
      this.filtros = [
        {
          type: 'date',
          title: 'Início',
          key: 'perini',
          value: perini,
          valorFormatado: this.apiService.dateToJSON(perini)
        },
        {
          type: 'date',
          title: 'Fim',
          key: 'perfim',
          value: perfim,
          valorFormatado: this.apiService.dateToJSON(perfim)
        },
        {
          key: 'status',
          title: 'Status',
          type: 'toggle',
          verdadeiro: 'Ativo',
          falso: 'Inativo',
          valorVerdadeiro: 'A',
          valorFalso: 'I',
          valorFormatado: 'A',
          value: true,
        },
        {
          type: 'select',
          title: 'Agrupamento',
          key: 'tipo',
          value: 'produtos',
          valorFormatado: 'produtos',
          clear: false,
          opcoes: [{
            value: 'produtos',
            label: 'Produtos'
          },
          {
            value: 'pessoas',
            label: 'Pessoas'
          }],
          posAtualizar: this.alterarFiltroAgrupamento.bind(this)
        }
      ];
      this.totalizadores = [
        {
          title: 'Valor Total',
          field: 'valor',
          class: 'valor',
          total: function(dados) {
            let total = 0;
            dados.forEach(el => {
              total += el.valor;
            });
            return this.apiService.currencyFormat(total);
          }.bind(this)
        },
        {
          title: 'Quantidade de Items Vendidos',
          field: 'quantidade',
          class: 'unidade',
          total: function(dados) {
            let total = 0;
            dados.forEach(el => {
              total += el.quantidade;
            });
            return total;
          }
        },
        {
          title: 'Quantidade de Pedidos',
          field: 'qntdpedido',
          class: 'unidade',
          total: function(dados) {
            let total = 0;
            dados.forEach(el => {
              total += el.qntdpedido;
            });
            return total;
          }
        }
      ];
  }

  ngOnInit() {
    this.cad = {
      resource: 'relatorios'
    };
  }

  alterarFiltroAgrupamento(tipo = null) {
    if (tipo === 'pessoas') {
      this.columns = this.pessoasColunas;
    } else {
      this.columns = this.produtosColunas;
    }
  }
}
