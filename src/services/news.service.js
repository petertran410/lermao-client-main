import { API } from '@/utils/API';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useQueryNewsList = () => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword');
  const queryKey = ['GET_NEWS_LIST_CLIENT', keyword, pageNumber];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/get-all',
        params: { pageNumber: pageNumber - 1, title: keyword, type: 'NEWS' }
      })
  });
};
