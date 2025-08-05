export default interface UserProtocol {
  _id: string;
  idDocument: string;
  password: string;

  ativo: boolean;
  clienteSaneago: boolean;
  email: string;
  nome: string;

  contas: {
    _id: string;
    codigoGrupoFaturamento: number;
    codigoRotaCodificacao: number;
    codigoSituacaoLigacaoAgua: number;
    endereco: string;
    isContaMacro: boolean;
    numeroConta: number;
    numeroContaComDigito: string;
    possuiEnderecoAlternativo: boolean;
    situacaoAdesaoFaturaDigital: string;
    categoria: string;
    codigoBairro: number;
    codigoCep: number;
    codigoCidade: number;
    codigoLogradouro: number;
    complementoEndereco: string;
    conta: string;
    dataLigacaoAgua: string;
    dataLigacaoEsgoto: string;
    dataPrimariaAgua: string;
    dataPrimariaEsgoto: string;
    loteImovel: string;
    nomeBairro: string;
    nomeCidade: string;
    nomeLogradouro: string;
    nomeProprietario: string;
    nomeTitular: string;
    numeroImovel: string;
    percentualFaturamentoEsgoto: number;
    quadraImovel: string;
    situacaoLigacaoAgua: string;
    situacaoLigacaoEsgoto: string;
    statusTaxaLixo: string;

    faturas: {
      _id: string;
      anoMesReferencia: number;
      codigoOrigemDebito: number;
      codigoTipoDocumentoFiscal: number;
      consumoMedido: number;
      dataEmissaoDocumentoFiscal: string;
      dataVencimento: string;
      numeroConta: number;
      numeroDocumentoFiscal: number;
      numeroDocumentoFormatado: string;
      podeGerarSegundaVia: boolean;
      quantidadeDiasVencido: number;
      referenciaFormatada: string;
      situacaoDebito: string;
      statusFatura: string;
      valorDebito: number;
    }[];
  }[];

  createdIn: Date;
}
