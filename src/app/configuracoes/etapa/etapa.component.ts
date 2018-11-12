import { ApiService } from './../../api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.css']
})
export class EtapaComponent implements OnInit {
  etapaForm: FormGroup;
  status: boolean;
  etapa: any = {
    idetapa: null,
    descricao: '',
    finalizado: false,
    geralancamento: false
  };
  @Input()
  idetapa: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getDados();
    this.etapaForm = this.formBuilder.group({
      idetapa: [this.etapa.idetapa],
      descricao: [this.etapa.descricao, Validators.required],
      finalizado: [this.etapa.finalizado],
      geralancamento: [this.etapa.geralancamento]
    });

  }

  getDados() {
    if (this.idetapa) {
      this.apiService.getId('etapas', this.idetapa).subscribe(resp => {
        this.etapa = resp.dados;
        this.etapaForm.patchValue(this.etapa);
      });
    }
  }

  confirmar() {
    return this.etapaForm.value;
  }

  validaForm() {
    return this.apiService.validaForm(this.etapaForm);
  }
}
