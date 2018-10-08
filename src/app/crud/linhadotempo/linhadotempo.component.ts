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

  subs = new Subscription();

  constructor(
    private apiService: ApiService,
    private dragulaService: DragulaService
  ) {
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
    this.apiService.get('pedidos/timeline').subscribe(resp => {
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
}
