'use client';

import { useState, useEffect } from 'react';
import { Box, VStack, Text, Button, Collapse, HStack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useQueryCategoryHierarchy } from '../../../services/category.service';

const SIDEBAR_EXPANSION_KEY = 'category_sidebar_expansion';

const CategoryItem = ({
  category,
  level = 0,
  selectedSubCategory,
  onSubCategorySelect,
  expandedCategories,
  onToggleExpand,
  allCategories
}) => {
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedSubCategory === category.id.toString();
  const isExpanded = expandedCategories.has(category.id);

  const handleClick = () => {
    onSubCategorySelect(category.id);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggleExpand(category.id);
  };

  return (
    <Box>
      <HStack
        p={2}
        pl={level * 4 + 2}
        cursor="pointer"
        _hover={{ bg: 'gray.50' }}
        bg={isSelected ? 'blue.50' : 'transparent'}
        borderLeft={level > 0 ? '2px solid #E2E8F0' : 'none'}
        onClick={handleClick}
        justify="space-between"
        w="full"
      >
        <HStack flex={1} spacing={2}>
          <Box minW="16px" h="16px" display="flex" alignItems="center" justifyContent="center">
            {hasChildren ? (
              <Button
                size="xs"
                variant="ghost"
                p={0}
                minW="auto"
                h="auto"
                onClick={handleToggle}
                _hover={{ bg: 'transparent' }}
              >
                {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </Button>
            ) : (
              <Box w="16px" h="16px" />
            )}
          </Box>

          <Text
            fontSize="sm"
            fontWeight={isSelected ? '600' : '400'}
            color={isSelected ? 'main.1' : 'gray.700'}
            _hover={{ color: 'main.1' }}
            transition="color 0.2s"
          >
            {category.name}
          </Text>
        </HStack>
      </HStack>

      {hasChildren && (
        <Collapse in={isExpanded} animateOpacity>
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              selectedSubCategory={selectedSubCategory}
              onSubCategorySelect={onSubCategorySelect}
              expandedCategories={expandedCategories}
              onToggleExpand={onToggleExpand}
              allCategories={allCategories}
            />
          ))}
        </Collapse>
      )}
    </Box>
  );
};

const CategorySidebar = ({
  selectedCategory,
  selectedSubCategory,
  onSubCategorySelect,
  fullCategories = [],
  fullCategoriesLoading = false
}) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const { data: categoryHierarchy, isLoading, error } = useQueryCategoryHierarchy(selectedCategory);

  const getAllCategoryIds = (categories) => {
    const ids = new Set();
    const collectIds = (cats) => {
      cats.forEach((cat) => {
        ids.add(cat.id);
        if (cat.children && cat.children.length > 0) {
          collectIds(cat.children);
        }
      });
    };
    if (categories && categories.children) {
      collectIds(categories.children);
    }
    return ids;
  };

  const getCategoryPath = (categories, targetId) => {
    const path = [];
    const findPath = (cats, target, currentPath) => {
      for (const cat of cats) {
        const newPath = [...currentPath, cat.id];
        if (cat.id === target) {
          path.splice(0, path.length, ...newPath);
          return true;
        }
        if (cat.children && cat.children.length > 0) {
          if (findPath(cat.children, target, newPath)) return true;
        }
      }
      return false;
    };
    if (categories && categories.children) {
      findPath(categories.children, targetId, []);
    }
    return path;
  };

  useEffect(() => {
    if (!categoryHierarchy) return;
    try {
      const savedExpansion = localStorage.getItem(SIDEBAR_EXPANSION_KEY);
      let initialExpanded = new Set();
      if (savedExpansion) {
        initialExpanded = new Set(JSON.parse(savedExpansion));
      } else {
        initialExpanded = getAllCategoryIds(categoryHierarchy);
      }
      if (selectedSubCategory && categoryHierarchy) {
        const pathToSelected = getCategoryPath(categoryHierarchy, parseInt(selectedSubCategory));
        pathToSelected.forEach((id) => initialExpanded.add(id));
      }
      setExpandedCategories(initialExpanded);
    } catch (error) {
      setExpandedCategories(getAllCategoryIds(categoryHierarchy));
    }
  }, [categoryHierarchy, selectedSubCategory]);

  useEffect(() => {
    if (expandedCategories.size > 0) {
      try {
        localStorage.setItem(SIDEBAR_EXPANSION_KEY, JSON.stringify(Array.from(expandedCategories)));
      } catch (error) {}
    }
  }, [expandedCategories]);

  const handleToggleExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSubCategorySelect = (categoryId) => {
    const buildCategorySlugPath = (categories, targetId) => {
      const category = categories.find((cat) => cat.id === targetId);
      if (!category) return [];
      if (category.parent_id) {
        const parentPath = buildCategorySlugPath(categories, category.parent_id);
        return [...parentPath, category.slug];
      }
      return [category.slug];
    };

    const slugPath = buildCategorySlugPath(fullCategories, categoryId);
    if (slugPath.length > 0) {
      const url = `/san-pham/${slugPath.join('/')}`;
      if (onSubCategorySelect) {
        onSubCategorySelect(url);
      }
    }
  };

  if (!selectedCategory || selectedCategory === 'all') return null;

  if (isLoading || fullCategoriesLoading) {
    return (
      <Box w="280px" bg="white" border="1px solid #E2E8F0" borderRadius="md" p={4}>
        <Text fontSize="md" color="gray.500">
          Đang tải danh mục...
        </Text>
      </Box>
    );
  }

  if (error || !categoryHierarchy) {
    return (
      <Box w="280px" bg="white" border="1px solid #E2E8F0" borderRadius="md" p={4}>
        <Text fontSize="md" color="red.500">
          Không thể tải danh mục con
        </Text>
      </Box>
    );
  }

  return (
    <Box
      w={{ xs: '100%', md: '280px' }}
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="xl"
      maxH="600px"
      overflowY="auto"
    >
      <Box p={4} borderBottom="1px solid #E2E8F0">
        <Text fontSize="md" fontWeight="600" color="main.1">
          Danh mục
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {categoryHierarchy.name}
        </Text>
      </Box>

      <VStack spacing={0} align="stretch">
        {categoryHierarchy.children &&
          categoryHierarchy.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={0}
              selectedSubCategory={selectedSubCategory}
              onSubCategorySelect={handleSubCategorySelect}
              expandedCategories={expandedCategories}
              onToggleExpand={handleToggleExpand}
              allCategories={fullCategories}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default CategorySidebar;
