import { ApiService } from './../../api/api.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  columns: Array<{}> = [];
  cad: any;
  filtros: Array<any> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.filtros = [
      {
        key: 'status',
        title: 'Status',
        type: 'toggle',
        verdadeiro: 'Ativo',
        falso: 'Inativo',
        valorVerdadeiro: 'A',
        valorFalso: 'I'
      }
    ];
    this.cad = {
      component: UsuarioComponent,
      chave: 'id',
      resource: 'usuarios',
      header: 'Cadastro de Usuários'
    };
    this.columns = [
      {
        header: 'Nome',
        field: 'nome'
      },
      {
        header: 'E-mail',
        field: 'email'
      },
      {
        header: 'Status',
        field: 'status_formatado'
      }
    ];
  }
}
