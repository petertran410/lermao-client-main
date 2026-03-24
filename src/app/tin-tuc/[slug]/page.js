import { META_DESCRIPTION, META_URL } from '@/utils/helper-server';
import { serverFetchJSON } from '@/utils/server-fetch';
import ArticleDetailClient from '@/components/article-detail-template';

const NEWS_TYPE = 'NEWS';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const idData = await serverFetchJSON(`/api/news/client/find-id-by-slug?slug=${slug}&type=${NEWS_TYPE}`);
    if (!idData?.id) return { title: 'Tin tức | Gấu Lermao', description: META_DESCRIPTION };

    const data = await serverFetchJSON(`/api/news/client/${idData.id}`);
    const { title: titleData, imagesUrl, description, titleMeta } = data || {};
    const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.png';
    const title = titleMeta || `${titleData}`;
    const canonicalUrl = `${META_URL}/tin-tuc/${slug}`;

    return {
      title,
      description: description || META_DESCRIPTION,
      alternates: {
        canonical: canonicalUrl
      },
      openGraph: {
        title,
        description: description || META_DESCRIPTION,
        url: canonicalUrl,
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
    return { title: 'Tin tức | Gấu Lermao', description: META_DESCRIPTION };
  }
}

const TinTucDetailPage = ({ params }) => {
  const { slug } = params;

  return (
    <ArticleDetailClient
      slug={slug}
      type={NEWS_TYPE}
      basePath="/tin-tuc"
      breadcrumbTitle="Tin tức"
      backLabel="Quay lại tin tức"
    />
  );
};

export default TinTucDetailPage;
