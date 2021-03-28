import React from 'react';
import { Toaster } from 'react-hot-toast';
import { IdProvider } from '@radix-ui/react-id';

import '../styles/index.css';

function NearmeRoot({ Component, pageProps }) {
  return (
    <IdProvider>
      <Toaster />
      <Component {...pageProps} />
    </IdProvider>
  );
}

export default NearmeRoot;
