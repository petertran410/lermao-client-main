'use client';

import TitleSpecial from '@/components/title-special';
import { IMG_ALT } from '@/utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

const Vision = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Flex mt="30px" direction="column" bgColor="#FFF" px="26px">
      <TitleSpecial fontSize={32} textAlign="center">
        Tầm nhìn, sứ mệnh
      </TitleSpecial>

      <Flex align="center" mt="40px" gap="20px" display={{ xs: 'none', lg: 'flex' }}>
        <Parallax scale={[0.5, 1]} easing="easeInOut" speed={10}>
          <Image
            willChange="scroll-position"
            src="/images/fruit-pattern-left.png"
            w={{ xs: '212px', lg: '155px', '2xl': '280px' }}
            h={{ xs: '212px', lg: '155px', '2xl': '280px' }}
            alt={IMG_ALT}
            display={{ xs: 'none', lg: 'block' }}
            pos="relative"
            top="220px"
            zIndex={100}
          />
        </Parallax>

        <Flex align="center" flex={1} gap="72px" justify="center">
          <Flex pos="relative" flex={1} ml={{ xs: '0px', lg: '0px', '2xl': '25px' }}>
            <Image src="/images/bg-vision-left.png" h="180px" w="full" alt={IMG_ALT} />
            <Flex
              direction="column"
              gap="4px"
              pos="absolute"
              top={0}
              left={0}
              w="full"
              align="center"
              justify="center"
              px="16px"
              pb="10px"
              pt={{ xs: '0px', lg: '20px', '2xl': '28px' }}
            >
              <Text fontSize={16} fontWeight={700} align="center">
                TẦM NHÌN
              </Text>
              <Text align="center" lineHeight="18px">
                Trở thành đơn vị dẫn đầu trong cung cấp giải pháp toàn diện cho khách hàng trong ngành F&B
              </Text>
            </Flex>
          </Flex>
          <Image
            src="/images/lermao.png"
            w={{ xs: '140px', lg: '120px', xl: '140px' }}
            h={{ xs: '240px', lg: '200px', xl: '240px' }}
            alt={IMG_ALT}
          />
          <Flex pos="relative" flex={1} mr={{ xs: '0px', lg: '0px', '2xl': '70px' }}>
            <Image src="/images/bg-vision-right.png" h="180px" w="full" alt={IMG_ALT} />
            <Flex
              direction="column"
              gap="4px"
              pos="absolute"
              top={0}
              left={0}
              w="full"
              align="center"
              justify="center"
              px="16px"
              pb="10px"
              pt={{ xs: '0px', lg: '20px', '2xl': '28px' }}
            >
              <Text fontSize={16} fontWeight={700} align="center">
                SỨ MỆNH
              </Text>
              <Text align="center" lineHeight="18px">
                Đưa ngành đồ uống Việt Nam tiệm cận với ngành F&B của các nước phát triển trên thế giới
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Parallax scale={[0.5, 1]} easing="easeInOut" speed={10}>
          <Image
            src="/images/fruit-pattern-right.png"
            w={{ xs: '212px', lg: '155px', '2xl': '280px' }}
            h={{ xs: '212px', lg: '155px', '2xl': '280px' }}
            alt={IMG_ALT}
            display={{ xs: 'none', lg: 'block' }}
            pos="relative"
            top="220px"
            zIndex={100}
          />
        </Parallax>
      </Flex>

      <Flex display={{ xs: 'flex', lg: 'none' }} mt="40px" direction="column" gap="40px">
        <Flex
          align="center"
          justify="center"
          borderRadius={16}
          border="1px solid"
          borderColor="main.1"
          px="16px"
          py="12px"
          direction="column"
          gap="6px"
        >
          <Text fontWeight={700} fontSize={16}>
            TẦM NHÌN
          </Text>
          <Text textAlign="center">
            Trở thành đơn vị dẫn đầu trong cung cấp giải pháp toàn diện cho khách hàng trong ngành F&B
          </Text>
        </Flex>

        <Flex
          align="center"
          justify="center"
          borderRadius={16}
          border="1px solid"
          borderColor="main.1"
          px="16px"
          py="12px"
          direction="column"
          gap="6px"
        >
          <Text fontWeight={700} fontSize={16}>
            SỨ MỆNH
          </Text>
          <Text textAlign="center">
            Đưa ngành đồ uống Việt Nam tiệm cận với ngành F&B của các nước phát triển trên thế giới
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Vision;
