import { API } from '@/utils/API';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const FILTER_OPTIONS = [
  {
    label: 'Từ A-Z',
    value: 'title-az',
    objectParams: {
      isDesc: false,
      orderBy: 'title'
    }
  },
  {
    label: 'Từ Z-A',
    value: 'title-za',
    objectParams: {
      isDesc: true,
      orderBy: 'title'
    }
  },
  {
    label: 'Giá tăng dần',
    value: 'price-increase',
    objectParams: {
      isDesc: false,
      orderBy: 'price'
    }
  },
  {
    label: 'Giá giảm dần',
    value: 'price-decrease',
    objectParams: {
      isDesc: true,
      orderBy: 'price'
    }
  }
];

export const useQueryProductList = () => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword');
  const sort = searchParams.get('sort');
  const categoryId = searchParams.get('categoryId');
  const queryKey = ['GET_PRODUCT_LIST_CLIENT', pageNumber, keyword, categoryId, sort];

  return useQuery({
    queryKey,
    queryFn: () => {
      let sortParams = {};
      if (sort) {
        const currentSort = FILTER_OPTIONS.find((i) => i.value === sort);
        if (currentSort) {
          sortParams = currentSort.objectParams;
        }
      }

      return API.request({
        url: '/api/product/search',
        params: { pageNumber: pageNumber - 1, title: keyword, categoryId, type: 'SAN_PHAM', ...sortParams }
      });
    }
  });
};

export const useQueryTopProducts = () => {
  const queryKey = ['GET_PRODUCT_LIST_TOP_CLIENT'];
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') || 0;
  const keyword = searchParams.get('keyword');
  const categoryId = searchParams.get('categoryId');

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/search',
        params: { pageNumber, title: keyword, categoryId, type: 'SAN_PHAM', isFeatured: true, pageSize: 10 }
      })
  });
};

export const useQueryProductByIds = (productIds) => {
  const queryKey = ['GET_PRODUCT_LIST_BY_IDS_CLIENT'];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/cache-list-products',
        params: { productIds: productIds.join(',') }
      }),
    enabled: Array.isArray(productIds) && !!productIds.length
  });
};
