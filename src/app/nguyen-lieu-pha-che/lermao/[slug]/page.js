import { API } from '@/utils/API';
import { META_DESCRIPTION } from '@/utils/helper-server';
import { serverFetchJSON } from '@/utils/server-fetch';
import { notFound } from 'next/navigation';
import ProductDetailClient from './_components/product-detail-client';

export async function generateMetadata({ params }) {
  const { slug } = params;

  let data = {};
  try {
    data = await serverFetchJSON(`/api/product/client/find-by-slug/${slug}`);
  } catch (e) {
    data = {};
  }

  const { title: titleData, imagesUrl, title_meta, general_description } = data || {};
  const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.png';
  const title = title_meta || `${titleData} | Gấu Lermao`;
  const description = general_description || META_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}

const ProductDetail = async ({ params }) => {
  const { slug } = params;

  let productDetail;
  try {
    productDetail = await API.request({ url: `/api/product/client/find-by-slug/${slug}` });
  } catch (e) {
    productDetail = null;
  }

  if (!productDetail) {
    notFound();
  }

  let relatedProducts = [];
  try {
    if (productDetail.categoryId) {
      const res = await API.request({
        url: '/api/product/client/get-all',
        params: {
          pageSize: 8,
          pageNumber: 0,
          categoryId: productDetail.categoryId,
          excludeProductId: productDetail.id,
          randomize: 'true'
        }
      });
      relatedProducts = res?.content || [];
    }
  } catch (e) {
    relatedProducts = [];
  }

  return <ProductDetailClient productDetail={productDetail} relatedProducts={relatedProducts} />;
};

export default ProductDetail;
