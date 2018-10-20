import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { Pessoa } from '../crud/pessoa';
import { Lancamento } from '../crud/lancamento';
import { Pedido } from '../crud/pedido';
import { Produto } from '../crud/produto';
import { Endereco } from '../crud/endereco';
import { PedidoItens } from '../crud/pedido-itens';

import * as moment from 'moment';
import { formatCurrency } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { tap } from '../../../node_modules/rxjs/operators';

@Injectable()
export class ApiService {
  public pessoas: Array<Pessoa>;
  public lancamentos: Array<Lancamento>;
  public pedidos: Array<Pedido>;
  public produtos: Array<Produto>;
  public enderecos: Array<Endereco>;
  public pedido_itens: Array<PedidoItens>;
  private API_URL = 'http://marmitasapi.com';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private http: HttpClient
  ) {}

  public get(rota, extra?): Observable<any> {
    return this.http
      .get(`${this.API_URL}/${rota}`, this.getParams(extra))
      .pipe(response => response);
  }

  public getId(rota, id, extra?): Observable<any> {
    return this.http
      .get(`${this.API_URL}/${rota}/${id}`, this.getParams(extra))
      .pipe(response => response);
  }

  public add(rota, objeto): Observable<any> {
    return this.http
      .post(`${this.API_URL}/${rota}`, objeto, this.getParams())
      .pipe(response => response);
  }

  public change(rota, id, objeto): Observable<any> {
    return this.http
      .put(`${this.API_URL}/${rota}/${id}`, objeto, this.getParams())
      .pipe(response => response);
  }

  public getParams(extra = { token: '' }) {
    const token = localStorage.getItem('token');
    if (token) {
      extra.token = token;
    }
    const params = new HttpParams({
      fromObject: extra
    });
    const httpOptions = this.httpOptions;
    return {
      params: params,
      httpOptions
    };
  }

  public filter(reference, val, filtro = null) {
    const ref = typeof reference === 'string' ? this[reference] : reference;
    return (ref || []).filter(ele => {
      let filtered = false;
      if (filtro) {
        filtered = filtro(ele);
      } else {
        Object.keys(ele).forEach(key => {
          if (ele[key] && !filtered) {
            filtered = (ele[key] + '').toLowerCase().includes(val);
          }
        });
      }
      return filtered;
    });
  }
  public filterAtivo(reference, val, ativo = true) {
    const ref = typeof reference === 'string' ? this[reference] : reference;
    const refAtivo = (ref || []).filter(e => {
      return e.status === 'A' ? ativo : !ativo;
    });
    if (val) {
      return this.filter(refAtivo, val.toLowerCase());
    } else {
      return refAtivo;
    }
  }

  public getById(model, reference, val, only = true) {
    const ref = typeof model === 'string' ? this[model] : model;
    const get = (ref || []).filter(ele => {
      return ele[reference] === val;
    });
    return only ? get[0] : get;
  }

  public getByReference(model, reference, val) {
    return this.getById(model, reference, val, false);
  }

  public currencyFormat(val) {
    return formatCurrency(val, 'PT', 'R$');
  }

  public aoSelecionar(form, reference, geral, val) {
    const obj = {};
    obj[reference] = val[reference];
    obj[geral] = val;
    form.patchValue(obj);
  }

  public confirmDialog(instance, cad) {
    if (instance.confirmarProprio) {
      return instance.confirmarProprio();
    } else if (instance.confirmar) {
      const dados = instance.confirmar();
      let obs;
      if (dados[cad.chave]) {
        obs = this.change.bind(this, cad.resource, dados[cad.chave], dados);
      } else {
        obs = this.add.bind(this, cad.resource, dados);
      }
      return obs();
    } else {
      throw Error('Não foi criado objeto de retorno confirmar no componente');
    }
  }

  public tratarFilter(filtros) {
    const paraFiltrar = {};
    const newFiltros = filtros.filter((val) => typeof val.valorFormatado !== 'undefined');
    if (newFiltros.length > 0) {
      newFiltros.forEach(filtro => {
        if (filtro.valorFormatado) {
          paraFiltrar[filtro.key] = filtro.valorFormatado;
        }
      });
      return {
        filter: JSON.stringify(paraFiltrar)
      };
    } else {
      return paraFiltrar;
    }
  }

  public parseDate(date) {
    return moment(date).toDate();
  }

  public dateToJSON(data) {
    return moment(data).format();
  }

}
