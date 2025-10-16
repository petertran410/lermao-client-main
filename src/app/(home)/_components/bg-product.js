'use client';

import { IMG_ALT } from '@/utils/const';
import { Flex, Image } from '@chakra-ui/react';
import { Parallax } from 'react-scroll-parallax';

const BgProduct = () => {
  return (
    <Flex
      display={{ xs: 'none', lg: 'flex' }}
      align="center"
      justify="space-between"
      w="full"
      px={{ lg: '20px', '2xl': '60px' }}
      h={{ lg: '150px', '2xl': '260px' }}
      pos="absolute"
      top="180px"
      left={0}
    >
      <Parallax scale={[0.8, 1.2]} easing="easeInOut" speed={10}>
        <Image
          src="/images/fruit-pattern-left.png"
          alt={IMG_ALT}
          h={{ lg: '150px', '2xl': '260px' }}
          w="auto"
          fit="contain"
        />
      </Parallax>

      <Parallax scale={[0.8, 1.2]} easing="easeInOut" speed={10}>
        <Image
          src="/images/fruit-pattern-right.png"
          alt={IMG_ALT}
          h={{ lg: '150px', '2xl': '260px' }}
          w="auto"
          fit="contain"
        />
      </Parallax>
    </Flex>
  );
};

export default BgProduct;
