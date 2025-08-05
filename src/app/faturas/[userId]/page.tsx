import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

import getPix from '@/actions/getPix';
import Insights from '@/components/admin/insights';
import Header from '@/components/header';
import Invoices from '@/components/invoices';
import MenuLoggedIn from '@/components/menuLoggedIn';
import getUser from '@/db/actions/user/getUser';
import PixProtocol from '@/interfaces/pixProtocol';

interface Props {
  params: Promise<{ userId?: string }>;
}

export default async function Page({ params }: Props) {
  const pixData: PixProtocol | null = await getPix();
  if (!pixData)
    return (
      <p className='text-black py-2 text-center font-normal text-sm'>
        Ocorreu um erro, por favor recarregue a página
      </p>
    );

  const { userId } = await params;
  if (!userId) redirect('/');

  const user = await getUser({ query: { _id: userId } });
  if (!user) redirect('/');
  if (!user.contas.length) redirect('/');
  const userName = user.nome;

  return (
    <>
      <Header userId={userId} />
      <main className='w-full flex min-h-screen'>
        <MenuLoggedIn userName={userName} userId={userId} />
        <div className='pl-[294px] max-[930px]:pl-6 pt-[80px] pb-6 pr-6 w-full h-full bg-[url("/assets/svgs/invoices-bg.svg")] bg-no-repeat bg-cover bg-position-[50%] flex items-center justify-center flex-col'>
          <Invoices
            userId={userId}
            user={user}
            userName={userName}
            {...pixData}
          />
        </div>
      </main>
      <Insights page='faturas' />
    </>
  );
}
