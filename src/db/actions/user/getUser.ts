'use server';

import { FilterQuery } from 'mongoose';

import usersModel, { UserDocumentProtocol } from '@/db/models/user';
import UserProtocol from '@/interfaces/userProtocol';

import connectDb from '../../connect';

interface Props {
  query: FilterQuery<UserDocumentProtocol>;
}

export default async function getUser({ query }: Props) {
  try {
    await connectDb();
    const res = await usersModel.findOne(query).sort({
      createdIn: -1,
    });
    if (!res) throw new Error('Usuário não encontrado');
    const data: UserProtocol = {
      _id: String(res._id),
      idDocument: res.idDocument,
      password: res.password,
      ativo: res.ativo,
      clienteSaneago: res.clienteSaneago,
      email: res.email,
      nome: res.nome,
      contas: res.contas.map(itemAccount => ({
        _id: String(itemAccount._id),
        codigoGrupoFaturamento: itemAccount.codigoGrupoFaturamento,
        codigoRotaCodificacao: itemAccount.codigoRotaCodificacao,
        codigoSituacaoLigacaoAgua: itemAccount.codigoSituacaoLigacaoAgua,
        endereco: itemAccount.endereco,
        isContaMacro: itemAccount.isContaMacro,
        numeroConta: itemAccount.numeroConta,
        numeroContaComDigito: itemAccount.numeroContaComDigito,
        possuiEnderecoAlternativo: itemAccount.possuiEnderecoAlternativo,
        situacaoAdesaoFaturaDigital: itemAccount.situacaoAdesaoFaturaDigital,
        categoria: itemAccount.categoria,
        codigoBairro: itemAccount.codigoBairro,
        codigoCep: itemAccount.codigoCep,
        codigoCidade: itemAccount.codigoCidade,
        codigoLogradouro: itemAccount.codigoLogradouro,
        complementoEndereco: itemAccount.complementoEndereco,
        conta: itemAccount.conta,
        dataLigacaoAgua: itemAccount.dataLigacaoAgua,
        dataLigacaoEsgoto: itemAccount.dataLigacaoEsgoto,
        dataPrimariaAgua: itemAccount.dataPrimariaAgua,
        dataPrimariaEsgoto: itemAccount.dataPrimariaEsgoto,
        loteImovel: itemAccount.loteImovel,
        nomeBairro: itemAccount.nomeBairro,
        nomeCidade: itemAccount.nomeCidade,
        nomeLogradouro: itemAccount.nomeLogradouro,
        nomeProprietario: itemAccount.nomeProprietario,
        nomeTitular: itemAccount.nomeTitular,
        numeroImovel: itemAccount.numeroImovel,
        percentualFaturamentoEsgoto: itemAccount.percentualFaturamentoEsgoto,
        quadraImovel: itemAccount.quadraImovel,
        situacaoLigacaoAgua: itemAccount.situacaoLigacaoAgua,
        situacaoLigacaoEsgoto: itemAccount.situacaoLigacaoEsgoto,
        statusTaxaLixo: itemAccount.statusTaxaLixo,

        faturas: itemAccount.faturas.map(itemInvoices => ({
          _id: String(itemInvoices._id),
          anoMesReferencia: itemInvoices.anoMesReferencia,
          codigoOrigemDebito: itemInvoices.codigoOrigemDebito,
          codigoTipoDocumentoFiscal: itemInvoices.codigoTipoDocumentoFiscal,
          consumoMedido: itemInvoices.consumoMedido,
          dataEmissaoDocumentoFiscal: itemInvoices.dataEmissaoDocumentoFiscal,
          dataVencimento: itemInvoices.dataVencimento,
          numeroConta: itemInvoices.numeroConta,
          numeroDocumentoFiscal: itemInvoices.numeroDocumentoFiscal,
          numeroDocumentoFormatado: itemInvoices.numeroDocumentoFormatado,
          podeGerarSegundaVia: itemInvoices.podeGerarSegundaVia,
          quantidadeDiasVencido: itemInvoices.quantidadeDiasVencido,
          referenciaFormatada: itemInvoices.referenciaFormatada,
          situacaoDebito: itemInvoices.situacaoDebito,
          statusFatura: itemInvoices.statusFatura,
          valorDebito: itemInvoices.valorDebito,
        })),
      })),
      createdIn: res.createdIn,
    };
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
