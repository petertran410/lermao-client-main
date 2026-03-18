'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Badge,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio,
  Icon,
  HStack,
  VStack,
  Divider
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiChevronRight, FiHome, FiStar, FiPackage, FiBookOpen, FiArrowLeft } from 'react-icons/fi';
import { IMG_ALT, PX_ALL } from '../../../../../utils/const';
import { formatCurrency } from '../../../../../utils/helper-server';
import Carousel from '../../../../../components/carousel';
import ProductItem from '../../../../../components/product-item';

const FALLBACK_IMAGE = '/images/lermao.png';

const resolveImages = (productDetail) => {
  const { imagesUrl, kiotviet_images, kiotViet } = productDetail || {};

  // 1. Thử imagesUrl
  let images = [];
  if (typeof imagesUrl === 'string') {
    try {
      const parsed = JSON.parse(imagesUrl);
      images = Array.isArray(parsed) ? parsed : [imagesUrl];
    } catch {
      // Không phải JSON → coi là URL đơn
      images = [imagesUrl];
    }
  } else if (Array.isArray(imagesUrl)) {
    images = imagesUrl;
  }

  // Filter URL hợp lệ
  images = images.filter(
    (img) => img && typeof img === 'string' && img.trim().length > 0 && (img.startsWith('http') || img.startsWith('/'))
  );

  if (images.length > 0) return images;

  // 2. Fallback: kiotviet_images
  if (Array.isArray(kiotviet_images) && kiotviet_images.length > 0) {
    const valid = kiotviet_images.filter((img) => img && typeof img === 'string' && img.startsWith('http'));
    if (valid.length > 0) return valid;
  }

  // 3. Fallback: kiotViet.images
  if (kiotViet?.images && Array.isArray(kiotViet.images) && kiotViet.images.length > 0) {
    const valid = kiotViet.images.filter((img) => img && typeof img === 'string' && img.startsWith('http'));
    if (valid.length > 0) return valid;
  }

  return [];
};

// ═══════════════════════════════════════════
// Floating Bubble decoration
// ═══════════════════════════════════════════
const FloatingBubble = ({ size, top, left, right, delay, color }) => (
  <Box
    position="absolute"
    w={size}
    h={size}
    borderRadius="full"
    bg={color}
    opacity={0.15}
    top={top}
    left={left}
    right={right}
    zIndex={0}
    pointerEvents="none"
    sx={{
      animation: `floatBubble 4s ease-in-out ${delay} infinite`,
      '@keyframes floatBubble': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-16px)' }
      }
    }}
  />
);

// ═══════════════════════════════════════════
// Breadcrumb
// ═══════════════════════════════════════════
const Breadcrumb = ({ items }) => (
  <Flex align="center" gap="8px" flexWrap="wrap" fontSize="16px" color="gray.500">
    {items.map((item, i) => (
      <Flex key={i} align="center" gap="8px">
        {i > 0 && <Icon as={FiChevronRight} boxSize="14px" />}
        {item.isActive ? (
          <Text color="main.1" fontWeight={600} fontSize="16px" noOfLines={1}>
            {item.title}
          </Text>
        ) : (
          <Link href={item.href}>
            <Text _hover={{ color: 'main.1' }} transition="color 0.2s" fontSize="16px" noOfLines={1}>
              {i === 0 && <Icon as={FiHome} boxSize="15px" mr="4px" mb="-2px" />}
              {item.title}
            </Text>
          </Link>
        )}
      </Flex>
    ))}
  </Flex>
);

