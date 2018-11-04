import { Pessoa } from './pessoa';

export interface Agendamento {
  idagendamento?: number;
  idpessoa: number;
  hora: string;
  previsao: string;
  valor: number;
  observacoes?: string;
  pessoa?: Pessoa;
  agendamento_itens?: Array<any>;
}
