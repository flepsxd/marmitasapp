import { Pessoa } from './pessoa';
import { Endereco } from './endereco';
import { PedidoItens } from './pedido-itens';

export interface Pedido {
  idpedido: number;
  idagendamento?: number;
  idpessoa: number;
  idendereco?: number;
  idformapagto: number;
  datahora: string;
  previsao: string;
  valor: number;
  observacoes?: string;
  pessoa?: Pessoa;
  endereco?: Endereco;
  pedidos_itens?: Array<PedidoItens>;
  status: string[1];
}
