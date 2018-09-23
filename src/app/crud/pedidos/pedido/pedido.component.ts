import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { Pedido } from '../../pedido';
import { Pessoa } from '../../pessoa';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidoForm: FormGroup;
  status: boolean;
  pedido: Pedido = {
    idpedido: null,
    idagendamento: null,
    idpessoa: null,
    idendereco: null,
    datahora: new Date,
    valor: null,
    observacoes: '',
    etapa: 'T',
    status: 'A'
  };
  @Input() idpedido: number;

  dadosPessoas: Array<Pessoa>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { 
    
  }

  ngOnInit() {
    this.dadosPessoas = this.apiService.pessoas;

    this.getDados();
    this.pedidoForm = this.formBuilder.group({
      idpessoa: [this.pedido.idpessoa, Validators.required],
      datahora: [this.pedido.datahora],
      etapa: [this.pedido.etapa, Validators.required],
      valor: [this.pedido.valor, Validators.required],
      observacoes: [this.pedido.observacoes, Validators.required],
      statusB: [this.pedido.status == 'A' ? true : false],
      status: [this.pedido.status, Validators.required]
    });
  }

  getDados(){
    if (this.idpedido) {
      let pedidos = [...this.apiService.pedidos];
      this.pedido = pedidos.filter((val)=>val.idpedido == this.idpedido)[0];
    }
  }

  confirmar() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  cancelar() {
    return new Promise((resolve, reject) => {
      reject(true);
    })
  }

  alteraStatus(){
    this.pedidoForm.patchValue({status: this.pedidoForm.get('statusB').value ? 'A' : 'F'});
  }

  getPessoas($event) {
    if($event.query){
      this.dadosPessoas = this.apiService.filter('pessoas', $event.query);
    } else {
      this.dadosPessoas = this.apiService.pessoas;
    }
  }
}
