import { ApiService } from './../../../api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  status: boolean;
  dadosCidades: Array<any>;
  cidades: Array<any>;
  bairros: Array<any>;
  dadosBairros: Array<any>;
  usuario: any = {
    nome: '',
    email: '',
    status: 'A'
  };
  @Input()
  id: number;
  @Input() source: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getDados();
    this.usuarioForm = this.formBuilder.group({
      id: [this.usuario.id],
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.email, Validators.required],
      senha: [null],
      status: [this.usuario.status, Validators.required],
      statusB: [this.usuario.status === 'A'],
    });

    this.usuarioForm.get('statusB').valueChanges.subscribe(val => {
      this.usuarioForm.patchValue({ status: val ? 'A' : 'I' });
    });

    this.usuarioForm.get('senha').valueChanges.subscribe(val => {
      if(val) {
        this.usuarioForm.get('senha').setValidators(Validators.required);
      } else {
        this.usuarioForm.get('senha').clearValidators();
      }
    })
  }

  getDados() {
    if (this.source) {
      this.usuario = this.source;
    } else  if (this.id) {
      this.apiService.getId('usuarios', this.id).subscribe(resp => {
        this.usuario = resp.dados;
        this.usuarioForm.patchValue(this.usuario);
        this.usuarioForm.patchValue({ statusB: this.usuario.status === 'A' });
      });
    }
  }

  confirmar() {
    return this.usuarioForm.value;
  }

  validaForm() {
    return this.apiService.validaForm(this.usuarioForm);
  }
}
