import { API } from '@/utils/API';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useQueryCategoryList = () => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') || 0;
  const keyword = searchParams.get('keyword');
  const queryKey = ['GET_CATEGORY_LIST_CLIENT', keyword, pageNumber];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/category/get-all',
        params: { pageNumber, title: keyword }
      })
  });
};
