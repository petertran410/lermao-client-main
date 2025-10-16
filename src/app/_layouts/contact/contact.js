'use client';

import { IMG_ALT } from '@/utils/const';
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Contact = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box pos="fixed" top={{ xs: '75%', lg: '48%' }} right={{ xs: '20px', md: '44px' }} zIndex={1000}>
      <Flex
        direction="column"
        border="1px solid #E4E4E7"
        borderRadius="full"
        h={{ xs: '180px', lg: '120px' }}
        w="64px"
        align="center"
        justify="center"
        gap="15px"
        bgColor="#FFF"
        pos="relative"
      >
        {!!showScrollTop && (
          <Button
            title="Lên đầu trang"
            pos="absolute"
            top="-66px"
            left="4px"
            borderRadius="full"
            bgColor="#FFF"
            border="1px solid #E4E4E7"
            alignItems="center"
            justifyContent="center"
            w="56px"
            h="56px"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            _hover={{
              bgColor: '#FFF',
              opacity: 0.8
            }}
            _active={{
              bgColor: '#FFF',
              opacity: 0.8
            }}
          >
            <Image src="/images/arrow-up-black.png" alt={IMG_ALT} w="24px" h="24px" />
          </Button>
        )}

        <Link href="https://zalo.me" target="_blank" _hover={{ textDecor: 'none' }}>
          <Image
            src="/images/zalo-contact.png"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="https://facebook.com" target="_blank" _hover={{ textDecor: 'none' }}>
          <Image
            src="/images/facebook-contact.png"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
        <Link href="tel:+84931566676" _hover={{ textDecor: 'none' }} display={{ xs: 'block', lg: 'none' }}>
          <Image
            src="/images/phone-contact.png"
            alt={IMG_ALT}
            w="40px"
            h="40px"
            transitionDuration="250ms"
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default Contact;
