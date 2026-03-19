'use client';

import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

/**
 * ScrollableTabs — tab pills cuộn ngang, không bao giờ wrap
 * Dùng chung cho CategoryShowcase, FeaturedProducts, ArticleCategoryShowcase
 */
const ScrollableTabs = ({ items = [], activeIndex = 0, onSelect, renderLabel }) => {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  // Auto-scroll tab active vào giữa viewport
  useEffect(() => {
    if (!activeRef.current || !scrollRef.current) return;
    const container = scrollRef.current;
    const activeEl = activeRef.current;

    const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;

    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [activeIndex]);

  if (!items.length) return null;

  return (
    <Box
      ref={scrollRef}
      overflowX="auto"
      mx="auto"
      w={{ xs: '100%', md: 'fit-content' }}
      maxW="100%"
      bg="#f5f5f5"
      borderRadius={{ xs: '16px', md: 'full' }}
      p="5px"
      sx={{
        /* Ẩn scrollbar nhưng vẫn scroll được */
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <Flex gap={{ xs: '6px', md: '10px' }} w="max-content" mx="auto" px={{ xs: '4px', md: '0' }}>
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          const label = renderLabel ? renderLabel(item) : item.name || item.label || '';

          return (
            <Box
              key={item.id || i}
              ref={isActive ? activeRef : undefined}
              as="button"
              px={{ xs: '16px', md: '22px' }}
              py={{ xs: '8px', md: '10px' }}
              borderRadius="full"
              fontSize={{ xs: '13px', md: '15px' }}
              fontWeight={600}
              cursor="pointer"
              transition="all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
              bg={isActive ? '#00b7e9' : 'transparent'}
              color={isActive ? '#FFF' : '#555'}
              boxShadow={isActive ? '0 4px 14px rgba(0, 183, 233, 0.3)' : 'none'}
              _hover={{
                bg: isActive ? '#00b7e9' : '#e8e8e8'
              }}
              onClick={() => onSelect(i)}
              whiteSpace="nowrap"
              flexShrink={0}
            >
              {label}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ScrollableTabs;
