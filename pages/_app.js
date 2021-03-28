import React from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/index.css';

function NearmeRoot({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default NearmeRoot;
