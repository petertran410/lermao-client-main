'use client';

import { IMG_ALT } from '@/utils/const';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Children, cloneElement, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = (props) => {
  const { children, breakpoints, spaceBetween = 20, slidesPerView = 2, autoplay = true } = props;
  const swiperRef = useRef(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const defaultBreakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 }
  };

  return (
    <Box w={{ xs: '85%', md: '95%' }} mx="auto" pos="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        breakpoints={breakpoints || defaultBreakpoints}
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {Children.map(children, (child) => cloneElement(<SwiperSlide>{child}</SwiperSlide>))}
      </Swiper>

      <Flex
        align="center"
        justify="center"
        pos="absolute"
        w="24px"
        h="24px"
        p={0}
        onClick={() => {
          if (disablePrev) {
            return;
          }
          swiperRef.current?.slidePrev();
          setDisableNext(swiperRef.current?.isEnd);
          setDisablePrev(swiperRef.current?.isBeginning);
        }}
        bgColor="#FFF"
        top="calc(50% - 10px)"
        left="-34px"
        borderRadius="full"
        zIndex={100}
        cursor="pointer"
        boxShadow="0px 4px 16px 0px #0000000D"
        opacity={disablePrev ? 0.4 : 1}
      >
        <Image src="/images/caret-left.png" w="6px" h="10px" alt={IMG_ALT} />
      </Flex>

      <Flex
        align="center"
        justify="center"
        pos="absolute"
        w="24px"
        h="24px"
        p={0}
        onClick={() => {
          if (disableNext) {
            return;
          }
          swiperRef.current?.slideNext();
          setDisableNext(swiperRef.current?.isEnd);
          setDisablePrev(swiperRef.current?.isBeginning);
        }}
        bgColor="#FFF"
        top="calc(50% - 10px)"
        right="-34px"
        borderRadius="full"
        zIndex={100}
        cursor="pointer"
        boxShadow="0px 4px 16px 0px #0000000D"
        opacity={disableNext ? 0.4 : 1}
      >
        <Image src="/images/caret-right.png" w="6px" h="10px" alt={IMG_ALT} />
      </Flex>
    </Box>
  );
};

export default Carousel;
