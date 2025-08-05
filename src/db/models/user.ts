import { Schema, model, models, type Document, Model } from 'mongoose';

import UserProtocol from '@/interfaces/userProtocol';

export interface UserDocumentProtocol
  extends Omit<UserProtocol, '_id'>,
    Document {}

const usersSchema = new Schema<UserDocumentProtocol>({
  idDocument: { type: String, required: true, default: '' },
  password: { type: String, required: true, default: '' },
  ativo: { type: Boolean, required: true, default: false },
  clienteSaneago: { type: Boolean, required: true, default: false },
  email: { type: String, required: true, default: '' },
  nome: { type: String, required: true, default: '' },

  contas: [
    {
      codigoGrupoFaturamento: { type: Number, required: false, default: 0 },
      codigoRotaCodificacao: { type: Number, required: false, default: 0 },
      codigoSituacaoLigacaoAgua: { type: Number, required: false, default: 0 },
      endereco: { type: String, required: false, default: '' },
      isContaMacro: { type: Boolean, required: false, default: false },
      numeroConta: { type: Number, required: false, default: 0 },
      numeroContaComDigito: { type: String, required: false, default: '' },
      possuiEnderecoAlternativo: {
        type: Boolean,
        required: false,
        default: false,
      },
      situacaoAdesaoFaturaDigital: {
        type: String,
        required: false,
        default: '',
      },
      categoria: { type: String, required: false, default: '' },
      codigoBairro: { type: Number, required: false, default: 0 },
      codigoCep: { type: Number, required: false, default: 0 },
      codigoCidade: { type: Number, required: false, default: 0 },
      codigoLogradouro: { type: Number, required: false, default: 0 },
      complementoEndereco: { type: String, required: false, default: '' },
      conta: { type: String, required: false, default: '' },
      dataLigacaoAgua: { type: String, required: false, default: '' },
      dataLigacaoEsgoto: { type: String, required: false, default: '' },
      dataPrimariaAgua: { type: String, required: false, default: '' },
      dataPrimariaEsgoto: { type: String, required: false, default: '' },
      loteImovel: { type: String, required: false, default: '' },
      nomeBairro: { type: String, required: false, default: '' },
      nomeCidade: { type: String, required: false, default: '' },
      nomeLogradouro: { type: String, required: false, default: '' },
      nomeProprietario: { type: String, required: false, default: '' },
      nomeTitular: { type: String, required: false, default: '' },
      numeroImovel: { type: String, required: false, default: '' },
      percentualFaturamentoEsgoto: {
        type: Number,
        required: false,
        default: 0,
      },
      quadraImovel: { type: String, required: false, default: '' },
      situacaoLigacaoAgua: { type: String, required: false, default: '' },
      situacaoLigacaoEsgoto: { type: String, required: false, default: '' },
      statusTaxaLixo: { type: String, required: false, default: '' },

      faturas: [
        {
          anoMesReferencia: { type: Number, required: false, default: 0 },
          codigoOrigemDebito: { type: Number, required: false, default: 0 },
          codigoTipoDocumentoFiscal: {
            type: Number,
            required: false,
            default: 0,
          },
          consumoMedido: { type: Number, required: false, default: 0 },
          dataEmissaoDocumentoFiscal: {
            type: String,
            required: false,
            default: '',
          },
          dataVencimento: { type: String, required: false, default: '' },
          numeroConta: { type: Number, required: false, default: 0 },
          numeroDocumentoFiscal: { type: Number, required: false, default: 0 },
          numeroDocumentoFormatado: {
            type: String,
            required: false,
            default: '',
          },
          podeGerarSegundaVia: {
            type: Boolean,
            required: false,
            default: false,
          },
          quantidadeDiasVencido: { type: Number, required: false, default: 0 },
          referenciaFormatada: { type: String, required: false, default: '' },
          situacaoDebito: { type: String, required: false, default: '' },
          statusFatura: { type: String, required: false, default: '' },
          valorDebito: { type: Number, required: false, default: 0 },
        },
      ],
    },
  ],
  createdIn: {
    type: Date,
    required: false,
    default: Date.now,
    index: { expires: '24h' },
  },
});

const usersModel: Model<UserDocumentProtocol> =
  models.SaneagoUsers ||
  model<UserDocumentProtocol>('SaneagoUsers', usersSchema);

export default usersModel;
