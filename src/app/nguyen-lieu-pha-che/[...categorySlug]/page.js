import { getMetadata } from '../../../utils/helper-server';
import { serverFetchJSON } from '../../../utils/server-fetch';
import ProductPageWrapper from '../_components/product-page-wrapper';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
  const { categorySlug } = params;
  const slugPath = categorySlug?.join('/');
  const targetSlug = categorySlug?.[categorySlug.length - 1];
  const path = `/nguyen-lieu-pha-che/${slugPath}`;

  if (!targetSlug) {
    return getMetadata({ title: 'Nguyên Liệu Pha Chế', path: '/nguyen-lieu-pha-che' });
  }

  try {
    const data = await serverFetchJSON('/api/category/for-cms');
    const categories = data?.data || [];
    const found = categories.find((cat) => cat.slug === targetSlug);

    if (found) {
      return getMetadata({
        title: `${found.title_meta || found.name}`,
        description: found.description || undefined,
        path
      });
    }
  } catch (e) {}

  return getMetadata({ title: 'Nguyên Liệu Pha Chế', path });
}

const CategoryProductsPage = ({ params }) => {
  return (
    <Suspense>
      <ProductPageWrapper categorySlug={params.categorySlug} />
    </Suspense>
  );
};

export default CategoryProductsPage;
