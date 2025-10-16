import { IMG_ALT } from '@/utils/const';
import { convertSlugURL, formatCurrency } from '@/utils/helper-server';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const ProductItem = (props) => {
  const { item } = props;

  if (!item) {
    return null;
  }

  const { title, id, price, imagesUrl } = item || {};

  return (
    <Link href={`/san-pham/${convertSlugURL(title)}.${id}`} style={{ display: 'block', height: '100%' }}>
      <Flex
        h="100%"
        direction="column"
        bgColor="#FFF"
        px="16px"
        py="24px"
        gap="16px"
        justify="space-between"
        boxShadow="0px 4px 24px 0px #0000000D"
        borderRadius={16}
      >
        <Flex justify="center" flex={1}>
          <Image
            src={imagesUrl?.[0]?.replace('http://', 'https://')}
            alt={IMG_ALT}
            w="auto"
            h="200px"
            fit="cover"
            borderRadius={8}
            overflow="hidden"
          />
        </Flex>
        <Box h="1px" w="full" bgColor="#E1E2E3" mt="24px" />
        <Flex align="flex-end" gap="16px">
          <Flex direction="column" gap="8px" flex={1}>
            <Text noOfLines={2} fontWeight={700} fontSize={16} h="48px" _hover={{ color: 'text.1' }}>
              {title}
            </Text>
            <Text fontSize={12} color="#EA1D21" _hover={{ color: '#EA1D21' }}>
              {price ? formatCurrency(price) : 'Liên hệ'}
            </Text>
          </Flex>

          <Flex
            align="center"
            justify="center"
            w="40px"
            h="40px"
            border="1px solid #091E28"
            borderRadius={8}
            transitionDuration="250ms"
            _hover={{
              borderColor: '#00b7e9'
            }}
          >
            <Image src="/images/arrow-right-black.png" alt={IMG_ALT} w="24px" h="24px" />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default ProductItem;
