'use client';

import { useState, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';

import Providers from '../providers';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {mounted && children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
