import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Quiz Builder</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}