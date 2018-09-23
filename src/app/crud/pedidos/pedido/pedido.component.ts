import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { Pedido } from '../../pedido';
import { Pessoa } from '../../pessoa';
import { PedidoItens } from '../../pedido-itens';
import { PedidoItensComponent } from '../pedido-itens/pedido-itens.component';

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

  colsPedidosItens: Array<any> = [
    {
      header: 'Produto',
      field: 'idproduto',
      fn: function (dados){
        return this.apiService.produtos.filter((val)=>val.idpedido = dados.idpedido)[0].descricao;
      }
    },
    {
      header: 'Valor Unitário',
      field: 'vlrunitario',
      fn: this.apiService.currencyFormat
    },
    {
      header: 'Quantdiade',
      field: 'quantidade',
    },
    {
      header: 'Valor Total',
      field: 'vlrtotal',
      fn: this.apiService.currencyFormat
    },
    {
      header: 'Desconto',
      field: 'desconto',
      fn: this.apiService.currencyFormat
    }
  ]
  dadosPedidosItens: Array<PedidoItens>;
  cadPedidoItem: Object;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { 
    
  }

  ngOnInit() {
    this.cadPedidoItem = {
      component: PedidoItensComponent,
    chave: 'idpedido_item'
    }
    this.getPessoas();
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
      this.pedido = this.apiService.getById('pedido', 'idpedido', this.idpedido);
      this.dadosPedidosItens = this.apiService.getById('pedido_itens', 'idpedido', this.idpedido, false);
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

  getPessoas($event = {query: null}) {
    this.dadosPessoas = this.apiService.filterAtivo('pessoas', $event.query);
  }
}
