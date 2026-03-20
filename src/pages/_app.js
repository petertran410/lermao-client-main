import Contact from '@/app/_layouts/contact';
import Footer from '@/app/_layouts/footer';
import Header from '@/app/_layouts/header';
import '@/app/globals.css';
import { chakraTheme } from '@/configs/chakra-theme';
import { IMG_ALT } from '@/utils/const';
import { Box, ChakraProvider, Image } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Montserrat } from 'next/font/google';
import { ParallaxProvider } from 'react-scroll-parallax';
import { RecoilRoot } from 'recoil';

const fontFamily = Montserrat({ subsets: ['latin', 'vietnamese'] });

// const Header = dynamic(() => import('@/app/_layouts/header'), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ParallaxProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={chakraTheme}>
            <div className={fontFamily.className}>
              <Box bgGradient="linear(to-br, #FFF 0%, #FFF 5%, #e7f7fb 50%, #FFF 95%, #FFF 100%)" pos="relative">
                {/* <Contact />
                <Image
                  display={{ xs: 'none', lg: 'block' }}
                  src="/images/bg-intro-left.png"
                  alt={IMG_ALT}
                  w={{ xs: '300px', lg: '230px', '2xl': '300px' }}
                  h={{ xs: '450px', lg: '400px', '2xl': '450px' }}
                  fit="contain"
                  pos="absolute"
                  top="8%"
                  left={0}
                  zIndex={10}
                />

                <Image
                  display={{ xs: 'none', lg: 'block' }}
                  src="/images/bg-intro-right.png"
                  alt={IMG_ALT}
                  w={{ xs: '300px', lg: '230px', '2xl': '300px' }}
                  h={{ xs: '450px', lg: '400px', '2xl': '450px' }}
                  fit="contain"
                  pos="absolute"
                  top="8%"
                  right={0}
                  zIndex={10}
                /> */}

                <Header />
                <Box pt={{ xs: '72px', lg: '100px' }} minH="60vh">
                  <Component {...pageProps} />
                </Box>
                <Footer />
              </Box>
            </div>
          </ChakraProvider>
        </QueryClientProvider>
      </ParallaxProvider>
    </RecoilRoot>
  );
}

export default MyApp;
