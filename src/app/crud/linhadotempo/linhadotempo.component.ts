import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { Pedido } from '../pedido';
import { ApiService } from '../../api/api.service';
import { DragulaService } from '../../../../node_modules/ng2-dragula';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-linhadotempo',
  templateUrl: './linhadotempo.component.html',
  styleUrls: ['./linhadotempo.component.css']
})
export class LinhadotempoComponent implements OnInit {
  scrumboard: Array<any>;
  cards: Array<Pedido>;
  dragActive: any;
  pedido: any = {};
  filtros: Array<any> = [];
  cadastroPedido = false;
  @ViewChild('pedidoFn') pedidoFn: any;

  subs = new Subscription();

  constructor(
    private apiService: ApiService,
    private dragulaService: DragulaService
  ) {
    this.filtros = [{
      type: 'date',
      title: 'Data',
      value: new Date(),
      key: 'datahora',
      valorFormatado: new Date().toJSON()
    }];
    this.subs.add(
      this.dragulaService
        .dropModel('timeline')
        .subscribe(
          ({
            el,
            item,
            name,
            sibling,
            source,
            sourceIndex,
            sourceModel,
            target,
            targetIndex,
            targetModel
          }) => {
            if (source.isEqualNode(target)) {
              if (sourceIndex !== targetIndex) {
                item.ordem = targetIndex;
                this.apiService
                  .change('pedidos', item.idpedido, item)
                  .subscribe();
              }
            }
          }
        )
    );
  }

  ngOnInit() {

    this.getDados();
  }

  getDados() {
    this.apiService.get('pedidos/timeline', this.apiService.tratarFilter(this.filtros)).subscribe(resp => {
      this.scrumboard = resp.dados;
    });
  }

  drop(item, pedido) {
    if (item.filtro === pedido.etapa) {
      return;
    }
    let findIndex;
    this.scrumboard.forEach(val => {
      findIndex = val.dados.indexOf(pedido);
      if (findIndex >= 0) {
        val.dados.splice(findIndex, 1);
      }
    });
    pedido.etapa = item.filtro;
    this.apiService.change('pedidos', pedido.idpedido, pedido).subscribe();
    item.dados.push(pedido);
  }

  dragStart(pedido) {
    this.dragActive = pedido;
  }

  log() {
    console.log(arguments);
  }

  adicionar(item) {
    this.setPedido({idetapa: item.idetapa});
  }

  excluirPedido(idpedido) {
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
}
