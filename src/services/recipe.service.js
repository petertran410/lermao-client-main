import { API } from '@/utils/API';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useQueryRecipeList = () => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword');
  const queryKey = ['GET_RECIPE_LIST_CLIENT', pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/search',
        params: { pageNumber: pageNumber - 1, title: keyword, type: 'CONG_THUC' }
      })
  });
};
