import { getMetadata } from '@/utils/helper-server';
import Head from 'next/head';
import { Suspense } from 'react';
import NewsList from './_components/news-list';

export const metadata = getMetadata({ title: 'Tin tức | Gấu Lermao' });

const News = () => {
  return (
    <Suspense>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/tin-tuc`} />
      </Head>
      <NewsList />
    </Suspense>
  );
};

export default News;
