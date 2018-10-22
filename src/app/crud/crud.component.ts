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
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  @ViewChild('dialogContainer', { read: ViewContainerRef })
  container;
  @ViewChild('dt') dt: any;
  @Input()
  columns: any[] = [];
  @Input()
  config: Object = {};
  @Input()
  cad: any;
  @Input()
  source?: Array<any>;
  @Output()
  aoAtualizar: EventEmitter<any> = new EventEmitter();
  componentRef: ComponentRef<any>;
  @Input() filtros: Array<any> = [];
  exibirDialog: any = false;
  submit = false;
  selecionado: any;
  dados: Array<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private apiService: ApiService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.dt.filtros = this.filtros;
    this.dt.filtroChange = this.filtroChange;
    this.dt.editar = this.editar.bind(this);
    this.dt.remover = this.remover.bind(this);
    this.dt.filtrar = this.carregarDados.bind(this);
    this.carregarDados();
  }

  carregarDados() {
    if (this.source) {
      this.dados = this.source;
    } else {
      this.apiService
        .get(this.cad.resource + (this.cad.extraURL || ''), this.apiService.tratarFilter(this.filtros))
        .subscribe(resp => {
          this.dados = resp.dados;
        });
    }
  }

  editar(dados) {
    this.selecionado = dados;
    this.container.clear();
    const factory: ComponentFactory<
      any
    > = this.resolver.resolveComponentFactory(this.cad.component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance[this.cad.chave] = this.selecionado[
      this.cad.chave
    ];
    if (
      this.source &&
      JSON.stringify(this.selecionado).toLowerCase() !==
        JSON.stringify({}).toLowerCase()
    ) {
      this.componentRef.instance.source = this.selecionado;
    }
    this.exibirDialog = true;
  }

  remover(dados) {
    this.confirmationService.confirm({
      message: 'Deseja remover esse registro?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.apiService.delete(this.cad.resource, dados[this.cad.chave]).subscribe(() => this.carregarDados());
      }
    });
  }

  salvar() {
    this.submit = true;
    this.apiService
      .confirmDialog(this.componentRef.instance, this.cad)
      .subscribe(obj => {
        this.submit = false;
        if (this.source) {
          if (this.selecionado[this.cad.chave] || !this.selecionado.novo) {
            this.source[this.source.indexOf(this.selecionado)] = obj;
          } else {
            this.selecionado.novo = false;
            this.source.push(obj);
          }
        }
        this.ngOnInit();
        this.exibirDialog = false;
        if (this.aoAtualizar) {
          this.aoAtualizar.emit(true);
        }
      }, error => {this.submit = false;});
  }

  cancelar() {
    this.exibirDialog = false;
  }

  dialogoAdd() {
    this.selecionado = { novo: true };
    this.editar(this.selecionado);
  }

  filtroChange(filtro, index, value) {
    if (filtro.array) {
      value = value.map((val) => val[filtro.dataKey]);
    }
    filtro.valorFormatado = value;
    this.filtros[index] = filtro;
    console.log(this.filtros);
  }
}
