import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery, useMutation } from '@tanstack/react-query';

const PRODUCTS_PER_PAGE = 15;

export const useQueryProductList = (options = {}) => {
  const params = useGetParamsURL();
  const { page: pageFromURL = 1 } = params;
  const { currentPage, enabled = true } = options;
  const activePage = currentPage || pageFromURL;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT', activePage];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/client/get-all',
        params: {
          pageNumber: activePage - 1,
          pageSize: PRODUCTS_PER_PAGE
        }
      }),
    enabled,
    staleTime: 2 * 60 * 1000
  });
};

export const useQueryProductsByCategories = (categoryIds = [], options = {}) => {
  const { currentPage = 1, enabled = true } = options;
  const queryKey = ['GET_PRODUCTS_BY_CATEGORIES', categoryIds.join(','), currentPage];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/client/get-all',
        params: {
          pageNumber: 0,
          pageSize: 1000,
          categoryIds: categoryIds.join(','),
          is_visible: 'true'
        }
      });
    },
    enabled: Array.isArray(categoryIds) && categoryIds.length > 0 && enabled,
    staleTime: 2 * 60 * 1000
  });
};

export const useQueryFeaturedByCategories = () => {
  const queryKey = ['GET_FEATURED_BY_CATEGORIES'];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/client/featured-by-categories'
      }),
    staleTime: 5 * 60 * 1000
  });
};

export const useQueryProductListOther = () => {
  const queryKey = ['GET_PRODUCT_LIST_CLIENT_OTHER'];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/by-categories',
        params: { pageNumber: 0, pageSize: 10 }
      }).then((res) => res?.content);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

export const useQueryProductByIds = (productIds = []) => {
  const queryKey = ['GET_PRODUCT_LIST_BY_IDS_CLIENT', ...productIds];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/cache-list-products',
        params: { productIds: productIds.join(',') }
      }),
    enabled: Array.isArray(productIds) && !!productIds.length,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

export const useQueryProductDetail = (id) => {
  const queryKey = ['GET_PRODUCT_DETAIL_CLIENT', id];

  return useQuery({
    queryKey,
    queryFn: () => API.request({ url: `/api/product/get-by-id/${id}` }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
};

export const useQueryProductBySlugs = (slugs) => {
  const queryKey = ['GET_PRODUCTS_BY_SLUGS', slugs];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const productPromises = slugs.map((slug) =>
        API.request({
          url: `/api/product/client/find-by-slug/${slug}`,
          method: 'GET'
        })
      );

      const products = await Promise.allSettled(productPromises);
      return products.filter((result) => result.status === 'fulfilled').map((result) => result.value);
    },
    enabled: !!slugs && slugs.length > 0,
    staleTime: 5 * 60 * 1000
  });
};

export const useMutateRating = () => {
  return useMutation({
    mutationFn: (params) =>
      API.request({
        url: '/api/user/review',
        params,
        method: 'POST'
      })
  });
};

export const useQueryRatingList = (productId) => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1 } = params;
  const queryKey = ['GET_RATING_LIST_CLIENT', pageNumber, productId];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: `/api/product/review/${productId}`,
        params: {
          pageNumber: pageNumber - 1,
          pageSize: 100
        }
      });
    },
    enabled: productId === 0 || !!productId
  });
};
