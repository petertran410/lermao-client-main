'use client';

import Carousel from '@/components/carousel';
import TitleSpecial from '@/components/title-special';
import { IMG_ALT } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Parallax } from 'react-scroll-parallax';

const FeedbackItem = ({ item }) => {
  const { customer, position, content, image } = item;

  return (
    <Flex
      borderRadius={16}
      boxShadow="0px 4px 24px 0px #0000000D"
      gap="12px"
      p="12px"
      direction={{ xs: 'column', lg: 'row' }}
    >
      <Image
        src={image}
        alt={IMG_ALT}
        w={{ xs: '325px', lg: '160px' }}
        h={{ xs: '112px', lg: '185px' }}
        borderRadius={8}
        fit="cover"
      />

      <Flex direction="column" flex={1}>
        <Text fontSize={20} fontWeight={700}>
          {customer}
        </Text>
        <Text mt="4px" lineHeight="18px">
          {position}
        </Text>
        <Box my="8px" h="1px" w="full" bgColor="#E1E2E3" />
        <Text color="#555A5D" textAlign="justify">
          {content}
        </Text>
      </Flex>
    </Flex>
  );
};

const Feedback = () => {
  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 2 }
  };
  const FEEDBACK_LIST = [
    {
      customer: 'Chị Kim Dung',
      position: 'Đại diện Nguyên liệu pha chế Hưng Sao Hà Đông',
      content:
        'Tôi vô cùng ấn tượng với sản phẩm Khoai Môn tươi Nghiền thuộc Dòng Sản phẩm Đông lạnh của Thương hiệu Gấu LerMao. Với vị ngọt, béo, ngậy, mình cảm thấy rất phù hợp với các món trà sữa, và tôi tin sẽ trở thành xu hướng mới trong mùa thu đông năm nay',
      image: '/images/feedback-1.png'
    },
    {
      customer: 'Chị Thùy Linh',
      position: 'Đại diện Nguyên liệu Pha chế Đức Linh Hà Đông',
      content:
        'Sản phẩm của thương hiệu Gấu LerMao vô cùng đa dạng, với các khẩu vị vô cùng mới lạ, tươi ngon, đặc biệt hấp dẫn”. Hiện nay thị trường Việt Nam có rất nhiều sản phẩm, tuy nhiên để được đa dạng và chất lượng như sản phẩm của công ty HI SWEETIE VIỆT NAM hiếm bên nào có thể làm được',
      image: '/images/feedback-2.png'
    },
    {
      customer: 'Anh Quyết',
      position: 'Founder Chuỗi Trà sữa Son La - Vùng di sản Trà Ô Long',
      content:
        'Sản phẩm có gần như 9 trên 10 mẫu mã mà doanh nghiệp em có thể ứng dụng được để cân nhắc thay thế các loại nguyên liệu đang dùng bây giờ. Sản phẩm thuộc thương hiệu Gấu LerMao của công ty hoàn toàn đáp ứng được mọi nhu cầu và xu hướng hot hiện nay',
      image: '/images/feedback-3.png'
    }
  ];

  return (
    <Flex mt={{ xs: '60px', lg: '132px' }} direction="column" px="20px" align="center" pb="120px">
      <Flex gap="12px" align="flex-start" justify="center">
        <Image src="/images/message-left.png" alt={IMG_ALT} w="35px" h="auto" display={{ xs: 'none', lg: 'block' }} />
        <TitleSpecial textAlign="center" fontSize={32} mt="-8px">
          Khách hàng nói gì về Gấu Lermao
        </TitleSpecial>
        <Image src="/images/message-right.png" alt={IMG_ALT} w="35px" h="auto" display={{ xs: 'none', lg: 'block' }} />
      </Flex>

      <Flex align="center" mt="40px" w="full" justify="space-between">
        <Parallax scale={[0.5, 1]} easing="easeInOut" speed={10}>
          <Image
            src="/images/bg-feedback-left.png"
            alt={IMG_ALT}
            w="128px"
            h="230px"
            display={{ xs: 'none', lg: 'block' }}
          />
        </Parallax>
        <Flex w={{ xs: 'full', lg: '1200px' }}>
          <Carousel breakpoints={breakpoints}>
            {FEEDBACK_LIST.map((item) => (
              <FeedbackItem key={item.customer} item={item} />
            ))}
          </Carousel>
        </Flex>
        <Parallax scale={[0.5, 1]} easing="easeInOut" speed={10}>
          <Image
            src="/images/bg-feedback-right.png"
            alt={IMG_ALT}
            w="128px"
            h="230px"
            display={{ xs: 'none', lg: 'block' }}
          />
        </Parallax>
      </Flex>
    </Flex>
  );
};

export default Feedback;
