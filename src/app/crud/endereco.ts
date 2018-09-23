export interface Endereco {
    idendereco: number,
    idpessoa: number,
    idbairro: number,
    idcidade: number,
    endereco: string,
    numero: number,
    complemento: string,
    cep: string[9]
}
