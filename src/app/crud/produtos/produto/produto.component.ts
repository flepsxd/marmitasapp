import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { ApiService } from '../../../api/api.service';
import { Produto } from '../../produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  status: boolean;
  produto: Produto = {
    idproduto: null,
    descricao: '',
    preco: null,
    status: 'A'
  };
  @Input() idproduto: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { 
    
  }

  ngOnInit() {
    this.getDados();
    this.produtoForm = this.formBuilder.group({
      descricao: [this.produto.descricao, Validators.required],
      preco: [this.produto.preco],
      status: [this.produto.status, Validators.required],
      statusB: [this.produto.status == 'A' ? true : false]
    });
  }

  getDados(){
    if (this.idproduto) {
      let produtos = [...this.apiService.produtos];
      this.produto = produtos.filter((val)=>val.idproduto == this.idproduto)[0];
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
    this.produtoForm.patchValue({status: this.produtoForm.get('statusB').value ? 'A' : 'F'});
  }
}
