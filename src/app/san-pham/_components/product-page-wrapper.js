'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  VStack,
  Heading,
  Flex,
  HStack,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
  Text,
  Button,
  Spinner,
  Center
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { PX_ALL } from '../../../utils/const';
import Breadcrumb from '../../../components/breadcrumb';
import ProductItem from '../../../components/product-item';
import ProductPagination from './product-pagination';
import CategorySidebar from './category-sidebar';
import { useQueryProductList, useQueryProductsByCategories } from '../../../services/product.service';
import {
  useQueryTopLevelCategories,
  useQueryCategoryPaths,
  useQueryCategoryHierarchy,
  useQueryAllCategories
} from '../../../services/category.service';

const PRODUCTS_PER_PAGE = 15;

const useTranslation = () => ({
  t: (key) => {
    const map = {
      'product.title': 'Tất cả sản phẩm',
      'product.breadcrumb.title.home': 'Trang chủ',
      'product.breadcrumb.title.product': 'Sản phẩm',
      'product.all.product': 'Tất cả danh mục',
      'product.sorting.name': 'Tên A-Z',
      'product.sorting.price.low': 'Giá thấp → cao',
      'product.sorting.price.high': 'Giá cao → thấp',
      'product.searching.placeholder': 'Tìm kiếm sản phẩm...',
      'product.searching.name': 'Tìm',
      'product.not.found': 'Không tìm thấy sản phẩm',
      'product.reset.search': 'Đặt lại bộ lọc',
      'category.title': 'Danh mục'
    };
    return map[key] || key;
  },
  getLocalizedText: (vi, en) => vi,
  language: 'vi'
});

