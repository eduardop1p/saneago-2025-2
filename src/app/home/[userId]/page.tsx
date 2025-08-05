import { redirect } from 'next/navigation';

import Header from '@/components/header';
import Home from '@/components/home';
import MenuLoggedIn from '@/components/menuLoggedIn';
import getUser from '@/db/actions/user/getUser';

interface Props {
  params: Promise<{ userId?: string }>;
}

export default async function Page({ params }: Props) {
  const { userId } = await params;
  if (!userId) redirect('/');

  const user = await getUser({ query: { _id: userId } });
  if (!user) redirect('/');
  const userName = user.nome;

  return (
    <>
      <Header />
      <main className='w-full flex h-screen'>
        <MenuLoggedIn userName={userName} userId={userId} />
        <div className='pl-[294px] max-[930px]:pl-6 pt-[80px] pb-6 pr-6 w-full h-full bg-[url("/assets/svgs/invoices-bg.svg")] bg-no-repeat bg-cover bg-position-[50%] flex items-center justify-center flex-col'>
          <Home userId={userId} user={user} />
        </div>
      </main>
    </>
  );
}
