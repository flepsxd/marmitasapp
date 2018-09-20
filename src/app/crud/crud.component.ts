import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  @ViewChild("dialogContainer", { read: ViewContainerRef}) container;
  @Input() columns: any[] = [];
  @Input() config: Object = {};
  @Input() cad: any;
  exibirDialog: boolean = false;
  selecionado: any;

  @Output('getDados') getDados: EventEmitter<any> = new EventEmitter();
  @Output('editDados') editDados: EventEmitter<any> = new EventEmitter();
  @Output('incDados') incDados: EventEmitter<any> = new EventEmitter();
  @Output('deleteDados') deleteDados: EventEmitter<any> = new EventEmitter();
  _dados:any[] = [];
  

  @Input() get dados(): any[] {
    return this._dados;
  }
  set dados(val: any[]) {
    this._dados = val;
  }

  constructor(private resolver: ComponentFactoryResolver) { 
  }

  onRowSelect($event){
    this.container.clear(); 
    const factory: ComponentFactory = this.resolver.resolveComponentFactory(this.cad);
    this.componentRef = this.container.createComponent(factory);
    this.exibirDialog = true;
  }

  ngOnInit(){
    
  }

}