// ═══════════════════════════════════════════
// Image Gallery
// ═══════════════════════════════════════════
const ImageGallery = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // images đã được resolveImages() xử lý, chắc chắn là array
  const validImages = images.length > 0 ? images : [FALLBACK_IMAGE];
  const currentImage = (validImages[selectedIndex] || validImages[0] || FALLBACK_IMAGE).replace('http://', 'https://');

  return (
    <Flex direction="column" gap="16px" align="center">
      <Box
        position="relative"
        bg="white"
        borderRadius="24px"
        border="2px solid"
        borderColor="main.0"
        p="16px"
        w="full"
        overflow="hidden"
        boxShadow="0 8px 32px rgba(119, 208, 232, 0.15)"
      >
        <FloatingBubble size="60px" top="-10px" right="-10px" delay="0s" color="main.1" />
        <FloatingBubble size="40px" top="60%" left="-8px" delay="1s" color="sub.1" />
        <FloatingBubble size="35px" top="15%" left="5%" delay="1.8s" color="#92d9ed" />
        <FloatingBubble size="50px" top="80%" right="8%" delay="0.5s" color="#ffbd66" />
        <FloatingBubble size="28px" top="40%" right="-5px" delay="2.2s" color="main.1" />
        <FloatingBubble size="45px" top="5%" left="40%" delay="2.8s" color="sub.1" />

        <AspectRatio ratio={1} w="full" position="relative" zIndex={1}>
          <Image
            src={currentImage}
            alt={title || IMG_ALT}
            objectFit="contain"
            borderRadius="16px"
            loading="eager"
            onError={(e) => {
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </AspectRatio>
      </Box>

      {validImages.length > 1 && validImages[0] !== FALLBACK_IMAGE && (
        <Flex gap="10px" justify="center" flexWrap="wrap">
          {validImages.map((img, i) => (
            <Box
              key={i}
              w="64px"
              h="64px"
              borderRadius="12px"
              border="2px solid"
              borderColor={selectedIndex === i ? 'main.1' : 'gray.200'}
              cursor="pointer"
              overflow="hidden"
              transition="all 0.2s"
              transform={selectedIndex === i ? 'scale(1.1)' : 'scale(1)'}
              boxShadow={selectedIndex === i ? '0 4px 12px rgba(119, 208, 232, 0.4)' : 'none'}
              onClick={() => setSelectedIndex(i)}
              _hover={{ borderColor: 'main.1', transform: 'scale(1.05)' }}
            >
              <Image
                src={img?.replace('http://', 'https://')}
                alt={`${title} ${i + 1}`}
                w="full"
                h="full"
                objectFit="cover"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

// ═══════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════
const ProductDetailClient = ({ productDetail, relatedProducts = [] }) => {
  const productImages = resolveImages(productDetail);

  const {
    title,
    description = '',
    instruction = '',
    general_description = '',
    imagesUrl,
    price,
    kiotviet_price,
    categoryHierarchy = [],
    category,
    rate,
    slug
  } = productDetail;

  const displayPrice = price || kiotviet_price;

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản phẩm', href: '/san-pham' },
    ...categoryHierarchy.map((cat) => ({
      title: cat.name,
      href: `/san-pham/${cat.slug}`
    })),
    { title, href: '#', isActive: true }
  ];

  const hasDescription = description && description !== '<p></p>' && description !== '';
  const hasInstruction = instruction && instruction !== '<p></p>' && instruction !== '';
  const hasGeneralDesc = general_description && general_description !== '<p></p>' && general_description !== '';
  const hasTabs = hasDescription || hasInstruction || hasGeneralDesc;

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1280: { slidesPerView: 4 }
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      minH="100vh"
      bg="linear-gradient(180deg, #f0fafd 0%, #ffffff 40%, #fff9f0 80%, #ffffff 100%)"
    >
      {/* ── Background decorations ── */}
      <FloatingBubble size="140px" top="2%" left="1%" delay="0s" color="#77D0E8" />
      <FloatingBubble size="70px" top="6%" left="15%" delay="2.5s" color="#ffbd66" />
      <FloatingBubble size="90px" top="12%" right="4%" delay="1.2s" color="#FF9E20" />
      <FloatingBubble size="50px" top="20%" right="18%" delay="0.6s" color="#92d9ed" />
      <FloatingBubble size="110px" top="30%" left="2%" delay="1.8s" color="#77D0E8" />
      <FloatingBubble size="60px" top="38%" right="6%" delay="3s" color="#ffbd66" />
      <FloatingBubble size="80px" top="48%" left="5%" delay="0.4s" color="#92d9ed" />
      <FloatingBubble size="45px" top="52%" left="20%" delay="2s" color="#FF9E20" />
      <FloatingBubble size="100px" top="60%" right="3%" delay="1s" color="#77D0E8" />
      <FloatingBubble size="55px" top="68%" left="8%" delay="2.8s" color="#ffbd66" />
      <FloatingBubble size="75px" top="75%" right="10%" delay="0.2s" color="#92d9ed" />
      <FloatingBubble size="65px" top="82%" left="3%" delay="1.5s" color="#FF9E20" />
      <FloatingBubble size="85px" top="88%" right="5%" delay="3.2s" color="#77D0E8" />
      <FloatingBubble size="40px" top="92%" left="12%" delay="0.8s" color="#ffbd66" />

      {/* ── Mascot peek ── */}
      <Image
        display={{ xs: 'none', xl: 'block' }}
        src="/images/lermao-run.gif"
        alt={IMG_ALT}
        w="100px"
        h="auto"
        position="absolute"
        top="220px"
        right="40px"
        zIndex={2}
        opacity={0.6}
        sx={{
          animation: 'mascotBounce 3s ease-in-out infinite',
          '@keyframes mascotBounce': {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(5deg)' }
          }
        }}
      />

      <Container
        maxW="container.2xl"
        px={PX_ALL}
        pt={{ xs: '90px', lg: '160px' }}
        pb="80px"
        position="relative"
        zIndex={1}
      >
        {/* ── Breadcrumb ── */}
        <Breadcrumb items={breadcrumbData} />

        {/* ── Back button ── */}
        <Link href="/san-pham">
          <Button
            mt="12px"
            mb="24px"
            size="md"
            fontSize="16px"
            variant="ghost"
            leftIcon={<Icon as={FiArrowLeft} boxSize="18px" />}
            color="gray.500"
            _hover={{ color: '', bg: 'main.0', bgOpacity: 0.1 }}
          >
            Quay lại sản phẩm
          </Button>
        </Link>

        {/* ══════════════════════════════════════
            PRODUCT MAIN SECTION
        ══════════════════════════════════════ */}
        <Grid templateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={{ xs: '32px', lg: '60px' }} alignItems="start">
          {/* ── Left: Image Gallery ── */}
          <GridItem>
            <ImageGallery images={productImages} title={title} />
          </GridItem>

          {/* ── Right: Product Info ── */}
          <GridItem>
            <VStack align="start" spacing="20px">
              {/* Category badge */}
              {category && (
                <Link href={`/san-pham/${category.slug}`}>
                  <Badge
                    px="12px"
                    py="4px"
                    borderRadius="full"
                    bg="main.0"
                    color="white"
                    fontWeight={600}
                    fontSize="12px"
                    textTransform="none"
                    _hover={{ bg: 'main.1' }}
                    transition="all 0.2s"
                  >
                    {category.name}
                  </Badge>
                </Link>
              )}

              {/* Title */}
              <Text
                as="h1"
                fontSize={{ xs: '26px', md: '32px', lg: '36px' }}
                fontWeight={800}
                color="#1d2128"
                lineHeight="1.2"
              >
                {title}
              </Text>

              {/* Price card */}
              <Box
                w="full"
                bg="linear-gradient(135deg, #ffffff 0%, #fff5e6 100%)"
                borderRadius="20px"
                p="24px"
                border="1px solid"
                borderColor="main.0"
                position="relative"
                overflow="hidden"
              >
                <FloatingBubble size="50px" top="-15px" right="-15px" delay="0.5s" color="sub.1" />
                <FloatingBubble size="35px" top="50%" left="-10px" delay="1.5s" color="main.1" />
                <FloatingBubble size="30px" top="-10px" left="30%" delay="2s" color="#ffbd66" />

                {displayPrice && displayPrice > 0 ? (
                  <Flex align="center" gap="12px" position="relative" zIndex={1}>
                    <Text fontSize={{ xs: '28px', lg: '36px' }} fontWeight={800} color="sub.2">
                      {formatCurrency(displayPrice)}
                    </Text>
                  </Flex>
                ) : (
                  <Flex align="center" gap="12px" position="relative" zIndex={1}>
                    <Box px="20px" py="8px" borderRadius="full" bg="main.1" color="white">
                      <Text fontSize="18px" fontWeight={700}>
                        Liên hệ để biết giá
                      </Text>
                    </Box>
                  </Flex>
                )}
              </Box>

              {/* General description */}
              {hasDescription && (
                <Box
                  w="full"
                  bg="white"
                  borderRadius="16px"
                  p="20px"
                  border="1px solid #f0f0f0"
                  boxShadow="0 2px 8px rgba(0,0,0,0.04)"
                >
                  <Box
                    className="html-content"
                    fontSize="15px"
                    lineHeight="1.8"
                    color="gray.700"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </Box>
              )}

              {/* CTA Buttons */}
              <Flex gap="12px" w="full" direction={{ xs: 'column', sm: 'row' }}>
                <Button
                  flex={1}
                  h="52px"
                  bg="main.1"
                  color="white"
                  fontSize="16px"
                  fontWeight={700}
                  borderRadius="16px"
                  leftIcon={<Icon as={FiPackage} boxSize="18px" />}
                  _hover={{
                    bg: '#5bc4de',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(119, 208, 232, 0.4)'
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.2s"
                >
                  Liên hệ đặt hàng
                </Button>

                {/* <Button
                  flex={1}
                  h="52px"
                  bg="white"
                  color="sub.2"
                  fontSize="16px"
                  fontWeight={700}
                  borderRadius="16px"
                  border="2px solid"
                  borderColor="sub.1"
                  _hover={{
                    bg: 'sub.1',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(255, 158, 32, 0.3)'
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.2s"
                  as="a"
                  href="tel:+84931566676"
                >
                  Gọi ngay: 0931 566 676
                </Button> */}
              </Flex>
            </VStack>
          </GridItem>
        </Grid>

        {/* ══════════════════════════════════════
            TABS: Mô tả + Hướng dẫn
        ══════════════════════════════════════ */}
        {hasTabs && (
          <Box
            mt={{ xs: '48px', lg: '72px' }}
            bg="white"
            borderRadius="24px"
            border="1px solid #f0f0f0"
            boxShadow="0 4px 20px rgba(0,0,0,0.04)"
            overflow="hidden"
          >
            <Tabs variant="unstyled" defaultIndex={0}>
              <TabList
                bg="linear-gradient(135deg, #f0fafd 0%, #fef7ed 100%)"
                px="24px"
                pt="8px"
                gap="4px"
                overflowX="auto"
              >
                {hasInstruction && (
                  <Tab
                    px="20px"
                    py="14px"
                    fontWeight={600}
                    fontSize="15px"
                    color="gray.500"
                    borderBottom="3px solid transparent"
                    _selected={{
                      color: 'main.1',
                      borderBottomColor: 'main.1',
                      bg: 'white',
                      borderTopRadius: '12px'
                    }}
                    _hover={{ color: 'main.1' }}
                    transition="all 0.2s"
                  >
                    <Icon as={FiBookOpen} mr="8px" />
                    Thông tin sản phẩm
                  </Tab>
                )}
                {/* {hasInstruction && (
                  <Tab
                    px="20px"
                    py="14px"
                    fontWeight={600}
                    fontSize="15px"
                    color="gray.500"
                    borderBottom="3px solid transparent"
                    _selected={{
                      color: 'sub.2',
                      borderBottomColor: 'sub.2',
                      bg: 'white',
                      borderTopRadius: '12px'
                    }}
                    _hover={{ color: 'sub.1' }}
                    transition="all 0.2s"
                  >
                    <Icon as={FiStar} mr="8px" />
                    Hướng dẫn sử dụng
                  </Tab>
                )} */}
              </TabList>

              <TabPanels>
                {hasInstruction && (
                  <TabPanel p={{ xs: '20px', lg: '40px' }}>
                    <Box
                      className="html-content"
                      fontSize="15px"
                      lineHeight="2"
                      color="gray.700"
                      dangerouslySetInnerHTML={{ __html: instruction }}
                      sx={{
                        img: { borderRadius: '12px', my: '16px', maxW: '100%' },
                        'h2, h3': { color: '#1d2128', mt: '24px', mb: '12px' },
                        p: { mb: '12px' }
                      }}
                    />
                  </TabPanel>
                )}
                {/* {hasInstruction && (
                  <TabPanel p={{ xs: '20px', lg: '40px' }}>
                    <Box
                      className="html-content"
                      fontSize="15px"
                      lineHeight="2"
                      color="gray.700"
                      dangerouslySetInnerHTML={{ __html: instruction }}
                      sx={{
                        img: { borderRadius: '12px', my: '16px', maxW: '100%' },
                        'h2, h3': { color: '#1d2128', mt: '24px', mb: '12px' },
                        p: { mb: '12px' }
                      }}
                    />
                  </TabPanel>
                )} */}
              </TabPanels>
            </Tabs>
          </Box>
        )}

        {/* ══════════════════════════════════════
            RELATED PRODUCTS
        ══════════════════════════════════════ */}
        {relatedProducts.length > 0 && (
          <Box mt={{ xs: '48px', lg: '72px' }} position="relative">
            <Flex align="center" justify="center" gap="16px" mb="32px">
              <Box h="2px" flex={1} maxW="120px" bg="linear-gradient(90deg, transparent, #77D0E8)" />
              <HStack spacing="8px">
                <Image src="/images/lermao-run.gif" alt={IMG_ALT} w="40px" h="auto" />
                <Text
                  fontSize={{ xs: '22px', lg: '28px' }}
                  fontWeight={800}
                  bgGradient="linear(to-r, main.1, #20e0ff)"
                  bgClip="text"
                >
                  Sản phẩm liên quan
                </Text>
              </HStack>
              <Box h="2px" flex={1} maxW="120px" bg="linear-gradient(90deg, #20e0ff, transparent)" />
            </Flex>

            <Carousel breakpoints={breakpoints} slidesPerView={4} spaceBetween={20}>
              {relatedProducts.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </Carousel>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetailClient;
