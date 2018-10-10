import { Pessoa } from './pessoa';
import { Endereco } from './endereco';
import { PedidoItens } from './pedido-itens';

export interface Pedido {
  idpedido: number;
  idagendamento?: number;
  idpessoa: number;
  idendereco?: number;
  datahora: string;
  previsao: string;
  valor: number;
  observacoes?: string;
  pessoas?: Pessoa;
  endereco?: Endereco;
  pedidos_itens?: Array<PedidoItens>;
  status: string[1];
}
