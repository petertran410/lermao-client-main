'use client';

import ScrollableTabs from '@/components/scrollable-tabs';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

const FALLBACK_IMAGE = '/images/lermao.png';

const CategoryShowcase = ({ categories = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (categories.length === 0) return null;

  const active = categories[activeIndex];
  const imageUrl = active.image_url?.replace('http://', 'https://') || FALLBACK_IMAGE;

  return (
    <Box mt="40px" px={PX_ALL}>
      {/* ── Section Heading ── */}
      <Flex align="center" justify="center" gap="16px" mb="32px">
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
          Giải Pháp Pha Chế Toàn Diện
        </Text>
        <Box h="2px" flex={1} maxW="120px" bgGradient="linear(to-r, #77D0E8, transparent)" />
      </Flex>

      {/* ── Tab Options ── */}
      <Box mb="20px">
        <ScrollableTabs items={categories} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </Box>

      {/* ── Content Container ── */}
      <Box
        borderRadius="24px"
        overflow="hidden"
        bg="#FFF"
        boxShadow="0px 4px 32px rgba(0, 0, 0, 0.06)"
        border="1px solid #f0f0f0"
      >
        <Flex direction={{ xs: 'column', lg: 'row' }} minH={{ lg: '400px' }}>
          {/* ── Left: Image ── */}
          <Flex
            flex={{ lg: 1 }}
            // bg="linear-gradient(135deg, #f0fafd 0%, #e0f4fb 100%)"
            align="center"
            justify="center"
            p={{ xs: '32px', lg: '48px' }}
            minH={{ xs: '260px', lg: 'auto' }}
            position="relative"
            overflow="hidden"
          >
            {/* <Box
              position="absolute"
              w="200px"
              h="200px"
              borderRadius="full"
              bg="rgba(0, 183, 233, 0.08)"
              top="-40px"
              left="-40px"
            />
            <Box
              position="absolute"
              w="120px"
              h="120px"
              borderRadius="full"
              bg="rgba(0, 183, 233, 0.06)"
              bottom="-20px"
              right="-20px"
            /> */}

            <Image
              key={active.id}
              src={imageUrl}
              alt={active.name || IMG_ALT}
              maxH={{ xs: '200px', lg: '300px' }}
              maxW="100%"
              borderRadius="8px"
              objectFit="fix"
              position="relative"
              zIndex={1}
              onError={(e) => {
                e.target.src = FALLBACK_IMAGE;
              }}
              sx={{
                animation: 'fadeScale 0.4s ease-out',
                '@keyframes fadeScale': {
                  '0%': { opacity: 0, transform: 'scale(0.92)' },
                  '100%': { opacity: 1, transform: 'scale(1)' }
                }
              }}
            />
          </Flex>

          {/* ── Right: Description ── */}
          <Flex
            flex={{ lg: 1 }}
            direction="column"
            justify="center"
            p={{ xs: '24px', md: '32px', lg: '48px' }}
            gap="20px"
          >
            <Text
              as="h2"
              key={`title-${active.id}`}
              fontSize={{ xs: '22px', md: '26px', lg: '30px' }}
              fontWeight={800}
              color="#1d2128"
              lineHeight="1.3"
              sx={{
                animation: 'fadeUp 0.4s ease-out',
                '@keyframes fadeUp': {
                  '0%': { opacity: 0, transform: 'translateY(12px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              {active.name}
            </Text>

            <Text
              key={`desc-${active.id}`}
              fontSize={{ xs: '14px', md: '15px' }}
              color="gray.600"
              lineHeight="1.8"
              textAlign="justify"
              sx={{ animation: 'fadeUp 0.4s ease-out 0.1s both' }}
            >
              {active.description || 'Đang cập nhật mô tả danh mục...'}
            </Text>

            <Link href={`/nguyen-lieu-pha-che/${active.slug}`} target="_blank">
              <Flex
                as="span"
                align="center"
                justify="center"
                w="220px"
                h="48px"
                bg="#00b7e9"
                color="#FFF"
                borderRadius="12px"
                fontWeight={700}
                fontSize="15px"
                gap="8px"
                transition="all 0.3s"
                _hover={{
                  bg: '#009cc7',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 183, 233, 0.3)'
                }}
                sx={{ animation: 'fadeUp 0.4s ease-out 0.2s both' }}
              >
                Xem chi tiết
                <Image src="/images/arrow-right-white.png" alt={IMG_ALT} w="20px" h="20px" />
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default CategoryShowcase;
