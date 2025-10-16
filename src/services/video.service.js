import { API } from '@/utils/API';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useQueryVideoList = () => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword');
  const queryKey = ['GET_VIDEO_LIST_CLIENT', keyword, pageNumber];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/get-all',
        params: { pageNumber: pageNumber - 1, title: keyword, type: 'VIDEO' }
      })
  });
};
