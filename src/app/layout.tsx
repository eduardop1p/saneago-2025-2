import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import LoadingApplicationContextProvider from '@/utils/loadingApplicationContext/context';
import LoadingContextProvider from '@/utils/loadingContext/context';
import ToastContextProvider from '@/utils/toastContext/context';

const fontRoboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Saneago',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link
          rel='shortcut icon'
          href='/assets/saneago.ico'
          type='image/x-icon'
          sizes='any'
        />
      </head>
      <body className={fontRoboto.className}>
        <ToastContextProvider>
          <LoadingApplicationContextProvider>
            <LoadingContextProvider>{children}</LoadingContextProvider>
          </LoadingApplicationContextProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
