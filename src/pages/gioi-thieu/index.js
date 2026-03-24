import Head from 'next/head';
import IntroWrapper from './_components/intro-wrapper';

const IntroPage = () => {
  return (
    <>
      <Head>
        <title>Giới thiệu | Gấu Lermao</title>
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://www.lermao.com/gioi-thieu" />
      </Head>
      <IntroWrapper />
    </>
  );
};

export default IntroPage;
