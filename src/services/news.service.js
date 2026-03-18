// src/services/news.service.js
import { API } from '@/utils/API';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

/**
 * Hook lấy danh sách news theo type (dùng client endpoint, tự filter site_code + is_visible)
 */
export const useQueryNewsByType = (type, pageSize = 12) => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword');
  const queryKey = ['GET_NEWS_BY_TYPE', type, pageNumber, keyword, pageSize];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/get-all',
        params: {
          pageNumber: pageNumber - 1,
          pageSize,
          title: keyword || undefined,
          type
        }
      }),
    enabled: !!type
  });
};

/**
 * Hook tìm id bài viết theo slug + type
 */
export const useQueryFindIdBySlug = (slug, type) => {
  const queryKey = ['FIND_ID_BY_SLUG', slug, type];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/find-id-by-slug',
        params: { slug, type }
      }),
    enabled: !!(slug && type),
    staleTime: 5 * 60 * 1000
  });
};

/**
 * Hook lấy chi tiết bài viết theo id
 */
export const useQueryNewsDetail = (id) => {
  const queryKey = ['GET_NEWS_DETAIL', id];

  return useQuery({
    queryKey,
    queryFn: () => API.request({ url: `/api/news/client/${id}` }),
    enabled: !!id
  });
};

/**
 * Hook lấy bài viết liên quan cùng type (loại trừ bài hiện tại)
 */
export const useQueryRelatedNews = (type, excludeId, limit = 6) => {
  const queryKey = ['GET_RELATED_NEWS', type, excludeId, limit];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/news/client/get-all',
        params: { pageNumber: 0, pageSize: limit + 1, type }
      });
      const { content = [] } = response || {};
      const filtered = excludeId ? content.filter((a) => a.id !== excludeId) : content;
      return filtered.slice(0, limit);
    },
    enabled: !!type,
    staleTime: 5 * 60 * 1000
  });
};
