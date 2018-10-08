import { Produto } from './produto';

export interface PedidoItens {
  idpedido_item: number;
  idpedido: number;
  idproduto: number;
  vlrunitario: number;
  quantidade: number;
  vlrtotal: number;
  produto?: Produto;
  desconto: number;
}
