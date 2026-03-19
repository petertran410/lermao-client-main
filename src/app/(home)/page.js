// src/app/(home)/page.js
import { serverFetchJSON } from '@/utils/server-fetch';
import HomeContact from './_components/contact';
import HomeIntro from './_components/intro';
import ProductMarquee from './_components/product-marquee';
import CategoryShowcase from './_components/category-showcase';
import ReviewCarousel from './_components/review-carousel';
import ScrollReveal from './_components/scroll-reveal';
import ArticleCategoryShowcase from './_components/article-category-showcase';
import HomeBlogSection from './_components/home-blog-section';

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

async function fetchNewsByType(type, pageSize = 10) {
  try {
    const params = new URLSearchParams({
      pageSize: String(pageSize),
      pageNumber: '0',
      type
    });
    const res = await serverFetchJSON(`/api/news/client/get-all?${params.toString()}`);
    return res?.content || [];
  } catch (e) {
    console.error(`Failed to fetch news type ${type}:`, e.message);
    return [];
  }
}

export default async function Home() {
  const [topProducts, bottomProducts, rootCategories, reviews, congThucArticles, workshopArticles, newsArticles] =
    await Promise.all([
      fetchProductsByCategory(1000073082),
      fetchProductsByCategory(1000073086),
      fetchRootCategories(),
      fetchReviews(),
      fetchNewsByType('CONG_THUC_PHA_CHE', 10),
      fetchNewsByType('WORKSHOP', 10),
      fetchNewsByType('NEWS', 10)
    ]);

  return (
    <div>
      <HomeIntro />

      <ScrollReveal direction="up" delay={0}>
        <ProductMarquee topProducts={topProducts} bottomProducts={bottomProducts} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <CategoryShowcase categories={rootCategories} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <ReviewCarousel reviews={reviews} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <ArticleCategoryShowcase />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.25}>
        <HomeBlogSection
          congThucArticles={congThucArticles}
          workshopArticles={workshopArticles}
          newsArticles={newsArticles}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <HomeContact />
      </ScrollReveal>
    </div>
  );
}
