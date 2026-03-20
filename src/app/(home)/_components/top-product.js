'use client';

import Carousel from '@/components/carousel';
import { useQueryTopProducts } from '@/services/product.service';
import { IMG_ALT } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Suspense } from 'react';

const TopProductItem = (props) => {
  const { item } = props;
  const { title, id = '1', imagesUrl, featuredThumbnail } = item || {};

  let image = imagesUrl?.[0]?.replace('http://', 'https://');
  if (featuredThumbnail) {
    image = featuredThumbnail?.replace('http://', 'https://');
  }

  return (
    <Flex
      borderRadius={16}
      p="16px"
      bgImage="url(/images/bg-top-product.png)"
      bgSize="cover"
      bgRepeat="no-repeat"
      h="150px"
      gap="24px"
    >
      <Flex align="center" justify="center" w="120px" h="120px" bgColor="#FFF" p="10px" borderRadius={8}>
        <Image src={image || '/images/product.png'} alt={IMG_ALT} fit="cover" w="70%" h="auto" />
      </Flex>

      <Flex direction="column" justify="space-between" flex={1}>
        <Box>
          <Text fontWeight={400} fontSize={12} color="#FFF" _hover={{ color: '#FFF' }}>
            Tên sản phẩm
          </Text>
          <Text fontWeight={700} fontSize={16} mt="4px" color="#FFF" noOfLines={2} _hover={{ color: '#FFF' }}>
            {title}
          </Text>
        </Box>

        <Box>
          <Link href={`/nguyen-lieu-pha-che/${convertSlugURL(title)}.${id}`}>
            <Flex
              fontSize={16}
              fontWeight={700}
              color="#FFF"
              gap="4px"
              w="160px"
              h="40px"
              border="1px solid #FFF"
              borderRadius={8}
              bgColor="transparent"
              align="center"
              justify="center"
              transitionDuration="250ms"
              _hover={{ bgColor: 'transparent', color: '#f5f5f5', borderColor: '#f5f5f5' }}
              _active={{ bgColor: 'transparent', color: '#f5f5f5', borderColor: '#f5f5f5' }}
            >
              Xem chi tiết
              <Image src="/images/arrow-right-white.png" alt={IMG_ALT} w="24px" h="24px" />
            </Flex>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

const TopProduct = () => {
  const { data: dataQuery } = useQueryTopProducts();
  const { content = [] } = dataQuery || {};

  if (!Array.isArray(content) || !content.length) {
    return null;
  }

  return (
    <Flex direction="column" gap="16px" mt="40px">
      <Text textAlign="center" fontWeight={700} fontSize={16} _hover={{ color: 'text.1' }}>
        Sản phẩm nổi bật
      </Text>

      <Carousel>
        {content.map((item) => (
          <TopProductItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Flex>
  );
};

const TopProductWrap = () => {
  return (
    <Suspense>
      <TopProduct />
    </Suspense>
  );
};

export default TopProductWrap;
