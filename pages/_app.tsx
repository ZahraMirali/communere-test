import '../configs';
import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Todo App</title>
        <meta name='description' content='maintain your day-to-day tasks ' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icons/icon-96x96.png' />
        <meta name='theme-color' content='#FFE1C1' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
