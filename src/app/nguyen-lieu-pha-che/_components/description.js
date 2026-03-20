'use client';

import { useQueryCategoryList } from '@/services/category.service';
import { useGetParamsURL } from '@/utils/hooks';
import { Flex, Text } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';

const ProductDescription = () => {
  const { data = [] } = useQueryCategoryList();
  const paramsURL = useGetParamsURL();
  const { categoryId } = paramsURL || {};
  const currentCategory = data?.find((i) => `${i.id}` === categoryId);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Flex gap="16px" direction="column">
      <Text textAlign="center" fontWeight={700} fontSize={16} _hover={{ color: 'text.1' }}>
        Mô tả chung
      </Text>

      <Text textAlign="justify" fontWeight={400} fontSize={16} _hover={{ color: 'text.1' }}>
        {currentCategory?.description}
      </Text>
    </Flex>
  );
};

const Wrapper = () => {
  return (
    <Suspense>
      <ProductDescription />
    </Suspense>
  );
};

export default Wrapper;
