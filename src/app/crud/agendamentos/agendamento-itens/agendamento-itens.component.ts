import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ApiService } from '../../../api/api.service';
import { Produto } from '../../produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agendamento-itens',
  templateUrl: './agendamento-itens.component.html',
  styleUrls: ['./agendamento-itens.component.css']
})
export class AgendamentoItensComponent implements OnInit {
  agendamentoItensForm: FormGroup;
  agendamentoItens: any = {
    idagendamento_item: null,
    idagendamento: null,
    idproduto: null,
    vlrunitario: null,
    quantidade: 1,
    vlrtotal: null,
    desconto: null
  };
  @Input()
  idagendamento_item: number;

  @Input()
  source: any;

  dadosProdutos: Array<Produto>;
  produtos: Array<Produto>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.get('produtos').subscribe(resp => {
      this.produtos = resp.dados;
    });
    this.getDados();

    this.agendamentoItensForm = this.formBuilder.group({
      idagendamento_item: [this.agendamentoItens.idagendamento_item],
      idproduto: [this.agendamentoItens.idproduto, Validators.required],
      produto: [this.agendamentoItens.produto],
      vlrunitario: [this.agendamentoItens.vlrunitario, Validators.required],
      quantidade: [this.agendamentoItens.quantidade || 1],
      vlrtotal: [this.agendamentoItens.vlrtotal],
      desconto: [this.agendamentoItens.desconto]
    });

    this.agendamentoItensForm.get('produto').valueChanges.subscribe(prod => {
      this.agendamentoItensForm.patchValue({ vlrunitario: prod.preco });
    });

    this.agendamentoItensForm
      .get('vlrunitario')
      .valueChanges.subscribe(vlrunitario => {
        this.agendamentoItensForm.patchValue({
          vlrtotal:
            ((this.agendamentoItensForm.get('quantidade').value * vlrunitario) -
            this.agendamentoItensForm.get('desconto').value)
        });
      });

    this.agendamentoItensForm.get('desconto').valueChanges.subscribe(desconto => {
      this.agendamentoItensForm.patchValue({
        vlrtotal:
          ((this.agendamentoItensForm.get('quantidade').value *
            this.agendamentoItensForm.get('vlrunitario').value) -
          desconto)
      });
    });

    this.agendamentoItensForm.get('quantidade').valueChanges.subscribe(value => {
      this.agendamentoItensForm.patchValue({
        vlrtotal:
          ((value * this.agendamentoItensForm.get('vlrunitario').value) -
          this.agendamentoItensForm.get('desconto').value)
      });
    });
  }

  getDados() {
    if (this.source) {
      this.agendamentoItens = this.source;
    } else {
      if (this.idagendamento_item) {
        this.apiService
          .getId('agendamentositens', this.idagendamento_item)
          .subscribe(resp => {
            this.agendamentoItens = resp.dados;
            this.agendamentoItensForm.patchValue(this.agendamentoItens);
          });
      }
    }
  }

  confirmarProprio() {
    return new Observable(observer => {
      observer.next(this.agendamentoItensForm.value);
      observer.complete();
    });
  }

  getProdutos($event = { query: null }) {
    this.dadosProdutos = this.apiService.filter(this.produtos, $event.query);
  }
}
