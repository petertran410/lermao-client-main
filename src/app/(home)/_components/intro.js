import TitleSpecial from '@/components/title-special';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const HomeIntro = () => {
  return (
    <Flex
      px={PX_ALL}
      direction={{ xs: 'column', lg: 'row' }}
      gap="80px"
      align="center"
      mt="56px"
      pos="relative"
      justify="space-between"
    >
      <Flex flex={2 / 5} direction="column">
        <TitleSpecial fontSize={{ xs: 28, lg: 30, '2xl': 32 }} textAlign={{ xs: 'center', lg: 'left' }}>
          Chào mừng bạn đến với nhà Gấu Lermao
        </TitleSpecial>

        <Text mt="24px" fontSize={16} textAlign="justify">
          Gấu LerMao tự hào là thương hiệu dẫn đầu trong hoạt động cung cấp nguyên liệu pha chế toàn diện, sẵn sàng đồng
          hành cùng các chủ doanh nghiệp kinh doanh ngành F&B, coffee, trà sữa và đồ uống trên toàn quốc.
        </Text>

        <Flex justify={{ xs: 'center', lg: 'flex-start' }} mt="32px">
          <Link href="/gioi-thieu">
            <Flex
              align="center"
              justify="center"
              bgColor="#00b7e9"
              color="#FFF"
              w="290px"
              h="56px"
              gap="4px"
              fontSize={16}
              borderRadius={8}
              fontWeight={700}
              transitionDuration="250ms"
              _hover={{ opacity: 0.8, color: '#FFF' }}
              _active={{ opacity: 0.8, color: '#FFF' }}
            >
              Câu chuyện của chúng tớ
              <Image src="/images/arrow-right-white.png" alt={IMG_ALT} w="24px" h="24px" />
            </Flex>
          </Link>
        </Flex>
      </Flex>

      <Flex flex={3 / 5} justify="flex-end" pos="relative">
        <Box
          pos="relative"
          w={{ xs: '300px', lg: '400px', '2xl': '450px' }}
          h={{ xs: '300px', lg: '400px', '2xl': '450px' }}
        >
          <Image
            src="/images/intro.gif"
            alt={IMG_ALT}
            w="auto"
            h="full"
            borderRadius="full"
            pos="absolute"
            top={0}
            left={0}
          />

          <Image
            src="/images/cloud-intro.png"
            alt={IMG_ALT}
            w={{ xs: '150px', lg: '180px', '2xl': '200px' }}
            h="auto"
            fit="contain"
            borderRadius="full"
            pos="absolute"
            top={{ xs: '16%', md: '20%' }}
            left="-25%"
          />
        </Box>
        <Box pos="absolute" top="7%" right="-3%">
          <Image
            src="/images/dot-intro.png"
            fit="contain"
            alt={IMG_ALT}
            w={{ xs: '475px', lg: '430px', '2xl': '475px' }}
            h="120%"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomeIntro;
