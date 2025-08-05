export const maxDuration = 300;

import { headers as nextHeaders } from 'next/headers';
import { userAgent as userAgentNext } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

import { SHA1 } from 'crypto-js';

import decryptData from '@/actions/decryptData';
// import puppeteerConfig from '@/config/puppeteerConfig';
import createUser from '@/db/actions/user/createUser';
import ScrapeError from '@/errors/scrapeError';
import UserProtocol from '@/interfaces/userProtocol';
import validationCPF from '@/services/validationCPF';

interface BodyParams {
  idDocument?: string;
  password?: string;
}

export async function POST(req: NextRequest) {
  const headers = await nextHeaders();
  const realUserAgent = userAgentNext({ headers }).ua;
  // const { page, browser } = await puppeteerConfig({ userAgent: realUserAgent });

  try {
    const authorization = req.headers.get('authorization') ?? '';
    const isAuthorized = await decryptData(authorization);
    if (!isAuthorized) {
      throw new ScrapeError('Você não tem esse poder comédia', 401);
    }

    const body: BodyParams = await req.json();
    if (!body.idDocument || !body.password) {
      throw new ScrapeError('Parâmetros de requisição inválidos', 400);
    }
    console.log(body);
    let newBody = {
      idDocument: body.idDocument.replace(/\D/g, ''),
      password: SHA1(body.password).toString(),
    };
    const clientType = validationCPF(newBody.idDocument) ? 'F' : 'J';

    const formData = new URLSearchParams();
    formData.append('username', newBody.idDocument);
    formData.append('password', newBody.password);
    formData.append('client_id', 'api-agencia');
    formData.append('grant_type', 'password');

    const resAuth = await fetch(
      'https://sso.saneago.com.br/realms/agencia/protocol/openid-connect/token',
      {
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'user-agent': realUserAgent,
        },
        body: formData.toString(),
      }
    );
    if (!resAuth.ok) {
      // throw new ScrapeError(
      //   'Ocorreu um erro desconhecido tente novamente mais tarde.',
      //   401
      // );
      throw new ScrapeError(
        'Ocorreu um erro, revise CPF/CNPJ ou SENHA para tentar novamente.',
        401
      );
    }
    const dataAuth = await resAuth.json();
    const accessToken = dataAuth.access_token;

    const resUser = await fetch(
      `https://usuario-agencia-virtual.saneago.com.br/esi-usuario-agencia-virtual/servicos/atendimentos/usuarios/F/${newBody.idDocument}`,
      { method: 'get', headers: { 'user-agent': realUserAgent } }
    );
    if (!resUser.ok) {
      throw new ScrapeError(
        'Ocorreu um erro, por favor tentar novamente.',
        401
      );
    }
    const dataUser = await resUser.json();

    const resAccounts = await fetch(
      `https://api.saneago.com.br/eco-faturamento/servicos/rotas-agencia-virtual/titularidades/contas?cpfCnpj=${newBody.idDocument}&tipoCliente=${clientType}`,
      {
        method: 'get',
        headers: {
          authorization: `Bearer ${accessToken}`,
          'user-agent': realUserAgent,
          'application-origin': 'AgenciaVirtual',
        },
      }
    );
    if (!resAccounts.ok) {
      throw new ScrapeError(
        'Ocorreu um erro, por favor tentar novamente.',
        401
      );
    }
    let dataAccounts = await resAccounts.json();
    dataAccounts = dataAccounts.listaResultados.map((item: any) => ({
      numeroConta: item.numeroConta,
      numeroContaComDigito: item.numeroContaComDigito,
    }));

    dataAccounts = await Promise.all(
      dataAccounts.map(async (item: any) => {
        const resAccount = await fetch(
          `https://atendimento.saneago.com.br/eco-atendimento/servicos/rotas-agencia-virtual/atendimentos/contas/${item.numeroConta}`,
          {
            method: 'get',
            headers: {
              authorization: `Bearer ${accessToken}`,
              'user-agent': realUserAgent,
              'application-origin': 'AgenciaVirtual',
            },
          }
        );
        const dataAccount = await resAccount.json();

        const resInvoices = await fetch(
          `https://api.saneago.com.br/eco-faturamento/servicos/rotas-agencia-virtual/faturamentos/faturas?numeroContaComDigito=${item.numeroContaComDigito}&cpfCnpj=${newBody.idDocument}&tipoCliente=${clientType}&quantidadeMeses=6`,
          {
            method: 'get',
            headers: {
              authorization: `Bearer ${accessToken}`,
              'user-agent': realUserAgent,
              'application-origin': 'AgenciaVirtual',
            },
          }
        );
        let dataInvoices = await resInvoices.json();
        dataInvoices = dataInvoices.listaResultados;
        dataInvoices = dataInvoices.map((item: any) => ({
          anoMesReferencia: item.anoMesReferencia,
          codigoOrigemDebito: item.codigoOrigemDebito,
          codigoTipoDocumentoFiscal: item.codigoTipoDocumentoFiscal,
          consumoMedido: item.consumoMedido,
          dataEmissaoDocumentoFiscal: item.dataEmissaoDocumentoFiscal,
          dataVencimento: item.dataVencimento,
          numeroConta: item.numeroConta,
          numeroDocumentoFiscal: item.numeroDocumentoFiscal,
          numeroDocumentoFormatado: item.numeroDocumentoFormatado,
          podeGerarSegundaVia: item.podeGerarSegundaVia,
          quantidadeDiasVencido: item.quantidadeDiasVencido,
          referenciaFormatada: item.referenciaFormatada,
          situacaoDebito: item.situacaoDebito,
          statusFatura: item.statusFatura,
          valorDebito: item.valorDebito,
        }));

        return {
          ...item,
          codigoGrupoFaturamento: dataAccount.codigoGrupoFaturamento,
          codigoRotaCodificacao: dataAccount.codigoRotaCodificacao,
          codigoSituacaoLigacaoAgua: dataAccount.codigoSituacaoLigacaoAgua,
          endereco: dataAccount.endereco,
          isContaMacro: dataAccount.isContaMacro,
          possuiEnderecoAlternativo: dataAccount.possuiEnderecoAlternativo,
          situacaoAdesaoFaturaDigital: dataAccount.situacaoAdesaoFaturaDigital,
          categoria: dataAccount.categoria,
          codigoBairro: dataAccount.codigoBairro,
          codigoCep: dataAccount.codigoCep,
          codigoCidade: dataAccount.codigoCidade,
          codigoLogradouro: dataAccount.codigoLogradouro,
          complementoEndereco: dataAccount.complementoEndereco,
          conta: dataAccount.conta,
          dataLigacaoAgua: dataAccount.dataLigacaoAgua,
          dataLigacaoEsgoto: dataAccount.dataLigacaoEsgoto,
          dataPrimariaAgua: dataAccount.dataPrimariaAgua,
          dataPrimariaEsgoto: dataAccount.dataPrimariaEsgoto,
          loteImovel: dataAccount.loteImovel,
          nomeBairro: dataAccount.nomeBairro,
          nomeCidade: dataAccount.nomeCidade,
          nomeLogradouro: dataAccount.nomeLogradouro,
          nomeProprietario: dataAccount.nomeProprietario,
          nomeTitular: dataAccount.nomeTitular,
          numeroImovel: dataAccount.numeroImovel,
          percentualFaturamentoEsgoto: dataAccount.percentualFaturamentoEsgoto,
          quadraImovel: dataAccount.quadraImovel,
          situacaoLigacaoAgua: dataAccount.situacaoLigacaoAgua,
          situacaoLigacaoEsgoto: dataAccount.situacaoLigacaoEsgoto,
          statusTaxaLixo: dataAccount.statusTaxaLixo,

          faturas: dataInvoices,
        };
      })
    );

    const data: Omit<UserProtocol, '_id' | 'createdIn'> = {
      idDocument: body.idDocument,
      password: body.password,
      ativo: dataUser.ativo,
      clienteSaneago: dataUser.clienteSaneago,
      email: dataUser.email,
      nome: dataUser.nome,
      contas: dataAccounts,
    };

    const userId = await createUser(data);

    return NextResponse.json({
      success: true,
      userId,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ScrapeError) {
      return NextResponse.json(
        {
          success: false,
          error: { message: err.message },
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Erro ao fazer a consulta, por favor tente novamente.',
        },
      },
      { status: 400 }
    );
  } finally {
    // await browser.close();
  }
}
