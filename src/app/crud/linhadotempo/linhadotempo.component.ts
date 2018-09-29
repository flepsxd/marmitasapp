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

  drop(item, pedido){
    if(item.filtro == pedido.etapa) return;
    
    this.scrumboard.forEach((val)=>{
        var findIndex = val.dados.indexOf(pedido);
        if(findIndex >= 0) {
          val.dados.splice(findIndex, 1);
        }
    });
    pedido.etapa = item.filtro;
    item.dados.push(pedido);

  }

  dragStart(pedido){
    this.dragActive = pedido;
  }

}
