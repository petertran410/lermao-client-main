import { IMG_ALT } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Box } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import Contact from './_layouts/contact';
import Footer from './_layouts/footer';
import Header from './_layouts/header';
import './globals.css';
import { Providers } from './providers';

export const metadata = getMetadata({
  title: 'Gấu LerMao | Giải Pháp Pha Chế Toàn Diện Tại Việt Nam',
  description:
    'Gấu LerMao - Đơn vị tiên phong kiến tạo hệ sinh thái nguyên liệu pha chế bền vững. Chúng tôi cung cấp giải pháp pha chế toàn diện, là đối tác tin cậy đồng hành cùng sự thành công của các chủ quán trà sữa trên khắp Việt Nam.',
  path: '/',
  other: {
    'google-site-verification': 'C7ZmxlT3_8MJnKh0ok3tfyDeIKIHVvk7g5P19aCchQQ'
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1
  }
});

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-6K6R2TWX89" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6K6R2TWX89');
            `
          }}
        />
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '704081535981275');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=704081535981275&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        <Providers>
          <Box bgGradient="linear(to-br, #FFF 0%, #FFF 5%, #e7f7fb 50%, #FFF 95%, #FFF 100%)" pos="relative">
            <Contact />
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
