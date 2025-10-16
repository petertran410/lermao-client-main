import { IMG_ALT } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const EmptyCart = () => {
  return (
    <Flex w={{ xs: '100%', md: '60%' }} mx="auto" align="center" gap="24px">
      <Flex flex={{ xs: 1, md: 2 / 3 }} direction="column">
        <Box mb="20px" pos="relative">
          <Image src="/images/cart-description.png" alt={IMG_ALT} />
          <Box p="24px" pos="absolute" top={0} left={0} w="full" zIndex={5}>
            <Text lineHeight="18px">
              Giỏ hàng của bạn chưa có sản phẩm nào. Hãy tham khảo danh mục sản phẩm của chúng tớ để thêm vào giỏ hàng
            </Text>
          </Box>
        </Box>
        <Link href="/san-pham">
          <Flex
            align="center"
            justify="center"
            bgColor="main.1"
            color="#FFF"
            w="208px"
            h="40px"
            gap="4px"
            mx={{ xs: 'auto', md: 'initial' }}
            fontSize={16}
            borderRadius={8}
            fontWeight={700}
            _hover={{ opacity: 0.8, color: '#FFF' }}
            _active={{ opacity: 0.8, color: '#FFF' }}
          >
            Danh mục sản phẩm
          </Flex>
        </Link>
      </Flex>

      <Flex flex={1 / 3} display={{ xs: 'none', md: 'flex' }}>
        <Image src="/images/lermao.png" alt={IMG_ALT} />
      </Flex>
    </Flex>
  );
};

export default EmptyCart;
