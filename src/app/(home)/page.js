import { serverFetchJSON } from '@/utils/server-fetch';
import HomeContact from './_components/contact';
import HomeIntro from './_components/intro';
import ProductMarquee from './_components/product-marquee';
import CategoryShowcase from './_components/category-showcase';
import ReviewCarousel from './_components/review-carousel';
import ScrollReveal from './_components/scroll-reveal';

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

async function fetchRootCategories() {
  try {
    const res = await serverFetchJSON('/api/category/for-cms');
    const all = res?.data || [];
    return all
      .filter((cat) => !cat.parent_id)
      .sort((a, b) => (a.priority || 0) - (b.priority || 0))
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image_url: cat.image_url
      }));
  } catch (e) {
    console.error('Failed to fetch root categories:', e.message);
    return [];
  }
}

async function fetchReviews() {
  try {
    const res = await serverFetchJSON('/api/review/client/testimonials');
    return Array.isArray(res) ? res : [];
  } catch (e) {
    console.error('Failed to fetch reviews:', e.message);
    return [];
  }
}

export default async function Home() {
  const [topProducts, bottomProducts, rootCategories, reviews] = await Promise.all([
    fetchProductsByCategory(1000073082),
    fetchProductsByCategory(1000073086),
    fetchRootCategories(),
    fetchReviews()
  ]);

  return (
    <div>
      <HomeIntro />

      <ScrollReveal direction="up" delay={0}>
        <ProductMarquee topProducts={topProducts} bottomProducts={bottomProducts} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <CategoryShowcase categories={rootCategories} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <ReviewCarousel reviews={reviews} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <HomeContact />
      </ScrollReveal>
    </div>
  );
}
