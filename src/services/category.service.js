import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery } from '@tanstack/react-query';

export const useQueryAllCategories = () => {
  const queryKey = ['GET_ALL_CATEGORIES_FOR_SLUG_RESOLUTION'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });

      return response?.data || [];
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000
  });
};

export const useQueryCategoryList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_CATEGORY_LIST_CLIENT', keyword, pageNumber];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/paginated',
        params: { pageNumber, name: keyword, pageSize: 100 }
      });

      return response?.content || [];
    }
  });
};

export const useQueryCategoryListByParent = (parentId) => {
  const queryKey = ['GET_CATEGORY_LIST_BY_PARENT_CLIENT', parentId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/paginated',
        params: { pageNumber: 0, parentId, pageSize: 100 }
      });

      return response?.content || [];
    },
    enabled: typeof parentId !== 'undefined' && !!`${parentId}`.length
  });
};

export const useQueryTopLevelCategories = () => {
  const queryKey = ['GET_TOP_LEVEL_CATEGORIES_FOR_DROPDOWN'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });

      const allCategories = response?.data || [];

      const topLevelCategories = allCategories.filter((cat) => !cat.parent_id);

      return topLevelCategories
        .sort((a, b) => (a.priority || 0) - (b.priority || 0) || a.name.localeCompare(b.name))
        .map((cat) => ({
          id: cat.id,
          name: cat.name,
          name_en: cat.name_en,
          displayName: cat.displayName || cat.name,
          path: cat.path,
          slug: cat.slug
        }));
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000
  });
};

export const useQueryCategoryPaths = (parentCategoryId) => {
  const pid = parentCategoryId != null ? Number(parentCategoryId) : NaN;

  return useQuery({
    queryKey: ['GET_CATEGORY_PATHS', pid],
    enabled: Number.isFinite(pid),
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });

      const allCategories = response?.data || [];

      const collectCategoryTree = (parentId) => {
        const result = [parentId];

        const findChildren = (currentId) => {
          allCategories.forEach((cat) => {
            if (cat.parent_id === currentId && !result.includes(cat.id)) {
              result.push(cat.id);
              findChildren(cat.id);
            }
          });
        };

        findChildren(parentId);
        return result;
      };

      const categoryIds = collectCategoryTree(pid);
      return categoryIds;
    }
  });
};

export const useQueryCategoryHierarchy = (parentCategoryId) => {
  const queryKey = ['GET_CATEGORY_HIERARCHY', parentCategoryId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!parentCategoryId || parentCategoryId === 'all') return [];

      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });

      const allCategories = response?.data || [];

      const parentCategory = allCategories.find((cat) => cat.id.toString() === parentCategoryId.toString());
      if (!parentCategory) return [];

      const getChildrenRecursive = (parentId, level = 1) => {
        const children = allCategories.filter(
          (cat) => cat.parent_id && cat.parent_id.toString() === parentId.toString()
        );

        return children.map((child) => ({
          id: child.id,
          name: child.name,
          name_en: child.name_en,
          level: level,
          title_meta: child.title_meta,
          description: child.description,
          parent_id: child.parent_id,
          productCount: child.productCount || 0,
          hasChildren: allCategories.some((cat) => cat.parent_id === child.id),
          children: getChildrenRecursive(child.id, level + 1)
        }));
      };

      const hierarchy = {
        id: parentCategory.id,
        name: parentCategory.name,
        name_en: parentCategory.name_en,
        level: 0,
        parent_id: parentCategory.parent_id,
        title_meta: parentCategory.title_meta,
        productCount: parentCategory.productCount || 0,
        description: parentCategory.description,
        children: getChildrenRecursive(parentCategory.id)
      };

      return hierarchy;
    },
    enabled: !!parentCategoryId && parentCategoryId !== 'all',
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000
  });
};

export const useQueryCategoryBySlug = (slug) => {
  const queryKey = ['GET_CATEGORY_BY_SLUG', slug];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/category/client/find-by-slug/${slug}`
      }),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000
  });
};
