import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../../node_modules/@angular/forms';
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
  @Input()
  idproduto: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getDados();
    this.produtoForm = this.formBuilder.group({
      idproduto: [this.produto.idproduto],
      descricao: [this.produto.descricao, Validators.required],
      preco: [this.produto.preco],
      status: [this.produto.status, Validators.required],
      statusB: [this.produto.status === 'A']
    });

    this.produtoForm.get('statusB').valueChanges.subscribe(val => {
      this.produtoForm.patchValue({ status: val ? 'A' : 'I' });
    });
  }

  getDados() {
    if (this.idproduto) {
      this.apiService.getId('produtos', this.idproduto).subscribe(resp => {
        this.produto = resp.dados;
        this.produtoForm.patchValue(this.produto);
        this.produtoForm.patchValue({ statusB: this.produto.status === 'A' });
      });
    }
  }

  confirmar() {
    return this.produtoForm.value;
  }
}
