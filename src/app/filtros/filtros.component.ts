import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {
  @Input() dados: any = [];
  @Input() searchDesabilitado = false;
  @Output() search: EventEmitter<any>  = new EventEmitter();
  @Output() alterarFiltro: EventEmitter<any>  = new EventEmitter();
  @Output() filtrar: EventEmitter<any>  = new EventEmitter();
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  pesquisar(value) {
    this.search.emit(value);
  }

  filtroChange(filtro, index, valor) {
    this.alterarFiltro.emit({
      filtro: filtro,
      index: index,
      valor: valor
    });
  }

  fnFiltrar() {
    this.filtrar.emit();
  }

  dateToJSON(value) {
    return this.apiService.dateToJSON(value);
  };

}
