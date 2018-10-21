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
  cadastroPedido = false;

  lancamento: any = {};
  cadastroLancamento = false;

  subs = new Subscription();

  constructor(
    private apiService: ApiService,
    private dragulaService: DragulaService,
    private confirmationService: ConfirmationService
  ) {
    this.filtros = [{
      type: 'date',
      title: 'Data',
      value: new Date(),
      key: 'datahora',
      valorFormatado: this.apiService.dateToJSON(new Date())
    }];
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
  }

  ngOnInit() {
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
    this.apiService.get('pedidos/timeline', this.apiService.tratarFilter(this.filtros)).subscribe(resp => {
      this.scrumboard = resp.dados;
    });
  }

  adicionar(item) {
    this.setPedido({idetapa: item.idetapa});
  }

  excluirPedido(idpedido) {
    var that = this;
    this.confirmationService.confirm({
      message: 'Deseja excluir esse Pedido?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        that.apiService.delete('pedidos', idpedido).subscribe(that.ngOnInit);
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
    this.apiService
      .confirmDialog(this.pedidoFn, { resource: 'pedidos', chave: 'idpedido' })
      .subscribe(obj => {
        this.cadastroPedido = false;
        this.getDados();
      });
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
    this.apiService
      .confirmDialog(this.lancamentoFn, {resource: 'lancamentos', chave: 'idlancamento'})
      .subscribe(obj => {
        this.cadastroLancamento = false;
        this.getDados();
      });
  }
}
