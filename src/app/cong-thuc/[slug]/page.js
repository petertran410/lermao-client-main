// src/app/cong-thuc/[slug]/page.js
import { API } from '@/utils/API';
import { META_DESCRIPTION, META_KEYWORDS } from '@/utils/helper-server';
import { serverFetchJSON } from '@/utils/server-fetch';
import ArticleDetailClient from '@/components/article-detail-template';
import Script from 'next/script';

const NEWS_TYPE = 'CONG_THUC_PHA_CHE';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const idData = await serverFetchJSON(`/api/news/client/find-id-by-slug?slug=${slug}&type=${NEWS_TYPE}`);
    if (!idData?.id) return { title: 'Công thức | Gấu Lermao', description: META_DESCRIPTION };

    const data = await serverFetchJSON(`/api/news/client/${idData.id}`);
    const { title: titleData, imagesUrl, description, titleMeta } = data || {};
    const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.png';
    const title = titleMeta || `${titleData} | Gấu Lermao`;

    return {
      title,
      description: description || META_DESCRIPTION,
      openGraph: {
        title,
        description: description || META_DESCRIPTION,
        images: [{ url: imageUrl, width: 800, height: 600, alt: titleData }]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: description || META_DESCRIPTION,
        images: [imageUrl]
      }
    };
  } catch {
    return { title: 'Công thức | Gấu Lermao', description: META_DESCRIPTION };
  }
}

const CongThucDetailPage = ({ params }) => {
  const { slug } = params;

  return (
    <ArticleDetailClient
      slug={slug}
      type={NEWS_TYPE}
      basePath="/cong-thuc"
      breadcrumbTitle="Công thức"
      backLabel="Quay lại công thức"
    />
  );
};

export default CongThucDetailPage;
