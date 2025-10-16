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

        <Text textAlign="justify" color="#091E28" style={{ textAlignLast: 'left' }}>
          Ngày nảy ngày nay, có một gia đình Gấu sống trong khu rừng dọc theo dãy Trường Bạch Sơn tại Trung Quốc. Bố mẹ
          Gấu có hai anh em, anh lớn tên LerMao, em gái nhỏ là LerMi. Mỗi ngày từ ngôi nhà ấy luôn cất lên những tiếng
          cười vui vẻ và hạnh phúc, đặc biệt là tiếng gọi “Maomao” và “Mimi” thân thương ngọt dịu của ba mẹ dành cho hai
          anh em. Em gái nhỏ LerMi dịu dàng, thích nghiên cứu về chế biến thực phẩm, và là nhà nghiên cứu nhỏ đại tài
          của gia đình nhà Gấu. Người anh LerMao thì lém lỉnh, nhanh nhẹn, thích phiêu lưu, đặc biệt rất háu ăn. Tính
          cách trái ngược ấy khiến cả hai trở thành một cặp đôi hoàn hảo, bổ sung và hỗ trợ lẫn nhau trên hành trình
          khám phá hương vị cuộc sống.
          <br />
          <br />
          Gấu LerMao bị thu hút với những điều huyền diệu chỉ có ở dãy Trường Bạch Sơn, và không ngạc nhiên khi cậu trở
          thành người am hiểu nhất vùng đất này. Nơi đây nổi tiếng với rừng cây, ánh nắng chan hòa, và là nơi hội tụ của
          những cây trái ngon nhất thế gian. LerMao ham ăn, sành uống, từ bé đã rong chơi khắp ngọn núi này. Lớn lên,
          cậu bé còn vươn mình đi khắp thế giới để thỏa lòng đam mê phiêu lưu ẩm thực của mình.
          <br />
          <br />
          Trong chuyến phiêu lưu ấy, Gấu LerMao vỡ òa sung sướng khi phát hiện ra rất nhiều thực phẩm hay loại trái cây
          ngon lành và dinh dưỡng. Những quả dâu đỏ mọng Đan Đông được hái vào lúc bình minh, hay những trái đào hồng
          Xuân Tuyết Bình Ất, đều là những mỹ vị nhân gian. Với sự sành ăn và ham khám phá của mình, LerMao đã mang các
          loại trái cây từ bốn phương về, cùng em gái LerMi nghiên cứu ra những dòng mứt ngọt lịm, tự nhiên, khéo tay
          làm các loại thạch, trân châu thơm ngon nhất. Như thể chúng mang trong mình một phép màu kỳ bí của thiên
          nhiên.
          <br />
          <br />
          Hành trình của LerMao và LerMi, không chỉ là học hỏi và khám phá, đó còn là khát vọng lớn trong việc lan tỏa
          tri thức, kinh nghiệm và sản phẩm tốt nhất đến người yêu mến thực phẩm bốn phương.
          <br />
          <br />
          Hãy cùng gia đình Gấu LerMao bước vào chuyến phiêu lưu đầy bí ẩn và thú vị này, nơi mỗi món ăn đều chứa đựng
          một câu chuyện, mỗi sản phẩm là một hành trình khám phá. Bạn có yêu ẩm thực, và đam mê sáng tạo giống LerMao
          của chúng mình không?
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
