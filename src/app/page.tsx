import Image from 'next/image';

import Insights from '@/components/admin/insights';
import FormLogin from '@/components/forms/formLogin';
import Header from '@/components/header';
import Menu from '@/components/menu';

export default function Page() {
  return (
    <>
      <Header />
      <main className='w-full flex min-h-screen'>
        <Menu />
        <div className='pl-[270px] max-[930px]:pl-6 pt-[80px] pb-6 pr-6 w-full h-full bg-[url("/assets/svgs/invoices-bg.svg")] bg-no-repeat bg-cover bg-position-[50%] flex items-center justify-center flex-col'>
          <Image
            src='/assets/svgs/logo.svg'
            alt='logo'
            width={128}
            height={104}
            className='flex-none mb-12'
          />
          <FormLogin />
        </div>
      </main>
      <Insights page='home' />
    </>
  );
}
