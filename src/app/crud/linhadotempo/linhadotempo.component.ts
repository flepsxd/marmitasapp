import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-linhadotempo',
  templateUrl: './linhadotempo.component.html',
  styleUrls: ['./linhadotempo.component.css']
})
export class LinhadotempoComponent implements OnInit {
  scrumboard: Array<any>;
  cards: Array<Pedido>;
  dragActive: any;

  constructor(private apiService: ApiService) {}

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

  onNodeDrop() {
    console.log(arguments);
  }
}
