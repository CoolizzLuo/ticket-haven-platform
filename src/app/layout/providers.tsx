'use client';

import { SWRConfig } from 'swr';
import type { SWRConfiguration } from 'swr';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
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
      <SWRConfig value={swrConfig}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </SWRConfig>
    </CacheProvider>
  );
};

export default Providers;
