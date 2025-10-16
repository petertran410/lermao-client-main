'use client';

import TitleSpecial from '@/components/title-special';
import { cartAtom } from '@/states/common';
import { PX_ALL } from '@/utils/const';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import CartProduct from './cart-product';
import EmptyCart from './empty-cart';
import OtherProduct from './other-product';

const Cart = () => {
  const cart = useRecoilValue(cartAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Suspense>
      <Flex direction="column" px={PX_ALL} pt={{ xs: '12px', md: '48px' }} zIndex={10} pos="relative">
        <Flex
          justify="space-between"
          align={{ xs: 'flex-start', md: 'flex-end' }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <TitleSpecial>Giỏ hàng của bạn</TitleSpecial>

          <Text fontWeight={700} fontSize={16} color="#EA1D21" textTransform="uppercase">
            {cart?.length || 0} sản phẩm
          </Text>
        </Flex>
        <Box h="1px" w="full" bgColor="#E1E2E3" mt="8px" mb="32px" />

        {cart?.length ? <CartProduct /> : <EmptyCart />}

        <OtherProduct />
      </Flex>
    </Suspense>
  );
};

export default Cart;
