// src/app/(home)/_components/featured-products.js
'use client';

import { IMG_ALT, PX_ALL } from '@/utils/const';
import { formatCurrency } from '@/utils/helper-server';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FALLBACK = '/images/lermao.png';
const AUTO_MS = 4000;
const CARD_W = 215;
const CARD_GAP = 16;
const STEP = CARD_W + CARD_GAP;

const ProductCard = ({ product }) => {
  const { title, kiotviet_name, slug, imagesUrl, kiotviet_images, price, kiotviet_price } = product || {};
  const name = title || kiotviet_name || 'Sản phẩm';
  const displayPrice = price || kiotviet_price;
  const image =
    (Array.isArray(imagesUrl) && imagesUrl[0]?.replace('http://', 'https://')) ||
    (Array.isArray(kiotviet_images) && kiotviet_images[0]?.replace('http://', 'https://')) ||
    FALLBACK;

  return (
    <Link href={`/san-pham/lermao/${slug}`}>
      <Box
        bg="#FFF"
        borderRadius="16px"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-6px)', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}
        h="full"
      >
        <AspectRatio ratio={1} w="full">
          <Box bg="#fafafa" display="flex" alignItems="center" justifyContent="center" p="12px">
            <Image
              src={image}
              alt={name}
              maxW="90%"
              maxH="90%"
              objectFit="contain"
              onError={(e) => {
                e.target.src = FALLBACK;
              }}
            />
          </Box>
        </AspectRatio>
        <Box p="14px" pt="10px">
          <Text
            fontSize="15px"
            fontWeight={600}
            color="#1d2128"
            noOfLines={2}
            lineHeight="1.4"
            minH="42px"
            textAlign="center"
          >
            {name}
          </Text>
          <Flex justify="center" mt="8px">
            {!displayPrice || displayPrice === 0 ? (
              <Text fontSize="14px" fontWeight={700} color="main.1">
                Liên hệ
              </Text>
            ) : (
              <Text fontSize="15px" fontWeight={700} color="main.1">
                {formatCurrency(displayPrice)}
              </Text>
            )}
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

const ViewAllCard = ({ categoryName, categorySlug }) => (
  <Link href={`/san-pham/${categorySlug}`}>
    <Flex
      bg="rgba(255,255,255,0.12)"
      border="2px dashed rgba(255,255,255,0.4)"
      borderRadius="16px"
      h="full"
      minH="300px"
      direction="column"
      align="center"
      justify="center"
      gap="12px"
      transition="all 0.3s"
      _hover={{ bg: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.7)', transform: 'translateY(-4px)' }}
    >
      <Flex
        w="52px"
        h="52px"
        borderRadius="full"
        bg="#FFF"
        align="center"
        justify="center"
        boxShadow="0 4px 12px rgba(0,0,0,0.1)"
      >
        <FiChevronRight size={24} color="#00b7e9" />
      </Flex>
      <Text color="#FFF" fontWeight={700} fontSize="15px">
        Xem tất cả
      </Text>
      <Text color="rgba(255,255,255,0.6)" fontSize="12px" textAlign="center" px="8px">
        {categoryName}
      </Text>
    </Flex>
  </Link>
);

const ArrowBtn = ({ direction, onClick }) => (
  <Box
    as="button"
    onClick={onClick}
    w="46px"
    h="46px"
    borderRadius="full"
    bg="#FFF"
    display="flex"
    alignItems="center"
    justifyContent="center"
    boxShadow="0 2px 10px rgba(0,0,0,0.15)"
    cursor="pointer"
    transition="all 0.2s"
    _hover={{ transform: 'scale(1.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.22)' }}
    _active={{ transform: 'scale(0.95)' }}
  >
    {direction === 'left' ? <FiChevronLeft size={22} color="#00b7e9" /> : <FiChevronRight size={22} color="#00b7e9" />}
  </Box>
);

const SIDE_PAD_XS = 20;
const SIDE_PAD_LG = 36;

const CategoryCarousel = ({ categoryName, categorySlug, products }) => {
  const trackWrapRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const autoRef = useRef(null);
  const isPausedRef = useRef(false);

  const totalCards = products.length + 1;

  const calcMax = useCallback(() => {
    if (!trackWrapRef.current) return;
    const visibleW = trackWrapRef.current.offsetWidth;
    const trackW = totalCards * CARD_W + (totalCards - 1) * CARD_GAP;
    const max = Math.max(0, trackW - visibleW);
    setMaxOffset(max);
    setOffset((prev) => Math.min(prev, max));
  }, [totalCards]);

  useEffect(() => {
    calcMax();
    window.addEventListener('resize', calcMax);
    return () => window.removeEventListener('resize', calcMax);
  }, [calcMax]);

  const slideTo = useCallback(
    (dir) => {
      setOffset((prev) => {
        const next = prev + dir * STEP;
        if (next > maxOffset) return 0;
        if (next < 0) return maxOffset;
        return next;
      });
    },
    [maxOffset]
  );

  // Auto play
  useEffect(() => {
    if (maxOffset <= 0) return;
    autoRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      slideTo(1);
    }, AUTO_MS);
    return () => clearInterval(autoRef.current);
  }, [slideTo, maxOffset]);

  const handleManual = (dir) => {
    isPausedRef.current = true;
    clearInterval(autoRef.current);
    slideTo(dir);
    setTimeout(() => {
      isPausedRef.current = false;
      if (maxOffset <= 0) return;
      autoRef.current = setInterval(() => {
        if (isPausedRef.current) return;
        slideTo(1);
      }, AUTO_MS);
    }, 5000);
  };

  return (
    <Box borderRadius="24px" overflow="hidden" bg="linear-gradient(135deg, #00b7e9 0%, #0090c4 50%, #006d94 100%)">
      {/* ── Header ── */}
      <Flex
        align="center"
        justify="space-between"
        px={{ xs: `${SIDE_PAD_XS}px`, lg: `${SIDE_PAD_LG}px` }}
        pt={{ xs: '20px', lg: '28px' }}
        pb="8px"
      >
        <Flex direction="column" gap="2px">
          <Flex align="center" gap="10px">
            <Text fontSize="22px">🧋</Text>
            <Text fontSize={{ xs: '17px', lg: '21px' }} fontWeight={800} color="#FFF" textTransform="uppercase">
              {categoryName}
            </Text>
          </Flex>
          <Text fontSize="13px" color="rgba(255,255,255,0.65)" pl="32px">
            Sản phẩm nổi bật
          </Text>
        </Flex>

        <Flex gap="10px">
          <ArrowBtn direction="left" onClick={() => handleManual(-1)} />
          <ArrowBtn direction="right" onClick={() => handleManual(1)} />
        </Flex>
      </Flex>

      {/* ── Track — dùng margin thay padding, overflow riêng ── */}
      <Box
        ref={trackWrapRef}
        mx={{ xs: `${SIDE_PAD_XS}px`, lg: `${SIDE_PAD_LG}px` }}
        mb={{ xs: '24px', lg: '32px' }}
        mt="8px"
        overflow="hidden"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
      >
        <Flex
          gap={`${CARD_GAP}px`}
          transition="transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)"
          transform={`translateX(-${offset}px)`}
          willChange="transform"
        >
          {products.map((product) => (
            <Box key={product.id} flexShrink={0} w={`${CARD_W}px`}>
              <ProductCard product={product} />
            </Box>
          ))}
          <Box flexShrink={0} w={`${CARD_W}px`}>
            <ViewAllCard categoryName={categoryName} categorySlug={categorySlug} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

const FeaturedProducts = ({ featuredData = [] }) => {
  if (!featuredData.length) return null;

  return (
    <Box px={PX_ALL} mt="80px">
      <Flex direction="column" gap={{ xs: '32px', lg: '40px' }}>
        {featuredData.map((group) => (
          <CategoryCarousel
            key={group.categoryId}
            categoryName={group.categoryName}
            categorySlug={group.categorySlug}
            products={group.products}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default FeaturedProducts;
