import { getMetadata } from '@/utils/helper-server';
import { Suspense } from 'react';
import ProductPageWrapper from './_components/product-page-wrapper';

export const metadata = getMetadata({
  title: 'Nguyên Liệu Pha Chế LerMao | Nguồn Hàng Giá Tốt',
  description:
    'Bạn đang tìm nguyên liệu pha chế chất lượng? Gấu LerMao là nguồn hàng uy tín, hỗ trợ công thức pha chế độc quyền và giải pháp vận hành tối ưu. Mứt ngon, topping xu hướng, giao hàng toàn quốc!'
});

const Product = () => {
  return (
    <Suspense>
      <ProductPageWrapper categorySlug={[]} />
    </Suspense>
  );
};

export default Product;
