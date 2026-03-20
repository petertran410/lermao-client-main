// src/app/(home)/_components/home-blog-section.js
'use client';

import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { AspectRatio, Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FALLBACK = '/images/lermao.png';
const CARD_GAP = 20;

// ═══════════════════════════════════════════
// Single Article Card
// ═══════════════════════════════════════════
const ArticleCard = ({ item, basePath }) => {
  const { title, imagesUrl, description } = item || {};
  const slug = convertSlugURL(title);
  const image = imagesUrl?.[0]?.replace('http://', 'https://') || FALLBACK;

  return (
    <Link href={`${basePath}/${slug}`} style={{ display: 'block', flexShrink: 0 }}>
      <Box
        w={{ xs: '280px', md: '340px', lg: '380px' }}
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-4px)' }}
        cursor="pointer"
      >
        <AspectRatio ratio={16 / 9} w="full" borderRadius={12} overflow="hidden">
          <Image
            src={image}
            alt={title || IMG_ALT}
            w="full"
            h="full"
            objectFit="cover"
            onError={(e) => {
              e.target.src = FALLBACK;
            }}
          />
        </AspectRatio>

        <Text mt="14px" fontWeight={700} fontSize={{ xs: 15, lg: 17 }} noOfLines={2} lineHeight="24px" color="#1d2128">
          {title}
        </Text>

        {description && (
          <Text mt="6px" fontSize={14} color="#666" noOfLines={2} lineHeight="20px">
            {description}
          </Text>
        )}
      </Box>
    </Link>
  );
};

// ═══════════════════════════════════════════
// Single Blog Row (1 section = title + arrows + horizontal scroll)
// ═══════════════════════════════════════════
const BlogRow = ({ title, articles, basePath }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector('a')?.offsetWidth || 380;
    const scrollAmount = (cardWidth + CARD_GAP) * 2;
    scrollRef.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  if (!articles?.length) return null;

  return (
    <Box>
      {/* Header: Title + Arrows */}
      <Flex align="center" justify="space-between" mb="20px">
        <Text fontSize={{ xs: 20, lg: 24 }} fontWeight={800} color="#1d2128">
          {title}
        </Text>

        <Flex gap="8px">
          <IconButton
            aria-label="Trước"
            icon={<FiChevronLeft size={20} />}
            onClick={() => scroll(-1)}
            variant="outline"
            borderRadius="full"
            size="sm"
            w="40px"
            h="40px"
            borderColor="#ccc"
            color="#333"
            _hover={{ borderColor: 'main.1', color: 'main.1' }}
          />
          <IconButton
            aria-label="Sau"
            icon={<FiChevronRight size={20} />}
            onClick={() => scroll(1)}
            variant="outline"
            borderRadius="full"
            size="sm"
            w="40px"
            h="40px"
            borderColor="#ccc"
            color="#333"
            _hover={{ borderColor: 'main.1', color: 'main.1' }}
          />
        </Flex>
      </Flex>

      {/* Horizontal scrollable cards */}
      <Flex
        ref={scrollRef}
        gap={`${CARD_GAP}px`}
        overflowX="auto"
        pb="8px"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollSnapType: 'x mandatory'
        }}
      >
        {articles.map((item) => (
          <Box key={item.id} scrollSnapAlign="start">
            <ArticleCard item={item} basePath={basePath} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

// ═══════════════════════════════════════════
// Main Component — 3 sections stacked
// ═══════════════════════════════════════════
const HomeBlogSection = ({ congThucArticles = [], workshopArticles = [], newsArticles = [] }) => {
  const hasAny = congThucArticles.length || workshopArticles.length || newsArticles.length;
  if (!hasAny) return null;

  return (
    <Box px={PX_ALL} py={{ xs: '40px' }}>
      <Flex direction="column" gap={{ xs: '48px', lg: '56px' }}>
        {/* <BlogRow title="Công thức pha chế" articles={congThucArticles} basePath="/cong-thuc" /> */}
        <BlogRow title="Workshop Pha Chế" articles={workshopArticles} basePath="/workshop-pha-che" />
        {/* <BlogRow title="Tin tức" articles={newsArticles} basePath="/tin-tuc" /> */}
      </Flex>
    </Box>
  );
};

export default HomeBlogSection;
