'use client';

import { useQueryCategoryList } from '@/services/category.service';
import { useParamsURL } from '@/utils/hooks';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';

const ProductTabs = () => {
  const { data = [] } = useQueryCategoryList();
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId } = paramsURL || {};
  const defaultCategoryId = data?.[0]?.id;

  const TABS = data?.map((item) => ({ label: item.name, value: item.id }))?.slice(0, 3);
  const [currentTab, setCurrentTab] = useState(categoryId || defaultCategoryId);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof categoryId === 'undefined') {
      setParamsURL({ categoryId: defaultCategoryId });
    }
  }, [categoryId, defaultCategoryId, setParamsURL]);

  useEffect(() => {
    if (typeof categoryId !== 'undefined') {
      setCurrentTab(categoryId);
    }
  }, [categoryId]);

  if (!isClient) {
    return null;
  }

  return (
    <Box className="gradient-border" borderRadius={16}>
      <Flex align="center" borderRadius={14} bgColor="#FFF" p="8px" className="gradient-border-content">
        {TABS.map((item) => {
          const { label, value } = item;
          const isActive = currentTab === `${value}`;

          return (
            <Flex
              key={value}
              flex={1}
              h="44px"
              bgColor={isActive ? '#00b7e9' : '#FFF'}
              borderRadius={8}
              align="center"
              justify="center"
              cursor="pointer"
              onClick={() => {
                setCurrentTab(value);
                setParamsURL({ categoryId: value });
              }}
              data-group
            >
              <Text
                fontSize={{ xs: 16, md: 20 }}
                fontWeight={700}
                color={isActive ? '#FFF' : undefined}
                _groupHover={{ color: isActive ? undefined : '#00b7e9' }}
                transitionDuration="200ms"
              >
                {label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

const Wrapper = () => {
  return (
    <Suspense>
      <ProductTabs />
    </Suspense>
  );
};

export default Wrapper;
