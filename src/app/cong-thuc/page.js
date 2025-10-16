import { getMetadata } from '@/utils/helper-server';
import Head from 'next/head';
import RecipeList from './_components/recipe-list';

export const metadata = getMetadata({ title: 'Công thức | Gấu Lermao' });

const Recipe = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/cong-thuc`} />
      </Head>
      <RecipeList />
    </>
  );
};

export default Recipe;
