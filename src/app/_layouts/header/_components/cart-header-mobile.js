import { cartAtom } from '@/states/common';
import { IMG_ALT } from '@/utils/const';
import { Box, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const CartHeaderMobile = () => {
  const cart = useRecoilValue(cartAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Link href="/gio-hang" title="Giỏ hàng">
      <Box pos="relative" transitionDuration="250ms" _hover={{ opacity: 0.8 }}>
        <Image src="/images/cart.png" w="36px" h="36px" alt={IMG_ALT} />
        {!!cart?.length && (
          <Text
            bgColor="#EA1D21"
            borderRadius={20}
            color="#FFF"
            fontSize={10}
            px="4px"
            pos="absolute"
            top={-1}
            right={-3}
          >
            {cart.length}
          </Text>
        )}
      </Box>
    </Link>
  );
};

export default CartHeaderMobile;
