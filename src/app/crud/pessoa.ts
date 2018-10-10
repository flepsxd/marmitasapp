import { Endereco } from './endereco';

export interface Pessoa {
  idpessoa: number;
  nome: string;
  telefone: number;
  email?: string;
  status: string[1];
  idendereco?: number;
  endereco?: Endereco;
}
