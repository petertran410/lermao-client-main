import { PX_ALL } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Suspense } from 'react';
import TopProduct from '../(home)/_components/top-product';
import ProductDescription from './_components/description';
import ProductFilter from './_components/product-filter';
import ProductList from './_components/product-list';
import ProductTabs from './_components/product-tabs';

export const metadata = getMetadata({ title: 'Sản phẩm | Gấu Lermao' });

const Product = () => {
  return (
    <Suspense>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/san-pham`} />
      </Head>

      <Flex direction="column" px={PX_ALL} pt="40px" gap="32px" pos="relative" zIndex={10}>
        <ProductTabs />
        <ProductDescription />
        <TopProduct />
        <ProductFilter />
        <ProductList />
      </Flex>
    </Suspense>
  );
};

export default Product;
