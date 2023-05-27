'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import theme from './theme';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <CacheProvider>
      <SessionProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default Providers;
