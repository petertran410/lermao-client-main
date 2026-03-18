'use client';

import { IMG_ALT } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const GAP = 24;

const MarqueeRow = ({ products, direction = 'left' }) => {
  if (!products || products.length === 0) return null;

  const minItems = 10;
  const repeatTimes = Math.max(1, Math.ceil(minItems / products.length));
  const extendedProducts = Array.from({ length: repeatTimes }, () => products).flat();

  const duration = extendedProducts.length * 5;

  const items = extendedProducts.map((product, i) => {
    const imgSrc = product.imagesUrl?.[0]?.replace('http://', 'https://');
    return (
      <Flex
        key={`${product.id}-${i}`}
        flex="0 0 auto"
        w={{ xs: '120px', md: '160px', lg: '200px' }}
        h={{ xs: '120px', md: '160px', lg: '200px' }}
        bg="#FFF"
        borderRadius="16px"
        border="1px solid #f1f3f4"
        align="center"
        justify="center"
        overflow="hidden"
        cursor="pointer"
        transition="all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        _hover={{
          transform: 'scale(1.08) translateY(-6px)',
          boxShadow: '0 12px 28px rgba(0, 183, 233, 0.25)',
          borderColor: 'main.1'
        }}
        sx={{
          '& img': {
            transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          },
          '&:hover img': {
            transform: 'scale(1.1)'
          }
        }}
      >
        <Image
          src={imgSrc || '/images/lermao.png'}
          alt={product.title || IMG_ALT}
          maxW="100%"
          maxH="100%"
          objectFit="contain"
          loading="eager"
          onError={(e) => {
            e.target.src = '/images/lermao.png';
          }}
        />
      </Flex>
    );
  });

  return (
    <Box overflow="hidden" w="full" py="12px">
      <Flex
        w="max-content"
        sx={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          [`@keyframes marquee-${direction}`]:
            direction === 'left'
              ? {
                  '0%': { transform: 'translateX(0%)' },
                  '100%': { transform: 'translateX(-50%)' }
                }
              : {
                  '0%': { transform: 'translateX(-50%)' },
                  '100%': { transform: 'translateX(0%)' }
                },
          '&:hover': { animationPlayState: 'paused' }
        }}
      >
        <Flex gap={`${GAP}px`} pr={`${GAP}px`} flex="0 0 auto">
          {items}
        </Flex>
        <Flex gap={`${GAP}px`} pr={`${GAP}px`} flex="0 0 auto">
          {items}
        </Flex>
      </Flex>
    </Box>
  );
};
const ProductMarquee = ({ topProducts = [], bottomProducts = [] }) => {
  if (topProducts.length === 0 && bottomProducts.length === 0) return null;

  return (
    <Box mt="70px" overflow="hidden">
      <Text textAlign="center" fontSize={{ xs: '22px', md: '28px' }} fontWeight={800} color="#1d2128" mb="24px">
        Các Sản Phẩm Của Nhà{' '}
        <Text as="span" color="#00b7e9" fontSize={{ xs: '22px', md: '28px' }} fontWeight={800}>
          Gấu Lermao
        </Text>
      </Text>
      {topProducts.length > 0 && <MarqueeRow products={topProducts} direction="left" />}
      {bottomProducts.length > 0 && <MarqueeRow products={bottomProducts} direction="right" />}
    </Box>
  );
};

export default ProductMarquee;
