import { Pessoa } from './pessoa';

export interface Pedido {
  idpedido: number;
  idagendamento?: number;
  idpessoa: number;
  idendereco?: number;
  datahora: string;
  valor: number;
  observacoes?: string;
  pessoas?: Pessoa;
  status: string[1];
}
