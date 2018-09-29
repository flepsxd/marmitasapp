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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.scrumboard = [
      {
        header: 'A Fazer',
        filtro: 'A',
        dados: this.apiService.getByReference('pedidos', 'etapa', 'A')
      },
      {
        header: 'Na Cozinha',
        filtro: 'I',
        dados: this.apiService.getByReference('pedidos', 'etapa', 'I')
      },
      {
        header: 'Pronto',
        filtro: 'P',
        dados: this.apiService.getByReference('pedidos', 'etapa', 'P')
      },
      {
        header: 'Entregando',
        filtro: 'E',
        dados: this.apiService.getByReference('pedidos', 'etapa', 'E')
      },
      {
        header: 'Entregue',
        filtro: 'C',
        dados: this.apiService.getByReference('pedidos', 'etapa', 'C')
      }
    ];
  }

  drop(filtro, pedido, $event){
    pedido.etapa = filtro;
    console.log($event);
  }

  dragStart(pedido, $event){
    this.dragActive = pedido;
    console.log($event);
  }

  dragStop($event){
    console.log($event);
  }

}
