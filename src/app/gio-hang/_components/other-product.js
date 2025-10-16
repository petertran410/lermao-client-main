'use client';

import Carousel from '@/components/carousel';
import ProductItem from '@/components/product-item';
import { useQueryProductList } from '@/services/product.service';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Suspense } from 'react';

const OtherProduct = () => {
  const { data } = useQueryProductList();
  const { content = [] } = data || {};

  if (!Array.isArray(content) || !content.length) {
    return null;
  }

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <Flex mt="40px" direction="column">
      <Text as="h2" textAlign="center" fontWeight={700} fontSize={20}>
        Sản phẩm liên quan
      </Text>

      <Box mt="24px">
        <Carousel breakpoints={breakpoints} slidesPerView={3}>
          {content?.map((item) => {
            return <ProductItem key={item.id} item={item} />;
          })}
        </Carousel>
      </Box>
    </Flex>
  );
};

const Wrapper = () => {
  return (
    <Suspense>
      <OtherProduct />
    </Suspense>
  );
};

export default Wrapper;
