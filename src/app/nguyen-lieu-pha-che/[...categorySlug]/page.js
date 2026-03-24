import { getMetadata } from '../../../utils/helper-server';
import { serverFetchJSON } from '../../../utils/server-fetch';
import ProductPageWrapper from '../_components/product-page-wrapper';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

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

const CategoryProductsPage = async ({ params }) => {
  const { categorySlug } = params;
  const targetSlug = categorySlug?.[categorySlug.length - 1];

  if (targetSlug) {
    try {
      const data = await serverFetchJSON('/api/category/for-cms');
      const categories = data?.data || [];
      const found = categories.find((cat) => cat.slug === targetSlug);

      if (!found) {
        redirect('/nguyen-lieu-pha-che');
      }
    } catch (e) {
      redirect('/nguyen-lieu-pha-che');
    }
  }

  return (
    <Suspense>
      <ProductPageWrapper categorySlug={categorySlug} />
    </Suspense>
  );
};

export default CategoryProductsPage;
