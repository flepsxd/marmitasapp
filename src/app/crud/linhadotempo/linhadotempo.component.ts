import { Component, OnInit, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Pedido } from '../pedido';
import { ApiService } from '../../api/api.service';
import { DragulaService } from 'ng2-dragula';
import {ConfirmationService} from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-linhadotempo',
  templateUrl: './linhadotempo.component.html',
  styleUrls: ['./linhadotempo.component.css']
})
export class LinhadotempoComponent implements OnInit, AfterViewInit {
  @ViewChildren('dragulaM') dragulaM: QueryList<any>;
  @ViewChild('pedidoFn') pedidoFn: any;
  @ViewChild('lancamentoFn') lancamentoFn: any;
  scrumboard: Array<any>;
  cards: Array<Pedido>;
  dragActive: any;
  pedido: any = {};
  filtros: Array<any> = [];
  formapagtos: Array<any> = [];
  cadastroPedido = false;
  carregando = false;
  submit = false;

  lancamento: any = {};
  cadastroLancamento = false;

  subs = new Subscription();

  constructor(
    private apiService: ApiService,
    private dragulaService: DragulaService,
    private confirmationService: ConfirmationService
  ) {
    const timeline = this.dragulaService.find('timeline');
    if (!timeline) {
      this.dragulaService.createGroup('timeline', {
        invalid: function(el) {
          if (el.className.indexOf('naomover') >= 0) {
            return true;
          }
          return false;
        }
      });
    }
  }

  ngOnInit() {
    this.apiService.get('formapagtos').subscribe(resp => {
      this.formapagtos = resp.dados;
      this.filtros[1].opcoes = this.formapagtos;
    });
    const data = new Date();
    data.setHours(0, 0, 0, 0);
    this.filtros = [
      {
        type: 'date',
        title: 'Data',
        value: data,
        key: 'datahora',
        valorFormatado: this.apiService.dateToJSON(data)
      },
      {
        type: 'multiple',
        title: 'Forma de Pagamento',
        key: 'idformapagto',
        dataKey: 'idformapagto',
        keyLabel: 'descricao',
        array: true
      }
    ];
    this.subs.add(
      this.dragulaService
        .dropModel('timeline')
        .subscribe(
          ({
            item,
            source,
            sourceIndex,
            target,
            targetIndex
          }) => {
            if (source.isEqualNode(target)) {
              if (sourceIndex !== targetIndex) {
                item.ordem = targetIndex;
                this.apiService
                  .change('pedidos', item.idpedido, item)
                  .subscribe(this.ngOnInit);
              }
            }
            this.dragulaM.toArray().forEach(eleDiv => {
              if (eleDiv.nativeElement.isEqualNode(target)) {
                if(!item.idlancamento && eleDiv.item.geralancamento) {

                  setTimeout(() => this.dialogLancamento(item));
                }
              }
            });
          }
        )
    );
    this.getDados();
  }

  ngAfterViewInit(): void {
    this.dragulaM.changes.subscribe(() => {
      this.dragulaM.toArray().forEach((div, index) => {
        div.item = this.scrumboard[index];
      });
    });

  }

  getDados() {
    this.carregando = true;
    this.apiService.get('pedidos/timeline', this.apiService.tratarFilter(this.filtros)).subscribe(resp => {
      this.scrumboard = resp.dados;
      this.carregando = false;
    });
  }

  adicionar(item) {
    this.setPedido({idetapa: item.idetapa});
  }

  excluirPedido(idpedido) {
    this.confirmationService.confirm({
      message: 'Deseja excluir esse Pedido?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.apiService.delete('pedidos', idpedido).subscribe(() => this.getDados());
      }
    });
  }

  setPedido(item) {
    this.pedido = item;
    this.cadastroPedido = true;
  }

  cancelar() {
    this.cadastroPedido = false;
  }

  salvar() {
    this.submit = true;
    this.apiService
      .confirmDialog(this.pedidoFn, { resource: 'pedidos', chave: 'idpedido' })
      .subscribe(obj => {
        this.submit = false;
        this.cadastroPedido = false;
        this.getDados();
      }, _ => this.submit = false);
  }

  alterarFiltro(filtro, index, value) {
    if (filtro.array) {
      value = value.map((val) => val[filtro.dataKey]);
    }
    filtro.valorFormatado = value;
    this.filtros[index] = filtro;
  }

  filtrar() {
    this.getDados();
  }

  dialogLancamento(pedido) {
    this.lancamento = pedido.lancamento;
    if (!this.lancamento) {
      this.lancamento = {
        valor: pedido.valor,
        valorpago: pedido.valor,
        datahora: pedido.datahora,
        datapagto: pedido.datahora,
        idpedido: pedido.idpedido,
        idpessoa: pedido.idpessoa
      };
    }
    this.lancamento.pessoa = pedido.pessoa;
    this.cadastroLancamento = true;
  }

  cancelarLancamento() {
    this.lancamento = {};
    this.cadastroLancamento = false;
  }

  salvarLancamento() {
    this.submit = true;
    this.apiService
      .confirmDialog(this.lancamentoFn, {resource: 'lancamentos', chave: 'idlancamento'})
      .subscribe(obj => {
        this.submit = false;
        this.cadastroLancamento = false;
        this.getDados();
      }, _ => this.submit = false);
  }
}
