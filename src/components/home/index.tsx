'use client';

import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { upperFirst } from 'lodash';
import { twMerge } from 'tailwind-merge';

import UserProtocol from '@/interfaces/userProtocol';
import formatPrice from '@/services/formatPrice';

interface Props {
  className?: string;
  userId: string;
  user: UserProtocol;
}

export default function Home({ className, userId, user }: Props) {
  const [userState, setUserState] = useState(() => ({
    active: false,
    account: user.contas[0],
    get digitAccount() {
      return this.account.numeroContaComDigito;
    },
  }));
  const currentInvoice = userState.account.faturas[0];

  const handleFormatDateMaturity = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', { dateStyle: 'short' });
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
      <div className='w-full shadow-card-login bg-white p-4 rounded-[8px] flex flex-col mb-4'>
        <span className='text-base text-black mb-1'>Bem-vindo(a)</span>
        <span className='text-00649c text-lg font-medium'>
          {userState.account.nomeTitular}
        </span>
      </div>
      <div className='grid grid-cols-2 w-full gap-4 max-[750px]:grid-cols-1'>
        <div className='shadow-card-login bg-white w-full p-4 rounded-[8px] flex flex-col items-center'>
          <h2 className='font-medium mb-4 text-00649c text-base text-center'>
            Fatura atual
          </h2>
          <h2 className='text-23b6cd text-2xl font-bold text-center mb-5'>
            {formatPrice(currentInvoice.valorDebito)}
          </h2>
          <div className='w-full max-w-[300px] mx-auto flex items-center justify-between gap-5 mb-5'>
            <div className='flex items-center flex-col'>
              <span className='text-base text-008bd2'>Referência</span>
              <span className='text-base text-334155'>
                {currentInvoice.referenciaFormatada}
              </span>
            </div>

            <div className='flex items-center flex-col'>
              <span className='text-base text-008bd2'>Vencimento</span>
              <span className='text-base text-334155'>
                {handleFormatDateMaturity(currentInvoice.dataVencimento)}
              </span>
            </div>
          </div>
          <div className='w-full max-w-[300px] mx-auto flex items-center justify-between gap-5 mb-5'>
            <div className='flex items-center flex-col'>
              <span className='text-base text-008bd2'>Situação da água</span>
              <span className='text-base text-334155'>
                {upperFirst(
                  userState.account.situacaoLigacaoAgua.toLowerCase()
                )}
              </span>
            </div>

            <a
              href={`/faturas/${userId}`}
              className='flex items-center flex-col gap-1'
            >
              <span className='text-base text-008bd2'>Pagamento</span>
              <div className='text-base text-00649c w-[65px] h-[27] flex items-center justify-center gap-1 border-2 border-solid border-00649c text-[13px] rounded-3xl font-medium'>
                2ª via
              </div>
            </a>
          </div>
        </div>

        <div className='shadow-card-login bg-white w-full p-4 rounded-[8px] flex flex-col items-center'>
          <h2 className='font-medium w-full mb-4 text-00649c text-base text-center pb-3 border-b-2 border-b-23b6cd border-solid'>
            Dados da conta
          </h2>

          <div className='flex flex-col items-center gap-2 mb-4 pb-3 border-b-2 border-b-23b6cd border-solid'>
            <span className='text-sm text-008bd2 text-center'>Endereço</span>
            <p className='text-[15px] text-334155'>
              {userState.account.nomeLogradouro}, n°{' '}
              {userState.account.numeroImovel.trim()}, QD.{' '}
              {userState.account.quadraImovel.trim()}, LT.{' '}
              {userState.account.loteImovel.trim()},{' '}
              {userState.account.complementoEndereco.trim()},{' '}
              {userState.account.nomeBairro.trim()},{' '}
              {userState.account.nomeCidade.trim()}
            </p>
          </div>

          <div className='w-full mb-4 pb-3 border-b-2 border-b-23b6cd border-solid'>
            <div className='w-full max-w-[300px] mx-auto flex items-center justify-between gap-5'>
              <div className='flex items-center flex-col'>
                <span className='text-sm text-008bd2'>Número</span>
                <span className='text-sm text-334155'>
                  {userState.account.numeroContaComDigito}
                </span>
              </div>

              <div className='flex items-center flex-col'>
                <span className='text-sm text-008bd2'>Categoria</span>
                <span className='text-sm text-334155'>
                  {userState.account.categoria}
                </span>
              </div>
            </div>
          </div>

          <div className='w-full mb-4 pb-3 border-b-2 border-b-23b6cd border-solid flex flex-col gap-2'>
            <span className='text-sm text-00649c text-center font-bold'>
              Água
            </span>
            <div className='w-full max-w-[300px] mx-auto flex items-center justify-between gap-5'>
              <div className='flex items-center flex-col'>
                <span className='text-sm text-008bd2'>Situação</span>
                <span className='text-sm text-334155'>
                  {userState.account.situacaoLigacaoAgua}
                </span>
              </div>

              <div className='flex items-center flex-col'>
                <span className='text-sm text-008bd2'>Data da ligação</span>
                <span className='text-sm text-334155'>
                  {handleFormatDateMaturity(userState.account.dataLigacaoAgua)}
                </span>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col gap-2'>
            <span className='text-sm text-00649c text-center font-bold'>
              Esgoto
            </span>
            <div className='w-full max-w-[300px] mx-auto flex items-center justify-between gap-5'>
              <div className='flex items-center flex-col'>
                <span className='text-sm text-008bd2'>Situação</span>
                <span className='text-sm text-334155'>
                  {userState.account.situacaoLigacaoEsgoto}
                </span>
              </div>

              <div className='flex items-center flex-col'>
                <span className='text-sm text-008bd2'>Data da ligação</span>
                <span className='text-sm text-334155'>
                  {handleFormatDateMaturity(
                    userState.account.dataLigacaoEsgoto
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  account: item,
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
