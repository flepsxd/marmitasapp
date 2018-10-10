import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { FormGroup } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  @Input()
  endereco: FormGroup;
  dadosCidades: Array<any>;
  cidades: Array<any>;
  dadosBairros: Array<any>;
  bairros: Array<any>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get('cidades').subscribe(resp => {
      this.cidades = resp.dados;
    });
    this.apiService.get('bairros').subscribe(resp => {
      this.bairros = resp.dados;
    });
    this.endereco.get('cidade').valueChanges.subscribe(val => {
      if (typeof val !== 'object') {
        this.endereco.get('idcidade').patchValue(null);
      }
    });
    this.endereco.get('bairro').valueChanges.subscribe(val => {
      if (typeof val !== 'object') {
        this.endereco.get('idbairro').patchValue(null);
      }
    });
  }

  getCidades($event = { query: null }) {
    this.dadosCidades = this.apiService.filter(this.cidades, $event.query);
  }

  getBairros($event = { query: null }) {
    this.dadosBairros = this.apiService.filter(this.bairros, $event.query);
  }
}
