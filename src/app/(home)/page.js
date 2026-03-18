import { serverFetchJSON } from '@/utils/server-fetch';
import HomeContact from './_components/contact';
import HomeIntro from './_components/intro';
import ProductMarquee from './_components/product-marquee';

export const revalidate = 60;

async function fetchProductsByCategory(categoryId) {
  try {
    const searchParams = new URLSearchParams({
      pageSize: '100',
      pageNumber: '0',
      categoryId: String(categoryId)
    });
    const res = await serverFetchJSON(`/api/product/client/get-all?${searchParams.toString()}`);
    const products = res?.content || [];
    return products.filter((p) => Array.isArray(p.imagesUrl) && p.imagesUrl.length > 0 && p.imagesUrl[0]);
  } catch (e) {
    console.error(`Failed to fetch products for category ${categoryId}:`, e.message);
    return [];
  }
}

export default async function Home() {
  const [topProducts, bottomProducts] = await Promise.all([
    fetchProductsByCategory(1000073082),
    fetchProductsByCategory(1000073084)
  ]);

  return (
    <div>
      <HomeIntro />
      <ProductMarquee topProducts={topProducts} bottomProducts={bottomProducts} />
      <HomeContact />
    </div>
  );
}
