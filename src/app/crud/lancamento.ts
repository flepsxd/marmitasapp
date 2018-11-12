export interface Lancamento {
    idlancamento: number;
    idpessoa: number;
    idpedido?: number;
    idformapagto: number;
    valor: number;
    datahora: Date;
    pessoa?: any;
    valorpago: number;
    datapagto: Date;
}
