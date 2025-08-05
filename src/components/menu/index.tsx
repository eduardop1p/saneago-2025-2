/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import Image from 'next/image';

import { useState } from 'react';

import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export default function Menu({ className }: Props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={twMerge(
          `${show ? 'pointer-events-auto' : 'max-[930px]:pointer-events-none'} w-[270px] h-full flex flex-col z-20 fixed left-0`,
          className
        )}
      >
        <div className='w-fit h-[56px] flex-none bg-00649c pl-4 flex items-center !pointer-events-auto'>
          <h1
            className={`${show ? 'max-[930px]:block' : 'max-[930px]:hidden'} font-bold text-xl text-white`}
          >
            Agência Virtual
          </h1>
          <button
            type='button'
            onClick={() => setShow(true)}
            className={`${show ? 'hidden' : 'hidden max-[930px]:inline-block'}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={30}
              height={39}
              viewBox='0 0 30 39'
              className='s-ion-icon'
            >
              <g data-name='elemento - 2. Icon menu'>
                <g transform='translate(-13 -22) translate(13 22)'>
                  <path
                    data-name='view-list (Background)'
                    fill='none'
                    d='M0 0H30V30H0z'
                  />
                  <path
                    data-name='view-list'
                    d='M22.5 16.875H0V15h22.5v1.875zm0-7.5H0V7.5h22.5v1.876zm0-7.5H0V0h22.5v1.875z'
                    transform='translate(3.75 6.562)'
                    fill='#fff'
                  />
                </g>
                <text
                  transform='translate(-13 -22) translate(28 59)'
                  fill='#fff'
                  fontSize={8}
                  fontFamily='Roboto-Regular, Roboto'
                  letterSpacing='0.032em'
                >
                  <tspan x={-11.595} y={0}>
                    {'MENU'}
                  </tspan>
                </text>
              </g>
            </svg>
          </button>
        </div>

        <nav
          className={`${show ? 'translate-x-0' : 'max-[930px]:-translate-x-full'} transition-transform relative duration-200 w-full h-full px-2 py-5 flex flex-col overflow-x-hidden overflow-y-auto flex-none bg-white`}
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <h2 className='font-bold text-sm text-00649c ml-2 flex-none'>
            Visitante
          </h2>

          <a
            href='/'
            className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon'
            >
              <g data-name='menu - 1. Home'>
                <g data-name='Grupo 336'>
                  <path
                    data-name='home (Background)'
                    transform='translate(-1234.882 -227.5) translate(1217.319 126.438) translate(17.563 101.063)'
                    fill='none'
                    d='M0 0H23V23H0z'
                  />
                </g>
                <path
                  data-name='Caminho 143'
                  d='M1246.507 230.531l9.25 8.969h-2.594v8.125h-4.922v-5h-3.5v5h-4.984V239.5h-2.625z'
                  fill='none'
                  stroke='#00649c'
                  strokeLinejoin='round'
                  strokeWidth={1.3}
                  transform='translate(-1234.882 -227.5)'
                />
              </g>
            </svg>
            <span className='text-black text-sm'>Home</span>
          </a>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden bg-cce0eb px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 256 256'
              className='s-ion-icon'
            >
              <g strokeWidth={0} strokeMiterlimit={10} fill='#00649c'>
                <path
                  d='M40.052 48.233c-13.298 0-24.117-10.819-24.117-24.117S26.754 0 40.052 0s24.116 10.819 24.116 24.117S53.35 48.233 40.052 48.233zm0-44.233C28.96 4 19.935 13.024 19.935 24.117s9.024 20.117 20.117 20.117c11.092 0 20.116-9.024 20.116-20.117S51.144 4 40.052 4z'
                  transform='matrix(2.81 0 0 2.81 1.407 1.407)'
                />
                <path
                  d='M46.468 90H8.237a2 2 0 01-2-2v-9.953c0-18.646 15.169-33.814 33.814-33.814 4.744 0 9.333.964 13.64 2.864a2 2 0 11-1.616 3.66 29.586 29.586 0 00-12.024-2.524c-16.44 0-29.814 13.375-29.814 29.814V86h36.23a2 2 0 01.001 4zM79.034 90H57.375a4.734 4.734 0 01-4.729-4.729V67.729A4.734 4.734 0 0157.375 63h21.659a4.734 4.734 0 014.729 4.729v17.543A4.734 4.734 0 0179.034 90zM57.375 67a.73.73 0 00-.729.729v17.543a.73.73 0 00.729.729h21.659a.73.73 0 00.729-.729V67.729a.73.73 0 00-.729-.729H57.375z'
                  transform='matrix(2.81 0 0 2.81 1.407 1.407)'
                />
                <path
                  d='M77.433 67a2 2 0 01-2-2v-6.347a6.477 6.477 0 00-6.469-6.469h-1.518a6.477 6.477 0 00-6.469 6.469V65a2 2 0 01-4 0v-6.347c0-5.772 4.696-10.469 10.469-10.469h1.518c5.772 0 10.469 4.696 10.469 10.469V65a2 2 0 01-2 2zM68.205 79.333a2 2 0 01-2-2v-1.852a2 2 0 014 0v1.852a2 2 0 01-2 2z'
                  transform='matrix(2.81 0 0 2.81 1.407 1.407)'
                />
              </g>
            </svg>
            <span className='text-00649c text-sm'>Login</span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 25 25'
              className='s-ion-icon'
            >
              <g data-name='elemento - 5. Icon usuario' opacity={0.9}>
                <path
                  data-name='user-circle (Background)'
                  fill='none'
                  d='M0 0H25V25H0z'
                />
                <path
                  d='M10.938 21.876a10.938 10.938 0 1110.938-10.938 10.95 10.95 0 01-10.938 10.938zm0-6.251a14.293 14.293 0 00-6.818 1.748 9.377 9.377 0 0013.635 0 14.293 14.293 0 00-6.817-1.748zm0-1.562a15.851 15.851 0 017.8 2.07 9.375 9.375 0 10-15.611 0 15.864 15.864 0 017.811-2.07zm0-1.562a4.344 4.344 0 114.344-4.344 4.349 4.349 0 01-4.344 4.343zm0-7.125a2.782 2.782 0 102.782 2.782 2.785 2.785 0 00-2.782-2.783z'
                  transform='translate(1.563 1.563)'
                  fill='#00649c'
                />
              </g>
            </svg>

            <span className='text-black text-sm'>Cadastro</span>
          </div>

          <div className='border-b flex-none border-b-dedede border-solid w-full h-12 flex items-center gap-8 px-2 mb-1'>
            <span className='text-94a3b8 text-xs font-bold'>
              FATURAS E CERTIDÕES
            </span>
          </div>

          <a
            href='/'
            className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>

            <span className='text-black text-sm'>
              Emissão de 2ª via da fatura
            </span>
          </a>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <Image
              src='/assets/svgs/maps.svg'
              width={24}
              height={24}
              alt='maps'
            />

            <span className='text-black text-sm'>
              Emissão de 2ª via - Goiás Expresso
            </span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>

            <span className='text-black text-sm'>
              Histórico de consumo faturado
            </span>
          </div>

          <a
            href='/'
            className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>

            <span className='text-black text-sm'>Últimas faturas</span>
          </a>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>

            <span className='text-black text-sm'>
              Consumo e faturamento individualizados
            </span>
          </div>

          <a
            href='/'
            className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>

            <span className='text-black text-sm'>Fatura por e-mail</span>
          </a>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>

            <span className='text-black text-sm'>
              Certidão negativa de débitos
            </span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ionicon s-ion-icon !text-005c84'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={32}
                d='M464 128L240 384l-96-96m0 96l-96-96m320-160L232 284'
              />
            </svg>

            <span className='text-black text-sm'>
              Validar certidão negativa
            </span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ionicon s-ion-icon !text-005c84'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <rect
                x={32}
                y={128}
                width={448}
                height={320}
                rx={48}
                ry={48}
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth={32}
              />
              <path
                d='M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32m112 112H32m288 0v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={32}
              />
            </svg>
            <span className='text-black text-sm'>
              Fatura analítica de órgão público
            </span>
          </div>

          <div className='flex-none border-b border-b-dedede border-solid w-full h-12 flex items-center gap-8 px-2 mb-1'>
            <span className='text-94a3b8 text-xs font-bold'>
              SERVIÇOS DIVERSOS
            </span>
          </div>

          <div className='flex-none w-full h-12 flex items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>
            <span className='text-black text-sm'>Consulta protocolos</span>
          </div>

          <div className='flex-none w-full h-12 flex items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon flex-none'
            >
              <g data-name='menu - 6. Comunicar falta de \xE1gua'>
                <path
                  data-name='barcode (Background)'
                  fill='none'
                  transform='translate(-16 -257) translate(16 257)'
                  d='M0 0H23V23H0z'
                />
                <g
                  data-name='Grupo 131'
                  transform='translate(-16 -257) translate(17.438 258.925)'
                  fill='none'
                  stroke='#00649c'
                  strokeWidth={1.3}
                >
                  <path
                    data-name='Caminho 36'
                    d='M11.742 15.908A6.252 6.252 0 010 12.918C0 7.918 6.251 0 6.251 0a48.531 48.531 0 013.125 4.584'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                  <circle
                    data-name='Elipse 4'
                    cx={5.417}
                    cy={5.417}
                    r={5.417}
                    transform='translate(8.334 4.167)'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                  <path data-name='Caminho 37' d='M9.878 13.458l7.747-7.747' />
                </g>
              </g>
            </svg>
            <span className='text-black text-sm'>Comunicar falta de água</span>
          </div>

          <div className='flex-none w-full h-12 flex items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon flex-none'
            >
              <g data-name='menu - 8. Reclamar qualidade da \xE1gua'>
                <path
                  data-name='barcode (Background)'
                  fill='none'
                  transform='translate(-16 -347) translate(16 347)'
                  d='M0 0H23V23H0z'
                />
                <g data-name='Grupo 132'>
                  <g data-name='Grupo 89'>
                    <path
                      data-name='Caminho 36'
                      d='M11.742 15.908A6.252 6.252 0 010 12.918C0 7.918 6.251 0 6.251 0s1.99 2.635 3.552 5.24'
                      fill='none'
                      stroke='#00649c'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                      strokeWidth={1.3}
                      transform='translate(-16 -347) translate(17.437 349.085)'
                    />
                  </g>
                  <path
                    data-name='Caminho 78'
                    d='M14.059 3.375l1.89 3.781 3.781 1.89-3.78 1.891-1.89 3.781-1.891-3.781-3.781-1.891 3.781-1.89z'
                    fill='none'
                    stroke='#00649c'
                    strokeLinejoin='round'
                    strokeWidth={1.3}
                    transform='translate(-16 -347) translate(17.437 349.085)'
                  />
                </g>
              </g>
            </svg>
            <span className='text-black text-sm'>
              Reclamação sobre qualidade da água
            </span>
          </div>

          <div className='flex-none w-full h-12 flex items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ionicon s-ion-icon flex-none !fill-00649c !stroke-00649c !text-00649c'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M400 320c0 88.37-55.63 144-144 144s-144-55.63-144-144c0-94.83 103.23-222.85 134.89-259.88a12 12 0 0118.23 0C296.77 97.15 400 225.17 400 320z'
                fill='none'
                stroke='currentColor'
                strokeMiterlimit={10}
                strokeWidth={32}
              />
              <path
                d='M344 328a72 72 0 01-72 72'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={32}
              />
            </svg>
            <span className='text-black text-sm'>
              Solicitar religação de água
            </span>
          </div>

          <div className='flex-none w-full h-12 flex items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon flex-none'
            >
              <g data-name='menu - 7. Comunicar vazamento'>
                <path
                  data-name='barcode (Background)'
                  fill='none'
                  transform='translate(-16 -302) translate(16 302)'
                  d='M0 0H23V23H0z'
                />
                <g data-name='Grupo 133'>
                  <g data-name='Grupo 83'>
                    <path
                      data-name='Caminho 36'
                      d='M11.742 15.908A6.252 6.252 0 010 12.918C0 7.918 6.251 0 6.251 0a48.531 48.531 0 013.125 4.584'
                      fill='none'
                      stroke='#00649c'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                      strokeWidth={1.3}
                      transform='translate(-16 -302) translate(17.437 303.925)'
                    />
                  </g>
                  <g
                    data-name='Grupo 91'
                    fill='none'
                    stroke='#00649c'
                    strokeLinecap='round'
                    strokeDasharray={2}
                  >
                    <path
                      data-name='Caminho 79'
                      d='M0 4.859h8.027'
                      strokeWidth={1.3}
                      transform='translate(-16 -302) translate(17.437 303.925) translate(11.741 4.727)'
                    />
                    <path
                      data-name='Caminho 82'
                      d='M.001 1.565l5.84-1.566'
                      strokeWidth={1.3001559999999999}
                      transform='translate(-16 -302) translate(17.437 303.925) translate(11.741 4.727)'
                    />
                    <path
                      data-name='Caminho 83'
                      d='M0 8.131L5.814 9.69'
                      strokeWidth={1.3001559999999999}
                      transform='translate(-16 -302) translate(17.437 303.925) translate(11.741 4.727)'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span className='text-black text-sm'>
              Comunicar vazamento de água
            </span>
          </div>

          <div className='flex-none w-full h-12 flex items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ionicon s-ion-icon fill-00649c text-00649c flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M277.42 247a24.68 24.68 0 00-4.08-5.47L255 223.44a21.63 21.63 0 00-6.56-4.57 20.93 20.93 0 00-23.28 4.27c-6.36 6.26-18 17.68-39 38.43C146 301.3 71.43 367.89 37.71 396.29a16 16 0 00-1.09 23.54l39 39.43a16.13 16.13 0 0023.67-.89c29.24-34.37 96.3-109 136-148.23 20.39-20.06 31.82-31.58 38.29-37.94a21.76 21.76 0 003.84-25.2zm201.01-46l-34.31-34a5.44 5.44 0 00-4-1.59 5.59 5.59 0 00-4 1.59h0a11.41 11.41 0 01-9.55 3.27c-4.48-.49-9.25-1.88-12.33-4.86-7-6.86 1.09-20.36-5.07-29a242.88 242.88 0 00-23.08-26.72c-7.06-7-34.81-33.47-81.55-52.53a123.79 123.79 0 00-47-9.24c-26.35 0-46.61 11.76-54 18.51-5.88 5.32-12 13.77-12 13.77a91.29 91.29 0 0110.81-3.2 79.53 79.53 0 0123.28-1.49C241.19 76.8 259.94 84.1 270 92c16.21 13 23.18 30.39 24.27 52.83.8 16.69-15.23 37.76-30.44 54.94a7.85 7.85 0 00.4 10.83l21.24 21.23a8 8 0 0011.14.1c13.93-13.51 31.09-28.47 40.82-34.46s17.58-7.68 21.35-8.09a35.71 35.71 0 0121.3 4.62 13.65 13.65 0 013.08 2.38c6.46 6.56 6.07 17.28-.5 23.74l-2 1.89a5.5 5.5 0 000 7.84l34.31 34a5.5 5.5 0 004 1.58 5.65 5.65 0 004-1.58L478.43 209a5.82 5.82 0 000-8z'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={32}
              />
            </svg>
            <span className='text-black text-sm'>Desobstrução de esgoto</span>
          </div>

          <div className='flex-none w-full h-12 flex items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 256 256'
              className='s-ion-icon flex-none'
            >
              <g strokeWidth={0} strokeMiterlimit={10} fill='#00649c'>
                <path
                  d='M45 64.242a4.765 4.765 0 01-4.766-4.497l-2.552-24.631a7.389 7.389 0 011.934-5.6A7.368 7.368 0 0145 27.164c2.036 0 3.999.856 5.384 2.349a7.365 7.365 0 011.939 5.545l-2.557 24.687A4.765 4.765 0 0145 64.242zm0-33.078c-.941 0-1.811.38-2.452 1.07a3.306 3.306 0 00-.883 2.524l2.561 24.743a.773.773 0 001.546 0l.009-.118 2.558-24.681a3.283 3.283 0 00-.889-2.469A3.307 3.307 0 0045 31.164zM45 80.158c-3.54 0-6.42-2.88-6.42-6.42s2.88-6.42 6.42-6.42 6.42 2.88 6.42 6.42-2.88 6.42-6.42 6.42zm0-8.84c-1.334 0-2.42 1.086-2.42 2.42s1.086 2.42 2.42 2.42c1.334 0 2.42-1.086 2.42-2.42s-1.086-2.42-2.42-2.42z'
                  transform='matrix(2.81 0 0 2.81 1.407 1.407)'
                />
                <path
                  d='M84.036 88.193H5.965a5.91 5.91 0 01-5.098-2.875 5.908 5.908 0 01-.179-5.848L39.723 4.998A5.943 5.943 0 0145 1.807a5.944 5.944 0 015.278 3.192L89.312 79.47c.977 1.862.91 4.049-.179 5.848s-2.994 2.875-5.097 2.875zM45 5.806c-.356 0-1.238.103-1.734 1.049L4.23 81.327a1.926 1.926 0 00.059 1.921 1.93 1.93 0 001.676.945h78.071a1.93 1.93 0 001.675-.944c.172-.284.521-1.04.059-1.922L46.734 6.856c-.496-.947-1.378-1.05-1.734-1.05z'
                  transform='matrix(2.81 0 0 2.81 1.407 1.407)'
                />
              </g>
            </svg>

            <span className='text-black text-sm'>
              Denúncia de irregularidade
            </span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-eb445a flex-none'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M336 208v-95a80 80 0 00-160 0v95'
                className='fill-none stroke-[32px]'
              />
              <rect
                x={96}
                y={208}
                width={320}
                height={272}
                rx={48}
                ry={48}
                className='fill-none stroke-[32px]'
              />
            </svg>

            <span className='text-black text-sm'>Laudo de aferição</span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ionicon s-ion-icon flex-none text-00649c'
              viewBox='0 0 512 512'
              width={24}
              height={24}
            >
              <path
                d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                fill='none'
                stroke='currentColor'
                strokeMiterlimit={10}
                strokeWidth={32}
              />
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeMiterlimit={10}
                strokeWidth={32}
                d='M338.29 338.29L448 448'
              />
            </svg>

            <span className='text-black text-sm'>Consulta processos GED</span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon float-none'
            >
              <g data-name='menu - 10. Not\xEDcias e comunicados'>
                <g data-name='Grupo 126'>
                  <path
                    data-name='file-powerpoint (Background)'
                    fill='none'
                    transform='translate(3561 13591.001) translate(-3561 -13591.001)'
                    d='M0 0H23V23H0z'
                  />
                </g>
                <g
                  data-name='Grupo 127'
                  transform='translate(3561 13591.001) translate(-3558.771 -13587.334)'
                  fill='none'
                  stroke='#00649c'
                  strokeMiterlimit={10}
                  strokeWidth={1.3}
                >
                  <path
                    data-name='Caminho 89'
                    d='M15.618 3.807h2.423v11.862H0V0h15.618v14.065'
                  />
                  <path
                    data-name='Linha 10'
                    transform='translate(2.879 3.397)'
                    d='M0 0L9.602 0'
                  />
                  <path
                    data-name='Linha 11'
                    transform='translate(10.178 6.467)'
                    d='M0 0L2.816 0'
                  />
                  <path
                    data-name='Linha 12'
                    transform='translate(10.178 9.336)'
                    d='M0 0L2.816 0'
                  />
                  <path
                    data-name='Linha 13'
                    transform='translate(10.178 12.222)'
                    d='M0 0L2.816 0'
                  />
                  <path
                    data-name='Ret\xE2ngulo 38'
                    transform='translate(3.416 6.797)'
                    d='M0 0H3.939V5.217H0z'
                  />
                </g>
              </g>
            </svg>

            <span className='text-black text-sm'>Notícias e comunicados</span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon flex-none'
            >
              <g data-name='menu - 11. Encontre uma ag\xEAncia'>
                <g
                  data-name='Grupo 278'
                  transform='translate(-16 -559) translate(16 559)'
                >
                  <path
                    data-name='location (Background)'
                    fill='none'
                    d='M0 0H23V23H0z'
                  />
                  <g data-name='Grupo 116'>
                    <path
                      data-name='Caminho 84'
                      d='M0 4.156h1.207a3.6 3.6 0 015.144-2.595 2.637 2.637 0 00-2.2 2.592v1.191a1.454 1.454 0 01-2.834.456 3.513 3.513 0 01-.109-.455H0a4.669 4.669 0 00.164.768l.007.021a4.791 4.791 0 009.32-.789H8.284a3.6 3.6 0 01-5.145 2.586 2.635 2.635 0 002.207-2.587V4.156a1.454 1.454 0 012.817-.5 3.553 3.553 0 01.122.5h1.207a4.734 4.734 0 00-.085-.476 2.585 2.585 0 00-.152-.519A4.792 4.792 0 000 4.156'
                      transform='translate(3.167 1.278) translate(3.286 3.012)'
                      fill='#00649c'
                    />
                    <path
                      data-name='Caminho 87'
                      d='M7.951 0A7.96 7.96 0 000 7.951c0 5.569 6.494 11.282 7.951 12.493 1.457-1.211 7.951-6.924 7.951-12.493A7.96 7.96 0 007.951 0z'
                      fill='none'
                      stroke='#00649c'
                      strokeMiterlimit={10}
                      strokeWidth={1.3}
                      transform='translate(3.167 1.278)'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span className='text-black text-sm'>Encontre uma agência</span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon flex-none'
            >
              <g
                data-name='menu - 12. Documentos auxiliares'
                transform='translate(-1234.882 -734.5)'
              >
                <path
                  data-name='file-copy (Background)'
                  transform='translate(1234.882 734.5)'
                  fill='none'
                  d='M0 0H23V23H0z'
                />
                <path
                  d='M12.938 20.144H1.437A1.439 1.439 0 010 18.706V5.749h1.437v12.957h11.5v1.436zm2.889-2.894H4.312a1.37 1.37 0 01-1.431-1.325l-.006-14.6A1.37 1.37 0 014.306 0h6.282a1.427 1.427 0 011.026.431l5.224 5.325a1.428 1.428 0 01.411 1.005l.006 9.164a1.369 1.369 0 01-1.429 1.325zM4.312 1.437l.006 14.375h11.5l-.005-8.606h-5.75V1.437zm7.188.929v3.4h3.337z'
                  transform='translate(1237.757 735.938)'
                  fill='#00649c'
                />
              </g>
            </svg>
            <span className='text-black text-sm'>Documentos auxiliares</span>
          </div>

          <div className='flex-none border-b border-b-dedede border-solid w-full h-12 flex items-center gap-8 px-2 mb-1'>
            <span className='text-94a3b8 text-xs font-bold'>SISTEMA</span>
          </div>

          <div className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon flex-none'
            >
              <defs>
                <clipPath id='a'>
                  <path
                    data-name='Ret\xE2ngulo 33'
                    fill='none'
                    stroke='#00649c'
                    strokeWidth={1.3}
                    d='M0 0H21V21H0z'
                  />
                </clipPath>
              </defs>
              <g data-name='menu - 13. Centro de prefer\xEAncias e privacidade'>
                <path
                  data-name='file-copy (Background)'
                  fill='none'
                  transform='translate(3562 13454) translate(-3562 -13454)'
                  d='M0 0H23V23H0z'
                />
                <g data-name='Grupo 67'>
                  <g
                    data-name='Grupo 66'
                    clipPath='url(#a)'
                    fill='none'
                    stroke='#00649c'
                    strokeLinejoin='round'
                    strokeWidth={1.3}
                    transform='translate(3562 13454) translate(-3561 -13453)'
                  >
                    <path
                      data-name='Caminho 38'
                      d='M.676 8.266l1.3-3.133 1.9.635a8.077 8.077 0 011.893-1.886l-.636-1.906 3.133-1.3.9 1.8a8.067 8.067 0 012.668 0l.9-1.8 3.133 1.3-.635 1.9a8.077 8.077 0 011.886 1.888l1.909-.636 1.3 3.133-1.8.9a8.107 8.107 0 010 2.669l1.8.9-1.3 3.133-1.907-.635a8.09 8.09 0 01-1.888 1.886l.636 1.908-3.133 1.3-.9-1.8a8.071 8.071 0 01-2.669 0l-.9 1.8-3.133-1.3.634-1.906a8.087 8.087 0 01-1.885-1.888l-1.906.639-1.3-3.133 1.8-.9a8.107 8.107 0 010-2.669z'
                    />
                    <path
                      data-name='Caminho 39'
                      d='M7.494 11.746a3.255 3.255 0 101.761-4.252 3.255 3.255 0 00-1.761 4.252z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span className='text-black text-sm'>Centro de preferências</span>
          </div>

          <a
            href='/'
            className='w-full h-12 flex flex-none items-center gap-8 rounded-[4px] overflow-hidden hover:bg-f5f5f5 transition-colors duration-200 px-2 cursor-pointer'
          >
            <svg
              data-name='menu - 14. Sair do aplicativo'
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              viewBox='0 0 23 23'
              className='s-ion-icon'
            >
              <path
                data-name='login (Background)'
                fill='none'
                d='M0 0H23V23H0z'
              />
              <path
                d='M16.532 17.25H3.594a.719.719 0 01-.719-.718v-3.594h1.437v2.875h11.5V1.437h-11.5v2.875H2.875V.719A.72.72 0 013.594 0h12.938a.719.719 0 01.718.719v15.813a.719.719 0 01-.718.718zm-7.995-3.662l-1.016-1.015 3.228-3.229H0V7.906h10.748L7.521 4.678l1.016-1.017 4.454 4.456a.718.718 0 010 1.016l-4.453 4.454z'
                transform='translate(1.438 2.875)'
                fill='#00649c'
              />
            </svg>
            <span className='text-black text-sm'>Sair</span>
          </a>

          <span className='text-xs text-94a3b8 '>6.3.0</span>
        </nav>
      </div>

      {show && (
        <div
          className='hidden max-[930px]:block bg-0006 w-screen min-h-screen inset-0 fixed z-10'
          onClick={() => setShow(false)}
        ></div>
      )}
    </>
  );
}
