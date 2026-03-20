import { IMG_ALT } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Box, Image } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/next';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import Contact from './_layouts/contact';
import Footer from './_layouts/footer';
import Header from './_layouts/header';
import './globals.css';
import { Providers } from './providers';

const fontFamily = Montserrat({ subsets: ['latin', 'vietnamese'] });

export const metadata = getMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <Head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </Head>

      <body className={fontFamily.className}>
        <Providers>
          <Box bgGradient="linear(to-br, #FFF 0%, #FFF 5%, #e7f7fb 50%, #FFF 95%, #FFF 100%)" pos="relative">
            <Contact />
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
            />

            <Header />
            <Box pt={{ xs: '72px', lg: '100px' }} minH="60vh">
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
