export interface Pedido {
    idpedido: number,
    idagendamento: number,
    idpessoa: number,
    idendereco: number,
    datahora: Date,
    etapa: string[1],
    valor: number,
    observacoes: string,
    status: string[1]
}
