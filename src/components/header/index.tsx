'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Props {
  userId?: string;
}

export default function Header({ userId }: Props) {
  const pathName = usePathname();

  return (
    <header className='w-full h-[56px] flex items-center bg-00649c fixed top-0 z-20 pl-[270px] max-[930px]:pl-4'>
      {pathName === `/faturas/${userId}` ? (
        <h1 className='text-xl text-white font-bold text-center mx-auto'>
          Emissão de 2ª via da fatura
        </h1>
      ) : (
        <Image
          src='/assets/svgs/logo2.svg'
          alt='logo2'
          width={176}
          height={139}
          className='mx-auto max-[600px]:mr-5'
        />
      )}
    </header>
  );
}
