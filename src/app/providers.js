'use client';

import { chakraTheme } from '@/configs/chakra-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ParallaxProvider } from 'react-scroll-parallax';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ParallaxProvider>
          <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
        </ParallaxProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
