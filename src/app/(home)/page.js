// src/app/(home)/page.js
import { serverFetchJSON } from '@/utils/server-fetch';
import HomeContact from './_components/contact';
import HomeIntro from './_components/intro';
import ProductMarquee from './_components/product-marquee';
import FeaturedProducts from './_components/featured-products';
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

async function fetchAllCategories() {
  try {
    const res = await serverFetchJSON('/api/category/for-cms');
    return res?.data || [];
  } catch (e) {
    console.error('Failed to fetch all categories:', e.message);
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

async function fetchFeaturedByCategories() {
  try {
    const res = await serverFetchJSON('/api/product/client/featured-by-categories');
    return Array.isArray(res) ? res : [];
  } catch (e) {
    console.error('Failed to fetch featured products:', e.message);
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

/**
 * Tìm root category (cấp cao nhất) của 1 category bất kỳ
 */
function findRootCategory(categoryId, allCategories) {
  let currentId = Number(categoryId);
  let current = allCategories.find((c) => Number(c.id) === currentId);
  let loops = 0;

  while (current && current.parent_id && loops < 20) {
    current = allCategories.find((c) => Number(c.id) === Number(current.parent_id));
    loops++;
  }

  return current || null;
}

/**
 * Gom tất cả featured products về theo root category
 * Input: featuredData (grouped by direct category), allCategories (full tree)
 * Output: grouped by ROOT category
 */
function groupFeaturedByRootCategory(featuredData, allCategories, rootCategories) {
  const rootMap = new Map();

  // Khởi tạo map theo thứ tự rootCategories
  for (const root of rootCategories) {
    rootMap.set(Number(root.id), {
      categoryId: Number(root.id),
      categoryName: root.name,
      categorySlug: root.slug,
      products: []
    });
  }

  // Gom products vào root tương ứng
  for (const group of featuredData) {
    const root = findRootCategory(group.categoryId, allCategories);
    if (!root) continue;

    const rootId = Number(root.id);
    let existing = rootMap.get(rootId);

    // Nếu root chưa tồn tại trong map (trường hợp rootCategories thiếu)
    if (!existing) {
      existing = {
        categoryId: rootId,
        categoryName: root.name,
        categorySlug: root.slug,
        products: []
      };
      rootMap.set(rootId, existing);
    }

    // Thêm products, loại trùng id
    const existingIds = new Set(existing.products.map((p) => Number(p.id)));
    for (const product of group.products) {
      if (!existingIds.has(Number(product.id))) {
        existing.products.push(product);
        existingIds.add(Number(product.id));
      }
    }
  }

  return Array.from(rootMap.values()).filter((g) => g.products.length > 0);
}

export default async function Home() {
  const [
    topProducts,
    bottomProducts,
    rootCategories,
    allCategories,
    reviews,
    featuredRaw,
    congThucArticles,
    workshopArticles,
    newsArticles
  ] = await Promise.all([
    fetchProductsByCategory(1000073082),
    fetchProductsByCategory(1000073084),
    fetchRootCategories(),
    fetchAllCategories(),
    fetchReviews(),
    fetchFeaturedByCategories(),
    fetchNewsByType('CONG_THUC_PHA_CHE', 10),
    fetchNewsByType('WORKSHOP', 10),
    fetchNewsByType('NEWS', 10)
  ]);

  // Gom featured products về root category
  const featuredData = groupFeaturedByRootCategory(featuredRaw, allCategories, rootCategories);

  const featuredCategories = allCategories
    .filter((cat) => cat.is_featured)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));

  return (
    <div>
      <HomeIntro />

      <ScrollReveal direction="up" delay={0}>
        <ProductMarquee topProducts={topProducts} bottomProducts={bottomProducts} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <CategoryShowcase categories={rootCategories} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <FeaturedProducts
          featuredData={featuredData}
          featuredCategories={featuredCategories}
          allCategories={allCategories}
        />
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