const ProductPageWrapper = () => {
  const { getLocalizedText, t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState('name');

  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subCategoryId, setSubCategoryId] = useState(null);

  const { data: topCategories = [], isLoading: categoriesLoading } = useQueryTopLevelCategories();
  const { data: allCategories = [], isLoading: allCategoriesLoading } = useQueryAllCategories();

  // Đọc category từ URL param
  useEffect(() => {
    if (!categoryParam) {
      setSelectedCategory('all');
      setSubCategoryId(null);
      return;
    }

    if (allCategories.length > 0) {
      const found = allCategories.find((cat) => cat.slug === categoryParam);
      if (found) {
        if (!found.parent_id) {
          setSelectedCategory(found.id.toString());
          setSubCategoryId(null);
        } else {
          let rootCategory = found;
          while (rootCategory.parent_id) {
            const parent = allCategories.find((c) => c.id === rootCategory.parent_id);
            if (!parent) break;
            rootCategory = parent;
          }
          setSelectedCategory(rootCategory.id.toString());
          setSubCategoryId(found.id.toString());
        }
      }
    }
  }, [categoryParam, allCategories]);

  const effectiveCategoryId = subCategoryId || selectedCategory;

  const { data: categoryHierarchy, isLoading: hierarchyLoading } = useQueryCategoryHierarchy(selectedCategory);

  const { data: categoryIds = [], isLoading: pathsLoading } = useQueryCategoryPaths(
    effectiveCategoryId && effectiveCategoryId !== 'all' ? parseInt(effectiveCategoryId) : null
  );

  const shouldUseCategoryFilter = effectiveCategoryId && effectiveCategoryId !== 'all' && categoryIds.length > 0;

  const { data: allProductsData, isLoading: allProductsLoading } = useQueryProductList({
    currentPage: searchTerm.trim() ? 1 : currentPage,
    enabled: !shouldUseCategoryFilter
  });

  const { data: categoryProductsData, isLoading: categoryProductsLoading } = useQueryProductsByCategories(categoryIds, {
    currentPage: searchTerm.trim() ? 1 : currentPage,
    enabled: shouldUseCategoryFilter
  });

  const isLoading =
    categoriesLoading ||
    allCategoriesLoading ||
    pathsLoading ||
    (shouldUseCategoryFilter ? categoryProductsLoading : allProductsLoading);

  const productsData = shouldUseCategoryFilter ? categoryProductsData : allProductsData;

  const processedProducts = useMemo(() => {
    let items = productsData?.content || [];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      items = items.filter((p) => {
        const name = (p.title || p.kiotviet_name || '').toLowerCase();
        return name.includes(term);
      });
    }

    const sorted = [...items];
    switch (currentSort) {
      case 'price-low':
        sorted.sort((a, b) => (a.price || a.kiotviet_price || 0) - (b.price || b.kiotviet_price || 0));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.price || b.kiotviet_price || 0) - (a.price || a.kiotviet_price || 0));
        break;
      case 'name':
      default:
        sorted.sort((a, b) => (a.title || a.kiotviet_name || '').localeCompare(b.title || b.kiotviet_name || ''));
        break;
    }

    return sorted;
  }, [productsData, searchTerm, currentSort]);

  const totalElements = processedProducts.length;
  const totalPages = Math.ceil(totalElements / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const products = processedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleSearch = () => {
    const value = searchInputRef.current?.value || '';
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryId) => {
    const category = allCategories.find((cat) => cat.id === categoryId);
    if (category) {
      router.push(`/san-pham?category=${category.slug}`, { scroll: false });
    }
    setCurrentPage(1);
  };

  const handleTopCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      router.push('/san-pham', { scroll: false });
    } else {
      const category = topCategories.find((cat) => cat.id.toString() === categoryId.toString());
      if (category) {
        router.push(`/san-pham?category=${category.slug}`, { scroll: false });
      }
    }
    setSubCategoryId(null);
    setCurrentPage(1);
  };

  const getCategoryDisplayName = () => {
    if (selectedCategory === 'all') return t('product.title');

    if (subCategoryId && categoryHierarchy) {
      const findName = (children, targetId) => {
        if (!children || !Array.isArray(children)) return null;
        for (const cat of children) {
          if (cat.id.toString() === targetId.toString()) return getLocalizedText(cat.name, cat.name_en);
          if (cat.children?.length > 0) {
            const found = findName(cat.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };
      const name = findName(categoryHierarchy.children, subCategoryId);
      if (name) return name;
    }

    const cat = topCategories.find((c) => c.id.toString() === selectedCategory.toString());
    return cat ? getLocalizedText(cat.name, cat.name_en) : t('product.title');
  };

  const getBreadcrumbData = () => {
    const base = [
      { title: t('product.breadcrumb.title.home'), href: '/' },
      { title: t('product.breadcrumb.title.product'), href: '/san-pham' }
    ];

    if (selectedCategory === 'all') return base;

    const rootCat = topCategories.find((c) => c.id.toString() === selectedCategory.toString());
    if (rootCat) {
      base.push({
        title: getLocalizedText(rootCat.name, rootCat.name_en),
        href: `/san-pham?category=${rootCat.slug}`
      });
    }

    if (subCategoryId) {
      const subCat = allCategories.find((c) => c.id.toString() === subCategoryId.toString());
      if (subCat) {
        base.push({
          title: getLocalizedText(subCat.name, subCat.name_en),
          href: '#',
          isActive: true
        });
      }
    }

    return base;
  };

  return (
    <Container maxW="auto" py={8} px={PX_ALL} pt={{ base: '80px', lg: '180px' }}>
      <VStack align="start" spacing="16px" mt="20px" mb="40px">
        <Breadcrumb data={getBreadcrumbData()} />

        <Heading as="h1" fontSize={{ base: '28px', lg: '36px' }} fontWeight={700} color="main.1">
          {getCategoryDisplayName()}
        </Heading>

        {/* Tabs danh mục cấp cao */}
        <Flex gap={3} flexWrap="wrap">
          <Button
            size="sm"
            variant={selectedCategory === 'all' ? 'solid' : 'outline'}
            bg={selectedCategory === 'all' ? 'main.1' : 'white'}
            color={selectedCategory === 'all' ? 'white' : 'main.1'}
            borderColor="main.1"
            _hover={{ bg: 'main.1', color: 'white' }}
            onClick={() => handleTopCategoryClick('all')}
          >
            {t('product.all.product')}
          </Button>
          {topCategories.map((cat) => {
            const isActive = selectedCategory === cat.id.toString();
            return (
              <Button
                key={cat.id}
                size="sm"
                variant={isActive ? 'solid' : 'outline'}
                bg={isActive ? 'main.1' : 'white'}
                color={isActive ? 'white' : 'main.1'}
                borderColor="main.1"
                _hover={{ bg: 'main.1', color: 'white' }}
                onClick={() => handleTopCategoryClick(cat.id.toString())}
              >
                {getLocalizedText(cat.name, cat.name_en)}
              </Button>
            );
          })}
        </Flex>

        {/* Search + Sort */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          w="full"
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <HStack spacing={4} flex={1}>
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                ref={searchInputRef}
                placeholder={t('product.searching.placeholder')}
                defaultValue={searchTerm}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                bg="white"
                border="1px solid #E2E8F0"
              />
            </InputGroup>
            <Button bg="main.1" color="white" _hover={{ opacity: 0.8 }} onClick={handleSearch}>
              {t('product.searching.name')}
            </Button>
          </HStack>

          <Select
            maxW="200px"
            value={currentSort}
            onChange={(e) => {
              setCurrentSort(e.target.value);
              setCurrentPage(1);
            }}
            bg="white"
          >
            <option value="name">{t('product.sorting.name')}</option>
            <option value="price-low">{t('product.sorting.price.low')}</option>
            <option value="price-high">{t('product.sorting.price.high')}</option>
          </Select>
        </Flex>
      </VStack>

      {/* Layout: Sidebar + Product Grid */}
      <Flex gap={8} align="start">
        {/* Sidebar */}
        {selectedCategory !== 'all' && (
          <Box display={{ base: 'none', lg: 'block' }} minW="260px" maxW="280px" position="sticky" top="180px">
            <CategorySidebar
              selectedCategory={selectedCategory}
              selectedSubCategory={subCategoryId}
              onSubCategorySelect={(url) => {
                // url sẽ là slug path, ta chỉ lấy slug cuối
                const slugParts = url.replace('/san-pham/', '').split('/');
                const lastSlug = slugParts[slugParts.length - 1];
                router.push(`/san-pham?category=${lastSlug}`, { scroll: false });
                setCurrentPage(1);
              }}
              fullCategories={allCategories}
              fullCategoriesLoading={allCategoriesLoading}
            />
          </Box>
        )}

        {/* Product Grid */}
        <Box flex={1}>
          {isLoading ? (
            <Center py={20}>
              <Spinner size="xl" color="main.1" />
            </Center>
          ) : products.length > 0 ? (
            <>
              {/* <Text mb={4} color="gray.600" fontSize="sm">
                {totalElements} {t('product.title').toLowerCase()}
              </Text> */}

              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  xl: selectedCategory !== 'all' ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                  '2xl': selectedCategory !== 'all' ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)'
                }}
                gap={6}
                mb={10}
              >
                {products.map((product) => (
                  <GridItem key={product.id}>
                    <ProductItem item={product} />
                  </GridItem>
                ))}
              </Grid>

              {totalPages > 1 && (
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}
            </>
          ) : (
            <Center py={20}>
              <VStack spacing={4}>
                <Text fontSize="xl" fontWeight="500" color="gray.600">
                  {t('product.not.found')}
                </Text>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    if (searchInputRef.current) searchInputRef.current.value = '';
                    router.push('/san-pham');
                  }}
                  variant="outline"
                  borderColor="main.1"
                  color="main.1"
                  _hover={{ bg: 'main.1', color: 'white' }}
                >
                  {t('product.reset.search')}
                </Button>
              </VStack>
            </Center>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default ProductPageWrapper;
