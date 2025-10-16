import TitleSpecial from '@/components/title-special';
import { Flex, Text } from '@chakra-ui/react';

const Statistic = () => {
  return (
    <Flex
      mt={{ xs: '75px', lg: '132px' }}
      pos="relative"
      w="full"
      h={{ xs: '422px', lg: '287px' }}
      gap={{ xs: '40px', lg: '28px' }}
      justify="center"
      align="center"
      bgImage={{ xs: 'url(/images/bg-achievement-mobile.png)', lg: 'url(/images/bg-achievement.png)' }}
      bgSize="cover"
      bgRepeat="no-repeat"
      direction="column"
      px={{ xs: '20px', lg: 0 }}
    >
      <TitleSpecial color="#FFF" fontSize={32} _hover={{ color: '#FFF' }} textAlign="center">
        Những con số ấn tượng
      </TitleSpecial>
      <Flex direction={{ xs: 'column', lg: 'row' }} justify="center" align="center" gap={{ xs: '40px', lg: '100px' }}>
        <Flex direction="column" align="center" gap="18px">
          <TitleSpecial color="#FFF" fontSize={64} _hover={{ color: '#FFF' }}>
            50+
          </TitleSpecial>
          <Text fontSize={16} fontWeight={700} color="#FFF">
            Tỉnh thành
          </Text>
        </Flex>
        <Flex direction="column" align="center" gap="18px">
          <TitleSpecial color="#FFF" fontSize={64} _hover={{ color: '#FFF' }}>
            30.000+
          </TitleSpecial>
          <Text fontSize={16} fontWeight={700} color="#FFF">
            Đối tác đồng hành
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Statistic;
