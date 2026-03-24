import { getMetadata } from '@/utils/helper-server';
import { Suspense } from 'react';
import ProductPageWrapper from './_components/product-page-wrapper';

export const metadata = getMetadata({
  title: 'Nguyên Liệu Pha Chế LerMao | Nguồn Hàng Giá Tốt',
  description:
    'Bạn đang tìm nguyên liệu pha chế chất lượng? Gấu LerMao là nguồn hàng uy tín, chuyên cung cấp: Topping xu hướng, mứt trái cây, hạt nổ, bột pha chế... Nguồn ổn định, giá cạnh tranh. Khám phá ngay!'
});

const Product = () => {
  return (
    <Suspense>
      <ProductPageWrapper categorySlug={[]} />
    </Suspense>
  );
};

export default Product;
