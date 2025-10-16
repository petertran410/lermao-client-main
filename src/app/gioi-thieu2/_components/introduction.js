'use client';

import TitleSpecial from '@/components/title-special';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Introduction = () => {
  return (
    <Flex pt={{ xs: '40px', lg: '82px' }} pos="relative" bgGradient="linear(to-b, #96e7fc, #ffffff)">
      <Flex justify="center" align="center" direction="column" gap="16px" px={PX_ALL} pos="relative" zIndex={10}>
        <Box boxSize="304px" borderRadius="full" overflow="hidden">
          <Image src="/images/intro.gif" alt={IMG_ALT} w="full" h="full" />
        </Box>

        <TitleSpecial fontSize={32} mt={{ xs: '14px', md: 0 }}>
          Gấu LerMao
        </TitleSpecial>

        <Text textAlign="center">
          Tự hào là thương hiệu dẫn đầu trong hoạt động cung cấp nguyên liệu pha chế toàn diện, sẵn sàng đồng hành cùng
          các chủ doanh nghiệp kinh doanh ngành F&B, coffee, trà sữa và đồ uống trên toàn quốc. Với sứ mệnh mang đến
          những sản phẩm chất lượng vượt trội, Gấu LerMao luôn cam kết cung cấp nguồn nguyên liệu tươi ngon, đa dạng và
          an toàn nhất. Chúng tôi không chỉ đáp ứng nhu cầu sáng tạo của các nhà pha chế, mà còn mang đến giải pháp toàn
          diện cho các doanh nghiệp, nâng tầm mọi thức uống trong menu, chinh phục khẩu vị khách hàng của bạn một cách
          trọn vẹn.
        </Text>

        <MotionButton
          mt={{ xs: '48px', md: '82px' }}
          mb={{ xs: '36px', md: '80px' }}
          w="48px"
          h="48px"
          p={0}
          minH={0}
          minW={0}
          mx="auto"
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          _active={{ bgColor: 'transparent' }}
          zIndex={10}
          animate={{
            y: ['-12px', '12px']
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        >
          <Image src="/images/expand-down-double.png" w="full" h="full" alt={IMG_ALT} />
        </MotionButton>
      </Flex>

      <Image
        src="/images/bg-intro.png"
        alt={IMG_ALT}
        w="full"
        h={{ xs: '360px', xl: '420px', '2xl': '500px', '3xl': '600px' }}
        fit="cover"
        pos="absolute"
        bottom={0}
        left={0}
      />

      <Image
        display={{ xs: 'none', lg: 'block' }}
        src="/images/intro-cloud-1a.png"
        alt={IMG_ALT}
        w="210px"
        h="auto"
        pos="absolute"
        top="8%"
        left="16%"
      />
      <Image
        display={{ xs: 'none', lg: 'block' }}
        src="/images/intro-cloud-1b.png"
        alt={IMG_ALT}
        w="210px"
        h="auto"
        pos="absolute"
        top="8%"
        right="16%"
      />

      <Image
        src="/images/intro-cloud-3a.png"
        alt={IMG_ALT}
        w="210px"
        h="auto"
        pos="absolute"
        top={{ xs: '34%', lg: '16%' }}
        left="-2%"
      />
      <Image
        src="/images/intro-cloud-3b.png"
        alt={IMG_ALT}
        w="210px"
        h="auto"
        pos="absolute"
        top={{ xs: '34%', lg: '16%' }}
        right="-2%"
      />

      <Image
        display={{ xs: 'none', lg: 'block' }}
        src="/images/intro-cloud-2a.png"
        alt={IMG_ALT}
        w="210px"
        h="auto"
        pos="absolute"
        top="30%"
        left="24%"
      />
      <Image
        display={{ xs: 'none', lg: 'block' }}
        src="/images/intro-cloud-2b.png"
        alt={IMG_ALT}
        w="210px"
        h="auto"
        pos="absolute"
        top="30%"
        right="24%"
      />
    </Flex>
  );
};

export default Introduction;
