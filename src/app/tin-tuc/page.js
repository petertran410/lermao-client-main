// src/app/tin-tuc/page.js
import { getMetadata } from '@/utils/helper-server';
import ArticleListTemplate from '@/components/article-list-template';

export const metadata = getMetadata({ title: 'Tin tức | Gấu Lermao', path: '/tin-tuc' });

const TinTucPage = () => {
  return <ArticleListTemplate type="NEWS" title="Tin tức" basePath="/tin-tuc" pageSize={12} />;
};

export default TinTucPage;
