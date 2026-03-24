import { getMetadata } from '../../../utils/helper-server';
import { serverFetchJSON } from '../../../utils/server-fetch';
import ProductPageWrapper from '../_components/product-page-wrapper';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
  const { categorySlug } = params;
  const targetSlug = categorySlug?.[categorySlug.length - 1];

  if (!targetSlug) {
    return getMetadata({ title: 'Nguyên Liệu Pha Chế' });
  }

  try {
    const data = await serverFetchJSON('/api/category/for-cms');
    const categories = data?.data || [];
    const found = categories.find((cat) => cat.slug === targetSlug);

    if (found) {
      return getMetadata({
        title: `${found.title_meta || found.name}`,
        description: found.description || undefined
      });
    }
  } catch (e) {}

  return getMetadata({ title: 'Nguyên Liệu Pha Chế' });
}

const CategoryProductsPage = ({ params }) => {
  return (
    <Suspense>
      <ProductPageWrapper categorySlug={params.categorySlug} />
    </Suspense>
  );
};

export default CategoryProductsPage;
