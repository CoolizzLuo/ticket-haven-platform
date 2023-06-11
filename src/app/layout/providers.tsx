'use client';

import { SWRConfig } from 'swr';
import type { SWRConfiguration } from 'swr';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { fetcher } from '@/api/swrFetcher';
import theme from './theme';

type Props = {
  children: React.ReactNode;
};

const swrConfig: SWRConfiguration = {
  fetcher,
};

const Providers = ({ children }: Props) => {
  return (
    <CacheProvider>
      <SessionProvider>
        <SWRConfig value={swrConfig}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </SWRConfig>
      </SessionProvider>
    </CacheProvider>
  );
};

export default Providers;
