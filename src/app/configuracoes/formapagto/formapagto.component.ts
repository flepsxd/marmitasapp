import { ApiService } from './../../api/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formapagto',
  templateUrl: './formapagto.component.html',
  styleUrls: ['./formapagto.component.css']
})
export class FormapagtoComponent implements OnInit {
  formapagtoForm: FormGroup;
  status: boolean;
  formapagto: any = {
    idformapagto: null,
    descricao: '',
  };
  @Input()
  idformapagto: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getDados();
    this.formapagtoForm = this.formBuilder.group({
      idformapagto: [this.formapagto.idformapagto],
      descricao: [this.formapagto.descricao, Validators.required]
    });

  }

  getDados() {
    if (this.idformapagto) {
      this.apiService.getId('formapagtos', this.idformapagto).subscribe(resp => {
        this.formapagto = resp.dados;
        this.formapagtoForm.patchValue(this.formapagto);
      });
    }
  }

  confirmar() {
    return this.formapagtoForm.value;
  }

  validaForm() {
    return this.apiService.validaForm(this.formapagtoForm);
  }
}
