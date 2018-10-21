export interface Lancamento {
    idlancamento: number;
    idpessoa: number;
    idpedido?: number;
    valor: number;
    datahora: Date;
    pessoa?: any;
    valorpago: number;
    datapagto: Date;
}
