'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CardTitle } from '@/components/ui/card';

export default function Menu() {
  const pathName = usePathname();

  return (
    <div className='flex items-center gap-5'>
      <a href='/admin/dashboard'>
        <CardTitle
          className={`${pathName === '/admin/dashboard' ? 'text-foreground underline' : 'text-muted-foreground hover:underline'}  text-[15px] font-normal whitespace-nowrap`}
        >
          Painel
        </CardTitle>
      </a>
      <a href='/admin/pix'>
        <CardTitle
          className={`${pathName === '/admin/pix' ? 'text-foreground underline' : 'text-muted-foreground hover:underline'}  text-[15px] font-normal whitespace-nowrap`}
        >
          Editar pix
        </CardTitle>
      </a>
      <Link href='/' target='_blank'>
        <CardTitle
          className={`${pathName === '/' ? 'text-foreground underline' : 'text-muted-foreground hover:underline'} text-[15px] font-normal whitespace-nowrap`}
        >
          Home
        </CardTitle>
      </Link>
    </div>
  );
}
