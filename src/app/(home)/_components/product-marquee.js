'use client';

import { IMG_ALT } from '@/utils/const';
import { Box, Flex, Image } from '@chakra-ui/react';

const MARQUEE_DURATION = 30; // seconds

const MarqueeRow = ({ products, direction = 'left' }) => {
  if (!products || products.length === 0) return null;

  // Duplicate đủ để lấp kín màn hình + tạo seamless loop
  const repeatCount = products.length < 6 ? 4 : 2;
  const duplicated = Array.from({ length: repeatCount }, () => products).flat();

  const animationName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight';

  return (
    <Box overflow="hidden" w="full" py="12px">
      <Flex
        w="max-content"
        gap="24px"
        sx={{
          animation: `${animationName} ${MARQUEE_DURATION}s linear infinite`,
          '@keyframes marqueeLeft': {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: `translateX(-${100 / repeatCount}%)` }
          },
          '@keyframes marqueeRight': {
            '0%': { transform: `translateX(-${100 / repeatCount}%)` },
            '100%': { transform: 'translateX(0%)' }
          },
          '&:hover': {
            animationPlayState: 'paused'
          }
        }}
      >
        {duplicated.map((product, index) => {
          const imgSrc = product.imagesUrl?.[0]?.replace('http://', 'https://');
          if (!imgSrc) return null;

          return (
            <Flex
              key={`${product.id}-${index}`}
              flex="0 0 auto"
              w={{ xs: '120px', md: '160px', lg: '180px' }}
              h={{ xs: '120px', md: '160px', lg: '180px' }}
              bg="#FFF"
              borderRadius="16px"
              border="1px solid #f1f3f4"
              align="center"
              justify="center"
              overflow="hidden"
              p="12px"
            >
              <Image
                src={imgSrc}
                alt={product.title || IMG_ALT}
                maxW="100%"
                maxH="100%"
                objectFit="contain"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

const ProductMarquee = ({ topProducts = [], bottomProducts = [] }) => {
  if (topProducts.length === 0 && bottomProducts.length === 0) return null;

  return (
    <Box mt="56px" overflow="hidden">
      {topProducts.length > 0 && <MarqueeRow products={topProducts} direction="left" />}
      {bottomProducts.length > 0 && <MarqueeRow products={bottomProducts} direction="right" />}
    </Box>
  );
};

export default ProductMarquee;
