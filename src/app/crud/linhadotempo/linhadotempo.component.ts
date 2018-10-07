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
    this.apiService.get('pedidos').subscribe(resp => {
      this.cards = resp.dados;
      this.scrumboard = [
        {
          header: 'A Fazer',
          filtro: 'A',
          dados: this.apiService.getByReference(this.cards, 'etapa', 'A')
        },
        {
          header: 'Na Cozinha',
          filtro: 'I',
          dados: this.apiService.getByReference(this.cards, 'etapa', 'I')
        },
        {
          header: 'Pronto',
          filtro: 'P',
          dados: this.apiService.getByReference(this.cards, 'etapa', 'P')
        },
        {
          header: 'Entregando',
          filtro: 'E',
          dados: this.apiService.getByReference(this.cards, 'etapa', 'E')
        },
        {
          header: 'Entregue',
          filtro: 'C',
          dados: this.apiService.getByReference(this.cards, 'etapa', 'C')
        }
      ];
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
}
