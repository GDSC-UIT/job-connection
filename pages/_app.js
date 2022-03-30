import React, { useEffect } from 'react';
import '@styles/globals.css';
import '@styles/Login.css';
import '@styles/Register.css';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from '@libs/firebase';
import { setToken } from '@api/instance';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => toast.error(error.message || error),
      onSuccess: (data) => {
        toast.success(data.data.message);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => toast.error(error.message || error),
  }),
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || React.Fragment;

  useEffect(() => {
    auth.onIdTokenChanged((user) => {
      user?.getIdToken().then(setToken);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <title>{Component.title ? Component.title + ' | Job Connection' : 'Job Connection'}</title>
          <link rel="icon" href="/icon.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>

      {/* react-query devtool */}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* toast container */}
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
