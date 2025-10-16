'use client';

import Carousel from '@/components/carousel';
import { IMG_ALT } from '@/utils/const';
import { AspectRatio, Box, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const ProductImage = (props) => {
  const { imagesUrl = [] } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [imageWidth, setImageWidth] = useState();
  const imageRef = useRef(null);

  const breakpoints = {
    1: { slidesPerView: 3 },
    576: { slidesPerView: 3 },
    992: { slidesPerView: 3 }
  };

  useEffect(() => {
    if (imageRef && imageRef.current) {
      setImageWidth(imageRef.current.clientWidth);
    }
  }, []);

  return (
    <>
      <Image
        ref={imageRef}
        src={imagesUrl?.[currentImage]?.replace('http://', 'https://')}
        alt={IMG_ALT}
        w={{ xs: '80%', md: '100%' }}
        h={{ xs: '380px', md: '220px', lg: '380px' }}
        fit="contain"
      />
      {!!imagesUrl?.[1]?.replace('http://', 'https://') && (
        <Box mt="16px" w={imageWidth}>
          <Carousel breakpoints={breakpoints} autoplay={false} spaceBetween={8}>
            {imagesUrl?.map((item, index) => {
              return (
                <AspectRatio ratio={1 / 1} key={index}>
                  <Image
                    src={item?.replace('http://', 'https://')}
                    alt={IMG_ALT}
                    border="1px solid #f2f2f2"
                    h="full"
                    w="full"
                    fit="cover"
                    cursor="pointer"
                    onClick={() => setCurrentImage(index)}
                  />
                </AspectRatio>
              );
            })}
          </Carousel>
        </Box>
      )}
    </>
  );
};

export default ProductImage;
