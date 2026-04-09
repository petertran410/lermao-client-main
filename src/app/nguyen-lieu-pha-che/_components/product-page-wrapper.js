'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
import { motion, AnimatePresence } from 'framer-motion';
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

const t = (key) => {
  const map = {
    'product.title': 'Nguyên Liệu Pha Chế LerMao',
    'product.breadcrumb.title.home': 'Trang Chủ',
    'product.breadcrumb.title.product': 'Nguyên Liệu Pha Chế',
    'product.all.product': 'Nguyên Liệu Pha Chế',
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
};

const ProductPageWrapper = ({ categorySlug = [] }) => {
  const router = useRouter();
  const searchInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState('name');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subCategoryId, setSubCategoryId] = useState(null);

  const pageVariants = {
    enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.25 } }
    },
    exit: (direction) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.97,
      transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }
    })
  };

  const MotionBox = motion(Box);

  const [pageDirection, setPageDirection] = useState(1);

  const { data: topCategories = [], isLoading: categoriesLoading } = useQueryTopLevelCategories();
  const { data: allCategories = [], isLoading: allCategoriesLoading } = useQueryAllCategories();

  // Đọc category từ URL path
  useEffect(() => {
    if (!categorySlug || categorySlug.length === 0) {
      setSelectedCategory('all');
      setSubCategoryId(null);
      return;
    }

    if (allCategories.length > 0) {
      // Tìm category theo slug path
      const findCategoryBySlugPath = (categories, slugPath) => {
        const foundCategories = [];

        for (let i = 0; i < slugPath.length; i++) {
          const currentSlugPath = slugPath.slice(0, i + 1).join('/');

          const found = categories.find((cat) => {
            const buildPath = (categoryId) => {
              const c = categories.find((cc) => cc.id === categoryId);
              if (!c) return '';
              if (!c.parent_id) return c.slug;
              const parentPath = buildPath(c.parent_id);
              return parentPath ? `${parentPath}/${c.slug}` : c.slug;
            };
            return buildPath(cat.id) === currentSlugPath;
          });

          if (found) {
            foundCategories.push(found);
          } else {
            break;
          }
        }

        return foundCategories;
      };

      const foundPath = findCategoryBySlugPath(allCategories, categorySlug);

      if (foundPath.length > 0) {
        const lastCategory = foundPath[foundPath.length - 1];

        if (!lastCategory.parent_id) {
          setSelectedCategory(lastCategory.id.toString());
          setSubCategoryId(null);
        } else {
          let rootCategory = lastCategory;
          while (rootCategory.parent_id) {
            const parent = allCategories.find((c) => c.id === rootCategory.parent_id);
            if (!parent) break;
            rootCategory = parent;
          }
          setSelectedCategory(rootCategory.id.toString());
          setSubCategoryId(lastCategory.id.toString());
        }
      } else {
        setSelectedCategory('all');
        setSubCategoryId(null);
      }
    }
  }, [categorySlug, allCategories]);

  const effectiveCategoryId = subCategoryId || selectedCategory;

  const { data: categoryHierarchy } = useQueryCategoryHierarchy(selectedCategory);

  const { data: categoryIds = [], isLoading: pathsLoading } = useQueryCategoryPaths(
    effectiveCategoryId && effectiveCategoryId !== 'all' ? parseInt(effectiveCategoryId) : null
  );

  const shouldUseCategoryFilter = effectiveCategoryId && effectiveCategoryId !== 'all' && categoryIds.length > 0;

  const { data: allProductsData, isLoading: allProductsLoading } = useQueryProductList({
    currentPage: 1,
    pageSize: 1000,
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

  // Navigate bằng URL path
  const handleTopCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      router.push('/nguyen-lieu-pha-che');
    } else {
      const category = topCategories.find((cat) => cat.id.toString() === categoryId.toString());
      if (category) {
        router.push(`/nguyen-lieu-pha-che/${category.slug}`);
      }
    }
    setCurrentPage(1);
  };

  const handleSidebarSelect = (url) => {
    // url từ sidebar có dạng /nguyen-lieu-pha-che/slug1/slug2
    router.push(url);
    setCurrentPage(1);
  };

  const getCategoryDisplayName = () => {
    if (selectedCategory === 'all') return t('product.title');

    if (subCategoryId && categoryHierarchy) {
      const findName = (children, targetId) => {
        if (!children || !Array.isArray(children)) return null;
        for (const cat of children) {
          if (cat.id.toString() === targetId.toString()) return cat.name;
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
    return cat ? cat.name : t('product.title');
  };

  const getBreadcrumbData = () => {
    const base = [
      { title: t('product.breadcrumb.title.home'), href: '/' },
      { title: t('product.breadcrumb.title.product'), href: '/nguyen-lieu-pha-che' }
    ];

    if (!categorySlug || categorySlug.length === 0) return base;

    let currentPath = '';
    categorySlug.forEach((slug, index) => {
      currentPath += (index === 0 ? '' : '/') + slug;
      const category = allCategories.find((cat) => cat.slug === slug);
      if (category) {
        base.push({
          title: category.name,
          href: index === categorySlug.length - 1 ? '#' : `/nguyen-lieu-pha-che/${currentPath}`,
          isActive: index === categorySlug.length - 1
        });
      }
    });

    return base;
  };

  return (
    <Container maxW="auto" py={8} px={PX_ALL} pt={{ base: '80px' }}>
      <VStack align="start" spacing="16px" mt="" mb="40px">
        <Breadcrumb data={getBreadcrumbData()} />

        <Heading as="h1" fontSize={{ base: '28px', lg: '36px' }} fontWeight={700} color="main.1">
          {getCategoryDisplayName()}
        </Heading>

        {/* Tabs danh mục cấp cao */}
        <Flex gap={3} flexWrap="wrap">
          <Button
            size="md"
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
                size="md"
                variant={isActive ? 'solid' : 'outline'}
                bg={isActive ? 'main.1' : 'white'}
                color={isActive ? 'white' : 'main.1'}
                borderColor="main.1"
                _hover={{ bg: 'main.1', color: 'white' }}
                onClick={() => handleTopCategoryClick(cat.id.toString())}
              >
                {cat.name}
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
      <Flex gap={8} align="start" direction={{ base: 'row', xs: 'column', md: 'column', lg: 'row' }}>
        {selectedCategory !== 'all' && (
          <Box
            display={{ base: 'block', lg: 'block' }}
            minW="260px"
            maxW={{ md: '220px', lg: '280px' }}
            position="sticky"
            top="180px"
          >
            <CategorySidebar
              selectedCategory={selectedCategory}
              selectedSubCategory={subCategoryId}
              onSubCategorySelect={handleSidebarSelect}
              fullCategories={allCategories}
              fullCategoriesLoading={allCategoriesLoading}
            />
          </Box>
        )}

        <Box flex={1}>
          {isLoading ? (
            <Center py={20}>
              <Spinner size="xl" color="main.1" />
            </Center>
          ) : products.length > 0 ? (
            <>
              <AnimatePresence mode="wait" custom={pageDirection}>
                <MotionBox
                  key={currentPage}
                  custom={pageDirection}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
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
                    {products.map((product, index) => (
                      <GridItem key={product.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.35, ease: 'easeOut' }}
                        >
                          <ProductItem item={product} />
                        </motion.div>
                      </GridItem>
                    ))}
                  </Grid>
                </MotionBox>
              </AnimatePresence>

              {totalPages > 1 && (
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setPageDirection(page > currentPage ? 1 : -1);
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
                    router.push('/nguyen-lieu-pha-che');
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
