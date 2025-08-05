'use cliente';

import Image from 'next/image';

import { Dispatch, SetStateAction, useState } from 'react';
import { FaLock } from 'react-icons/fa6';

import { QRCodeCanvas } from 'qrcode.react';

import TransactionError from '@/errors/transactionError';
import TransactionPixProtocol6 from '@/interfaces/transactionPixProtocol6';
import formatPrice from '@/services/formatPrice';
import splitInstallments from '@/services/splitInstallments';
import { useLoadingApplicationContext } from '@/utils/loadingApplicationContext/useContext';
import { useToastContext } from '@/utils/toastContext/useContext';

interface Props {
  value: number;
  setQRCodeInstallments: Dispatch<
    SetStateAction<{ show: boolean; value: number }>
  >;
  client: {
    name: string;
    email: string;
    phone: string;
    document: { number: string; type: 'cpf' };
    digitAccount: string;
    total: number;
    maturity: string;
    street: string;
    neighborhood: string;
    city: string;
  };
}

export default function QRCodePixInstallments({
  setQRCodeInstallments,
  value,
  client,
}: Props) {
  const [qrcode, setQRCode] = useState('');
  const { setToast } = useToastContext();
  const { isLoading, setIsLoading } = useLoadingApplicationContext();
  const [values] = useState(splitInstallments(value));
  const dateNow = new Date().toLocaleDateString('pt-BR', {
    dateStyle: 'short',
  });

  const handleCopy = async () => {
    try {
      if (qrcode) navigator.clipboard.writeText(qrcode);
      setToast({
        open: true,
        severity: 'success',
        message: 'Código PIX copiado!',
      });
    } catch (err) { } // eslint-disable-line
  };

  const handleCloseQRCode = () => {
    setQRCodeInstallments(state => ({ ...state, show: false }));
  };

  const handleCloseQRCodePix = () => {
    setQRCode('');
  };

  const handlePaymentGateway = async (amount: number) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const newBody: TransactionPixProtocol6 = {
        payment_method: 'pix',
        amount: amount,
        customer: {
          name: client.name,
          email: client.email,
          document: client.document.number,
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

  return (
    <>
      <div
        className='fixed h-screen w-full z-40 bg-0006 flex items-center justify-center inset-0 font-roboto'
        onClick={handleCloseQRCode}
      >
        <div className='w-full max-w-[500px] px-6 relative'>
          <button
            type='button'
            className='self-end p-2 absolute -top-4 right-0 z-10'
            onClick={handleCloseQRCode}
          >
            <svg
              width={33}
              height={33}
              viewBox='0 0 33 33'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x={1}
                y={1.00781}
                width={31}
                height={31}
                rx={15.5}
                fill='#fff'
              />
              <rect
                x={1}
                y={1.00781}
                width={31}
                height={31}
                rx={15.5}
                stroke='#231F20'
                strokeWidth={2}
              />
              <path
                d='M24 10.518l-1.51-1.51-5.99 5.99-5.99-5.99L9 10.518l5.99 5.99L9 22.498l1.51 1.51 5.99-5.99 5.99 5.99 1.51-1.51-5.99-5.99 5.99-5.99z'
                fill='#231F20'
              />
            </svg>
          </button>
          <div
            className='bg-white shadow-card-payment rounded-[4px] overflow-hidden w-full'
            onClick={event => event.stopPropagation()}
          >
            <div
              id='qr-code-pix-installment'
              className='w-full max-h-[95vh] overflow-x-hidden overflow-y-auto flex flex-col bg-inherit items-center relative'
            >
              <Image
                src='/assets/svgs/logo.svg'
                alt='logo'
                width={100}
                height={50}
                className='mt-2'
              />
              <h2 className='text-sm text-black text-center font-semibold my-1'>
                PIX PARCELADO
              </h2>
              <div className='bg-e7f9f4 py-2 px-4 rounded-[30px] flex items-center gap-1 text-[10px] text-000000de mb-2'>
                <FaLock className='fill-green-500' size={13} />
                Você está em um ambiente de pagamento seguro
              </div>
              <div className='py-2 px-3 bg-f6f7f9 flex flex-col w-full'>
                <h2 className='text-base text-black font-semibold mb-1'>
                  Resumo da fatura
                </h2>
                <div className='w-full bg-white rounded-2xl p-3 flex flex-col mb-2'>
                  <p className='text-636f88 text-xs '>
                    Titular:{' '}
                    <span className='text-base font-semibold'>
                      {client.name}
                    </span>
                  </p>
                  <p className='text-636f88 text-xs pb-2 border-b border-solid border-b-gray-200 mb-2'>
                    Conta:{' '}
                    <span className='text-base font-semibold'>
                      {client.digitAccount}
                    </span>
                  </p>
                  <div className='flex items-center justify-between text-black text-base font-bold mb-1'>
                    Total da fatura:{' '}
                    <span className='text-base font-semibold'>
                      {formatPrice(client.total)}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-black text-base font-bold'>
                    Vencimento:{' '}
                    <span className='text-base font-semibold'>
                      {client.maturity}
                    </span>
                  </div>
                </div>
                <p className='text-000000de text-xs'>
                  Fizemos essa etapa especialmente para você caso não tenha o
                  limite total do valor da sua fatura para o pagamento total.
                </p>
                <p className='text-000000de text-xs my-1'>
                  PARCELAMOS O VALOR DE ({formatPrice(client.total)}) EM ALGUNS
                  VALORES PARA SUA COMODIDADE.
                </p>
                <p className='text-sm text-black font-semibold text-center mb-2'>
                  SEGUE OS PIX PARCELADO COM O VENCIMENTO PARA HOJE DIA (
                  {dateNow})
                </p>

                <div className='w-full flex flex-col gap-2'>
                  {values.map((item, i) => (
                    <div
                      key={i}
                      className='w-full flex flex-col rounded-[4px] overflow-hidden shadow-card-header-gov'
                    >
                      <div className='w-full grid grid-cols-2 '>
                        <div className='border-b border-b-2a5788 border-solid w-full bg-1e3650 text-white text-[17px] h-[50px] text-center flex items-center justify-center font-bold'>
                          Valor parcela {i + 1}
                        </div>
                        <div className='border-b border-b-c4c4c4 border-solid w-full bg-white text-1e3650 text-[17px] h-[50px] text-center flex items-center justify-center font-bold'>
                          {formatPrice(item)}
                        </div>
                      </div>
                      <div className='w-full grid grid-cols-2 '>
                        <div className='w-full bg-1e3650 text-white text-[17px] h-[50px] text-center flex items-center justify-center font-bold'>
                          Pagar
                        </div>
                        <div className='text-white px-4 text-base w-full bg-white h-[50px] text-center flex items-center justify-center font-bold'>
                          <div className='flex items-center justify-center gap-2 w-full'>
                            <div
                              onClick={() => handlePaymentGateway(item)}
                              className='cursor-pointer w-full max-w-[200px] rounded-[4px] flex flex-col py-3 items-center justify-center bg-00a5e4'
                            >
                              {/* <FaPix size={20} fill='#fff' /> */}
                              <span>Gerar QRCode</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${qrcode ? 'flex' : 'hidden'} z-50 fixed w-full bg-0006 h-full inset-0 justify-center items-center`}
        onClick={handleCloseQRCodePix}
      >
        <div
          className='bg-white rounded-[8px] p-4 flex flex-col gap-4 relative'
          onClick={event => event.stopPropagation()}
        >
          <button
            type='button'
            className='self-end p-2 absolute -top-6 -right-6 z-10'
            onClick={handleCloseQRCodePix}
          >
            <svg
              width={33}
              height={33}
              viewBox='0 0 33 33'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x={1}
                y={1.00781}
                width={31}
                height={31}
                rx={15.5}
                fill='#fff'
              />
              <rect
                x={1}
                y={1.00781}
                width={31}
                height={31}
                rx={15.5}
                stroke='#231F20'
                strokeWidth={2}
              />
              <path
                d='M24 10.518l-1.51-1.51-5.99 5.99-5.99-5.99L9 10.518l5.99 5.99L9 22.498l1.51 1.51 5.99-5.99 5.99 5.99 1.51-1.51-5.99-5.99 5.99-5.99z'
                fill='#231F20'
              />
            </svg>
          </button>

          <div className='self-center flex-none '>
            <QRCodeCanvas value={qrcode} size={200} />
          </div>
          <button
            type='button'
            className='w-full h-12 rounded-[4px] bg-00a5e4 flex items-center justify-center text-base text-white'
            onClick={handleCopy}
          >
            Copiar código pix
          </button>
        </div>
      </div>
    </>
  );
}
