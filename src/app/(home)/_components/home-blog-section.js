// src/app/(home)/_components/home-blog-section.js
'use client';

import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { AspectRatio, Box, Button, Flex, IconButton, Image, Text } from '@chakra-ui/react';
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
    <Box px={PX_ALL} py={{ xs: '40px', md: '0' }} mt="40px">
      <Flex direction="column" gap={{ xs: '48px', lg: '56px' }}>
        {/* <BlogRow title="Công thức pha chế" articles={congThucArticles} basePath="/cong-thuc-pha-che" /> */}
        <BlogRow title="Workshop Pha Chế" articles={workshopArticles} basePath="/workshop-pha-che" />
        {/* <BlogRow title="Tin tức" articles={newsArticles} basePath="/tin-tuc" /> */}
      </Flex>

      <Flex align="center" justify="center" gap="16px" mt="40px" mb="16px">
        <Box h="2px" flex={1} maxW="120px" bgGradient="linear(to-r, transparent, #00b7e9)" />
        <Text
          as="h2"
          fontSize={{ xs: '24px', md: '30px', lg: '36px' }}
          fontWeight={900}
          textAlign="center"
          lineHeight="1.2"
          letterSpacing="-0.02em"
          bgGradient="linear(to-r, #00b7e9, #77D0E8)"
          bgClip="text"
          sx={{ WebkitTextFillColor: 'transparent' }}
        >
          Kết Nối Cùng Gấu LerMao
        </Text>
        <Box h="2px" flex={1} maxW="120px" bgGradient="linear(to-r, #77D0E8, transparent)" />
      </Flex>

      <Box
        flex={{ lg: '0 0 380px' }}
        w={{ xs: 'full', lg: 'full' }}
        position="relative"
        borderRadius="24px"
        overflow="hidden"
      >
        <Image
          src="/images/workshop-demo.webp"
          alt={IMG_ALT}
          w="full"
          h={{ xs: '300px', md: '300px', lg: '330px' }}
          objectFit="cover"
          borderRadius="24px"
          fallbackSrc="/images/preview.png"
        />

        <Flex
          position="absolute"
          top={{ xs: '20px', md: '30px', lg: '60px' }}
          left="0"
          right="0"
          mx="auto"
          w={{ xs: 'calc(100% - 40px)', md: '400px' }}
          maxW={{ lg: '390px', xl: '370px', '2xl': '450px' }}
          direction="column" // ← THÊM: Stack vertical
          align="center"
          gap="25px" // ← THÊM: Khoảng cách giữa text và buttons
        >
          {/* Text */}
          <Text
            textAlign="center"
            color="#266ab3"
            fontSize={{ xs: '14px', md: '20px' }}
            fontWeight={700}
            lineHeight="1.5"
            // textShadow="1px 1px 5px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.6)"
          >
            Khám phá sản phẩm cập nhật xu hướng và tìm kiếm giải pháp phù hợp với mô hình kinh doanh đồ uống của bạn
          </Text>

          {/* Buttons */}
          <Flex
            gap={{ xs: '8px', md: '12px' }}
            direction={{ xs: 'column', sm: 'row' }} // Stack trên mobile, row trên tablet+
            w="full"
            justify="center"
          >
            <Button
              as="a"
              href="/workshop-pha-che"
              target="_blank"
              size={{ xs: 'sm', md: 'md' }}
              bg="#1768c3"
              color="white"
              fontWeight={700}
              fontSize={{ xs: '13px', md: '14px' }}
              px={{ xs: '16px', md: '20px' }}
              py={{ xs: '10px', md: '12px' }}
              borderRadius="full"
              _hover={{
                bg: '#1768c3',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(119, 208, 232, 0.5)'
              }}
              _active={{ transform: 'translateY(0)' }}
              transition="all 0.2s"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
            >
              Đăng Ký Work Shop
            </Button>

            <Button
              as="a"
              href="https://zalo.me/4415290839928975010"
              target="_blank"
              rel="noopener noreferrer"
              size={{ xs: 'sm', md: 'md' }}
              bg="white"
              color="#1768c3"
              fontWeight={700}
              fontSize={{ xs: '13px', md: '14px' }}
              px={{ xs: '16px', md: '20px' }}
              py={{ xs: '10px', md: '12px' }}
              borderRadius="full"
              border="2px solid"
              borderColor="white"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.5)'
              }}
              _active={{ transform: 'translateY(0)' }}
              transition="all 0.2s"
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
            >
              Liên Hệ Tư Vấn
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomeBlogSection;
