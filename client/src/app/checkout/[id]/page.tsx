import Checkout from './Checkout';
import Footer from 'components/ui/Footer';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Замовлення | SpaceJam',
  description: '',
};

const CheckoutPage = () => {
  return (
    <>
      <main className="main">
        <Checkout />
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
