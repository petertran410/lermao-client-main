// src/app/(home)/_components/featured-products.js
'use client';

import { IMG_ALT, PX_ALL } from '@/utils/const';
import { formatCurrency } from '@/utils/helper-server';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FALLBACK = '/images/lermao.png';
const AUTO_MS = 4000;
const PAUSE_AFTER_MANUAL_MS = 4000;
const CARD_GAP = 16;

const stripHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
};

/* ══════════════════════════════════════════════════════════
   ProductCard — card sản phẩm sạch, hợp ngành F&B
   ══════════════════════════════════════════════════════════ */
const ProductCard = ({ product, index = 0 }) => {
  const {
    title,
    kiotviet_name,
    slug,
    imagesUrl,
    kiotviet_images,
    price,
    kiotviet_price,
    price_on,
    general_description
  } = product || {};

  const name = title || kiotviet_name || 'Sản phẩm';
  const displayPrice = price || kiotviet_price;
  const image =
    (Array.isArray(imagesUrl) && imagesUrl[0]?.replace('http://', 'https://')) ||
    (Array.isArray(kiotviet_images) && kiotviet_images[0]?.replace('http://', 'https://')) ||
    FALLBACK;

  const descText = stripHtml(general_description);

  return (
    <Link href={`/san-pham/lermao/${slug}`}>
      {/* Perspective wrapper — nằm ngoài overflow:hidden để 3D hoạt động */}
      <Box
        sx={{ perspective: '800px' }}
        opacity={0}
        animation={`cardFadeIn 0.5s ease-out ${index * 0.06}s forwards`}
        css={{
          '@keyframes cardFadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <Box
          position="relative"
          bg="#FFF"
          borderRadius="16px"
          overflow="hidden"
          border="1px solid #f0f0f0"
          transition="all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)"
          h="full"
          role="group"
          _hover={{
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 40px rgba(0, 183, 233, 0.15)',
            borderColor: '#00b7e9'
          }}
        >
          {/* ── Mặt trước: Ảnh + Tên + Giá ── */}
          <AspectRatio ratio={1} w="full">
            <Image
              src={image}
              alt={name}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 0.4s ease"
              onError={(e) => {
                e.target.src = FALLBACK;
              }}
            />
          </AspectRatio>

          <Box p="14px" pt="10px" borderTop="1px solid #f5f5f5">
            <Text
              fontSize="14px"
              fontWeight={600}
              color="#1d2128"
              noOfLines={2}
              lineHeight="1.45"
              minH="41px"
              textAlign="center"
            >
              {name}
            </Text>
            <Flex justify="center" mt="8px">
              {!displayPrice || displayPrice === 0 || price_on ? (
                <Text fontSize="13px" fontWeight={700} color="#00b7e9">
                  Liên hệ
                </Text>
              ) : (
                <Text fontSize="14px" fontWeight={700} color="#00b7e9">
                  {formatCurrency(displayPrice)}
                </Text>
              )}
            </Flex>
          </Box>

          {/* ── Tấm flick ngược: đóng sách từ trên xuống ── */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="linear-gradient(165deg, #006d94 0%, #00a0d2 40%, #00b7e9 100%)"
            borderRadius="16px"
            p="20px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            transformOrigin="top center"
            transform="rotateX(-90deg)"
            opacity={0}
            transition="transform 0.45s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.35s ease"
            sx={{
              backfaceVisibility: 'hidden',
              // Chỉ hiển thị trên thiết bị có hover (không phải touch)
              '@media (hover: hover)': {
                '[role=group]:hover &': {
                  transform: 'rotateX(0deg)',
                  opacity: 1
                }
              }
            }}
          >
            {/* Header overlay */}
            <Box>
              <Text fontSize="14px" fontWeight={700} color="#FFF" noOfLines={2} lineHeight="1.4" mb="10px">
                {name}
              </Text>

              <Box w="32px" h="2px" bg="rgba(255,255,255,0.4)" borderRadius="full" mb="10px" />

              {/* Description */}
              <Text
                fontSize="12px"
                lineHeight="1.65"
                color="rgba(255,255,255,0.88)"
                noOfLines={7}
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 7,
                  overflow: 'hidden'
                }}
              >
                {descText || 'Sản phẩm nguyên liệu pha chế chất lượng cao. Liên hệ để được tư vấn chi tiết.'}
              </Text>
            </Box>

            {/* Footer overlay */}
            <Flex align="center" justify="space-between" mt="auto" pt="12px">
              <Text fontSize="13px" fontWeight={700} color="#FFF">
                {!displayPrice || displayPrice === 0 || price_on ? 'Liên hệ' : formatCurrency(displayPrice)}
              </Text>

              <Flex
                align="center"
                gap="4px"
                bg="rgba(255,255,255,0.2)"
                px="10px"
                py="5px"
                borderRadius="full"
                transition="all 0.2s"
                _hover={{ bg: 'rgba(255,255,255,0.35)' }}
              >
                <Text fontSize="11px" fontWeight={600} color="#FFF">
                  Chi tiết
                </Text>
                <FiChevronRight size={12} color="#FFF" />
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

/* ══════════════════════════════════════════════════════════
   ViewAllCard
   ══════════════════════════════════════════════════════════ */
const ViewAllCard = ({ categorySlug }) => (
  <Link href={`/san-pham/${categorySlug}`}>
    <Flex
      bg="#f8fcfe"
      border="2px dashed #d0eef7"
      borderRadius="16px"
      h="full"
      minH="280px"
      direction="column"
      align="center"
      justify="center"
      gap="12px"
      transition="all 0.3s"
      _hover={{ bg: '#eef8fc', borderColor: '#00b7e9', transform: 'translateY(-4px)' }}
    >
      <Flex
        w="48px"
        h="48px"
        borderRadius="full"
        bg="#00b7e9"
        align="center"
        justify="center"
        boxShadow="0 4px 14px rgba(0, 183, 233, 0.3)"
      >
        <FiChevronRight size={22} color="#FFF" />
      </Flex>
      <Text color="#00b7e9" fontWeight={700} fontSize="14px">
        Xem tất cả
      </Text>
    </Flex>
  </Link>
);

/* ══════════════════════════════════════════════════════════
   ArrowBtn
   ══════════════════════════════════════════════════════════ */
const ArrowBtn = ({ direction, onClick, disabled }) => (
  <Box
    as="button"
    onClick={onClick}
    w="40px"
    h="40px"
    borderRadius="full"
    bg={disabled ? '#f0f0f0' : '#FFF'}
    display="flex"
    alignItems="center"
    justifyContent="center"
    boxShadow={disabled ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'}
    cursor={disabled ? 'not-allowed' : 'pointer'}
    transition="all 0.2s"
    opacity={disabled ? 0.4 : 1}
    _hover={disabled ? {} : { transform: 'scale(1.1)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
    _active={disabled ? {} : { transform: 'scale(0.95)' }}
  >
    {direction === 'left' ? <FiChevronLeft size={20} color="#00b7e9" /> : <FiChevronRight size={20} color="#00b7e9" />}
  </Box>
);

/* ══════════════════════════════════════════════════════════
   useCarousel — hook xử lý carousel logic
   ══════════════════════════════════════════════════════════ */
const useCarousel = (itemCount, cardWidth) => {
  const trackRef = useRef(null);
  const [snapIndex, setSnapIndex] = useState(0);
  const snapPointsRef = useRef([0]);
  const autoRef = useRef(null);
  const pauseRef = useRef(null);
  const isPausedRef = useRef(false);

  const step = cardWidth + CARD_GAP;
  const totalCards = itemCount + 1; // +1 for ViewAllCard

  // Tính snap points
  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      const visibleW = trackRef.current.offsetWidth;
      const trackW = totalCards * cardWidth + (totalCards - 1) * CARD_GAP;
      const max = Math.max(0, trackW - visibleW);

      const pts = [0];
      for (let s = step; s <= max; s += step) pts.push(s);
      snapPointsRef.current = pts;
      setSnapIndex((prev) => Math.min(prev, pts.length - 1));
    };

    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [totalCards, cardWidth, step]);

  // Reset khi itemCount thay đổi (chuyển tab)
  useEffect(() => {
    setSnapIndex(0);
  }, [itemCount]);

  const slide = useCallback((dir) => {
    setSnapIndex((prev) => {
      const len = snapPointsRef.current.length;
      if (len <= 1) return 0;
      let next = prev + dir;
      if (next >= len) return 0;
      if (next < 0) return len - 1;
      return next;
    });
  }, []);

  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoRef.current = setInterval(() => {
      if (!isPausedRef.current) slide(1);
    }, AUTO_MS);
  }, [stopAuto, slide]);

  useEffect(() => {
    if (snapPointsRef.current.length > 1) startAuto();
    return () => {
      stopAuto();
      if (pauseRef.current) clearTimeout(pauseRef.current);
    };
  }, [startAuto, stopAuto]);

  const handleManual = useCallback(
    (dir) => {
      stopAuto();
      if (pauseRef.current) {
        clearTimeout(pauseRef.current);
        pauseRef.current = null;
      }
      slide(dir);
      pauseRef.current = setTimeout(() => {
        pauseRef.current = null;
        startAuto();
      }, PAUSE_AFTER_MANUAL_MS);
    },
    [stopAuto, startAuto, slide]
  );

  const offset = snapPointsRef.current[snapIndex] ?? 0;

  return {
    trackRef,
    offset,
    handleManual,
    pauseHover: () => {
      isPausedRef.current = true;
    },
    resumeHover: () => {
      isPausedRef.current = false;
    }
  };
};

/* ══════════════════════════════════════════════════════════
   ProductCarousel — carousel cho 1 danh mục
   ══════════════════════════════════════════════════════════ */
const CARD_W = 215;

const ProductCarousel = ({ products, categorySlug, animationKey }) => {
  const { trackRef, offset, handleManual, pauseHover, resumeHover } = useCarousel(products.length, CARD_W);

  return (
    <Box
      key={animationKey}
      sx={{
        animation: 'carouselFadeIn 0.45s ease-out forwards',
        '@keyframes carouselFadeIn': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      {/* Navigation */}
      <Flex justify="flex-end" gap="8px" mb="16px" pr="4px">
        <ArrowBtn direction="left" onClick={() => handleManual(-1)} />
        <ArrowBtn direction="right" onClick={() => handleManual(1)} />
      </Flex>

      {/* Track */}
      <Box ref={trackRef} overflow="hidden" onMouseEnter={pauseHover} onMouseLeave={resumeHover}>
        <Flex
          gap={`${CARD_GAP}px`}
          transition="transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)"
          transform={`translateX(-${offset}px)`}
          willChange="transform"
        >
          {products.map((product, i) => (
            <Box key={product.id} flexShrink={0} w={`${CARD_W}px`}>
              <ProductCard product={product} index={i} />
            </Box>
          ))}
          <Box flexShrink={0} w={`${CARD_W}px`}>
            <ViewAllCard categorySlug={categorySlug} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

/* ══════════════════════════════════════════════════════════
   getDescendantIds — lấy tất cả ID con cháu của 1 category
   ══════════════════════════════════════════════════════════ */
function getDescendantIds(categoryId, allCategories) {
  const ids = new Set();
  const collect = (parentId) => {
    allCategories.forEach((cat) => {
      if (Number(cat.parent_id) === Number(parentId) && !ids.has(Number(cat.id))) {
        ids.add(Number(cat.id));
        collect(cat.id);
      }
    });
  };
  ids.add(Number(categoryId));
  collect(categoryId);
  return ids;
}

/* ══════════════════════════════════════════════════════════
   FeaturedProducts — component chính
   ══════════════════════════════════════════════════════════ */
const FeaturedProducts = ({ featuredData = [], featuredCategories = [], allCategories = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Tabs: chỉ lấy danh mục có is_featured = true
  const tabs = useMemo(() => {
    if (!featuredCategories.length) return [];
    return featuredCategories.map((cat) => ({
      id: Number(cat.id),
      name: cat.name,
      slug: cat.slug,
      parent_id: cat.parent_id ? Number(cat.parent_id) : null
    }));
  }, [featuredCategories]);

  // Flat map: categoryId → products (từ featuredData)
  const productsByCategoryId = useMemo(() => {
    const map = new Map();
    for (const group of featuredData) {
      // group.products đã là featured products
      // group có thể là root category chứa products từ nhiều sub-categories
      // Cần map lại theo từng product's categoryId
      for (const product of group.products) {
        const catId = Number(product.categoryId || product.category?.id || group.categoryId);
        if (!map.has(catId)) map.set(catId, []);
        map.get(catId).push(product);
      }
    }
    return map;
  }, [featuredData]);

  // Products cho tab đang active
  const activeProducts = useMemo(() => {
    if (!tabs.length) return [];
    const activeTab = tabs[activeIndex];
    if (!activeTab) return [];

    // Lấy tất cả descendant category IDs
    const descendantIds = getDescendantIds(activeTab.id, allCategories);

    // Gom products từ tất cả categories con cháu
    const products = [];
    const seenIds = new Set();

    for (const catId of descendantIds) {
      const catProducts = productsByCategoryId.get(catId) || [];
      for (const p of catProducts) {
        const pid = Number(p.id);
        if (!seenIds.has(pid)) {
          seenIds.add(pid);
          products.push(p);
        }
      }
    }

    // Nếu category này là con (parent_id != null), cũng check trực tiếp
    const directProducts = productsByCategoryId.get(activeTab.id) || [];
    for (const p of directProducts) {
      const pid = Number(p.id);
      if (!seenIds.has(pid)) {
        seenIds.add(pid);
        products.push(p);
      }
    }

    return products;
  }, [tabs, activeIndex, allCategories, productsByCategoryId]);

  // Tìm slug path cho category active
  const activeCategorySlug = useMemo(() => {
    if (!tabs.length) return '';
    const tab = tabs[activeIndex];
    if (!tab) return '';

    // Build slug path
    const buildPath = (catId) => {
      const slugs = [];
      let currentId = catId;
      let loops = 0;
      while (currentId && loops < 20) {
        const cat = allCategories.find((c) => Number(c.id) === Number(currentId));
        if (!cat) break;
        slugs.unshift(cat.slug);
        currentId = cat.parent_id ? Number(cat.parent_id) : null;
        loops++;
      }
      return slugs.join('/');
    };

    return buildPath(tab.id) || tab.slug;
  }, [tabs, activeIndex, allCategories]);

  if (!tabs.length || !featuredData.length) return null;

  return (
    <Box px={PX_ALL} mt="80px">
      {/* ── Section header ── */}
      <Flex align="center" justify="center" gap="16px" mb="28px">
        <Box h="2px" flex={1} maxW="100px" bg="linear-gradient(90deg, transparent, #00b7e9)" />
        <Flex align="center" gap="10px">
          <Text fontSize="22px">🧋</Text>
          <Text fontSize={{ xs: '20px', lg: '26px' }} fontWeight={800} color="#1d2128" textAlign="center">
            Sản phẩm nổi bật
          </Text>
        </Flex>
        <Box h="2px" flex={1} maxW="100px" bg="linear-gradient(90deg, #00b7e9, transparent)" />
      </Flex>

      {/* ── Tab pills ── */}
      <Flex
        justify="center"
        gap={{ xs: '6px', md: '10px' }}
        flexWrap="wrap"
        bg="#f5f5f5"
        borderRadius="full"
        p="5px"
        w="fit-content"
        mx="auto"
        mb="32px"
      >
        {tabs.map((tab, i) => (
          <Box
            key={tab.id}
            as="button"
            px={{ xs: '14px', md: '22px' }}
            py={{ xs: '8px', md: '10px' }}
            borderRadius="full"
            fontSize={{ xs: '13px', md: '15px' }}
            fontWeight={600}
            cursor="pointer"
            transition="all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
            bg={i === activeIndex ? '#00b7e9' : 'transparent'}
            color={i === activeIndex ? '#FFF' : '#555'}
            boxShadow={i === activeIndex ? '0 4px 14px rgba(0, 183, 233, 0.35)' : 'none'}
            _hover={{
              bg: i === activeIndex ? '#00b7e9' : '#e8e8e8'
            }}
            onClick={() => setActiveIndex(i)}
            whiteSpace="nowrap"
          >
            {tab.name}
          </Box>
        ))}
      </Flex>

      {/* ── Product carousel cho danh mục active ── */}
      {activeProducts.length > 0 ? (
        <ProductCarousel
          products={activeProducts}
          categorySlug={activeCategorySlug}
          animationKey={`carousel-${tabs[activeIndex]?.id}`}
        />
      ) : (
        <Flex
          key={`empty-${tabs[activeIndex]?.id}`}
          justify="center"
          align="center"
          py="60px"
          sx={{
            animation: 'carouselFadeIn 0.4s ease-out forwards'
          }}
        >
          <Flex direction="column" align="center" gap="12px">
            <Image src="/images/lermao-run.gif" alt={IMG_ALT} w="60px" h="auto" opacity={0.5} />
            <Text color="#999" fontSize="14px">
              Chưa có sản phẩm nổi bật trong danh mục này
            </Text>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default FeaturedProducts;
