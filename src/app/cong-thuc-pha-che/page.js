import { getMetadata } from '@/utils/helper-server';
import ArticleListTemplate from '@/components/article-list-template';

export const metadata = getMetadata({
  title: 'Công thức pha chế | Gấu Lermao',
  description:
    'Tổng hợp công thức pha chế đồ uống: trà sữa, café, trà trái cây, đá xay dễ làm – dễ bán. Phù hợp cho người mới, quán nhỏ và chủ F&B.',
  path: '/cong-thuc-pha-che'
});

const CongThucPage = () => {
  return (
    <ArticleListTemplate
      type="CONG_THUC_PHA_CHE"
      title="Công thức pha chế"
      basePath="/cong-thuc-pha-che"
      pageSize={12}
    />
  );
};

export default CongThucPage;
