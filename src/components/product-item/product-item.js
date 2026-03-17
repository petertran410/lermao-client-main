'use client';

import { formatCurrency } from '../../utils/helper-server';
import { IMG_ALT } from '../../utils/const';
import { AspectRatio, Box, Flex, Image, Text, Tag } from '@chakra-ui/react';
import Link from 'next/link';

const FALLBACK_IMAGE = '/images/lermao.png';

const ProductItem = ({ item }) => {
  const { id, title, title_en, kiotviet_name, kiotviet_price, imagesUrl, slug, kiotviet_images, price } = item || {};

  const productSlug = slug;
  const showName = title || kiotviet_name || 'Sản phẩm';
  const displayPrice = price || kiotviet_price;

  const getProductImage = () => {
    // 1. imagesUrl từ API (đã parse sẵn thành array)
    if (Array.isArray(imagesUrl) && imagesUrl.length > 0 && imagesUrl[0]) {
      return imagesUrl[0].replace('http://', 'https://');
    }

    // 2. Fallback: kiotviet_images
    if (Array.isArray(kiotviet_images) && kiotviet_images.length > 0 && kiotviet_images[0]) {
      return kiotviet_images[0].replace('http://', 'https://');
    }

    // 3. Ảnh mặc định lermao
    return FALLBACK_IMAGE;
  };

  return (
    <Box
      w="100%"
      maxW={{ xs: '100%', md: '320px' }}
      mx="auto"
      h="100%"
      borderRadius={16}
      bgColor="#FFF"
      overflow="hidden"
      cursor="pointer"
      transitionDuration="250ms"
      border="1px solid #f1f3f4"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(13,102,191,0.5)'
      }}
      position="relative"
    >
      <Link href={`/san-pham/${productSlug}`}>
        <AspectRatio ratio={1 / 1} w="full">
          <Box
            w="full"
            h="full"
            bgColor="#FFF"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <Image
              src={getProductImage()}
              alt={showName || IMG_ALT}
              maxW="full"
              maxH="full"
              objectFit="contain"
              loading="lazy"
              onError={(e) => {
                e.target.src = FALLBACK_IMAGE;
              }}
            />
          </Box>
        </AspectRatio>

        <Flex direction="column" p="12px" gap="6px">
          <Text
            fontSize="17px"
            fontWeight={600}
            color="#333"
            align="center"
            lineHeight="1"
            minH="32px"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {showName}
          </Text>

          <Flex justify="center" align="center" mt="6px">
            {!displayPrice || displayPrice === 0 ? (
              <Tag colorScheme="blue" size="sm" fontWeight="600">
                Liên hệ
              </Tag>
            ) : (
              <Text color="#1E96BC" fontSize="16px" fontWeight={700}>
                {formatCurrency(displayPrice)}
              </Text>
            )}
          </Flex>

          <Flex
            mt="6px"
            bgColor="#53C1E7"
            color="white"
            py="6px"
            borderRadius="6px"
            justify="center"
            align="center"
            _hover={{ bgColor: '#3366ff' }}
            transitionDuration="200ms"
          >
            <Text fontSize="16px" fontWeight="600" color="white">
              Mua hàng
            </Text>
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export default ProductItem;
