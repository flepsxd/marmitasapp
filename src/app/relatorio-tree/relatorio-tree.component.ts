import { ConfirmationService } from 'primeng/api';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-relatorio-tree',
  templateUrl: './relatorio-tree.component.html',
  styleUrls: ['./relatorio-tree.component.css']
})
export class RelatorioTreeComponent implements OnInit {
  @ViewChild('dt') dt: any;
  @Input()
  columns: any[] = [];
  @Input()
  cad: any;
  @Output()
  aoAtualizar: EventEmitter<any> = new EventEmitter();
  componentRef: ComponentRef<any>;
  @Input() filtros: Array<any> = [];
  @Input() totalizadores: Array<any> = [];
  selecionado: any;
  carregando = false;
  dados: Array<any>;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.dt.filtros = this.filtros;
    this.dt.filtroChange = this.filtroChange;
    this.dt.filtrar = this.carregarDados.bind(this);
    this.carregarDados();
  }

  carregarDados() {
    this.carregando = true;
    this.filtros.forEach(el => {
      if (el.posAtualizar) {
        el.posAtualizar(el.value);
      }
    });
    this.apiService
      .get(this.cad.resource + (this.cad.extraURL || ''), this.apiService.tratarFilter(this.filtros))
      .subscribe(resp => {
        this.dados = this.transform(resp.dados);
        this.carregando = false;
      });
  }

  transform(dado) {
    dado.forEach(element => {
      if (element.children && element.children.length > 0) {
        element.leaf = true;
        element.children = this.transform(element.children);
      }
      element.data = {};
      this.columns.forEach(col => {
        element.data[col.field] = element[col.field];
      });
    });
    return dado;
  }

  filtroChange(filtro, index, value) {
    if (filtro.array) {
      value = value.map((val) => val[filtro.dataKey]);
      if (value.length === 0) {
        value = null;
      }
    }
    filtro.valorFormatado = value;
    if (filtro.aoAtualizar) {
      filtro.aoAtualizar(value);
    }
    this.filtros[index] = filtro;
  }
}
