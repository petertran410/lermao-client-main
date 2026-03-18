// src/app/workshop-pha-che/page.js
import { getMetadata } from '@/utils/helper-server';
import ArticleListTemplate from '@/components/article-list-template';

export const metadata = getMetadata({
  title: 'Workshop Pha Chế | Gấu Lermao',
  description:
    'Thông tin workshop pha chế đồ uống từ Gấu Lermao. Các buổi workshop thực hành, đào tạo pha chế chuyên nghiệp trên toàn quốc.'
});

const WorkshopPage = () => {
  return <ArticleListTemplate type="WORKSHOP" title="Workshop Pha Chế" basePath="/workshop-pha-che" pageSize={12} />;
};

export default WorkshopPage;
