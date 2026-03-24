// src/app/workshop-pha-che/[slug]/page.js
import { META_DESCRIPTION } from '@/utils/helper-server';
import { serverFetchJSON } from '@/utils/server-fetch';
import ArticleDetailClient from '@/components/article-detail-template';

const NEWS_TYPE = 'WORKSHOP';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const idData = await serverFetchJSON(`/api/news/client/find-id-by-slug?slug=${slug}&type=${NEWS_TYPE}`);
    if (!idData?.id) return { title: 'Workshop Pha Chế | Gấu Lermao', description: META_DESCRIPTION };

    const data = await serverFetchJSON(`/api/news/client/${idData.id}`);
    const { title: titleData, imagesUrl, description, titleMeta } = data || {};
    const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.png';
    const title = titleMeta || `${titleData}`;

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
    return { title: 'Workshop Pha Chế | Gấu Lermao', description: META_DESCRIPTION };
  }
}

const WorkshopDetailPage = ({ params }) => {
  const { slug } = params;

  return (
    <ArticleDetailClient
      slug={slug}
      type={NEWS_TYPE}
      basePath="/workshop-pha-che"
      breadcrumbTitle="Workshop Pha Chế"
      backLabel="Quay lại workshop"
    />
  );
};

export default WorkshopDetailPage;
