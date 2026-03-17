import { PX_ALL } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Suspense } from 'react';
import ProductPageWrapper from './_components/product-page-wrapper';

export const metadata = getMetadata({ title: 'Sản phẩm | Gấu Lermao' });

const Product = () => {
  return (
    <Suspense>
      <ProductPageWrapper />
    </Suspense>
  );
};

export default Product;
