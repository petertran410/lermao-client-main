'use client';

import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { FiShield, FiBookOpen, FiDollarSign, FiTrendingUp, FiTruck, FiHeart, FiPlus, FiMinus } from 'react-icons/fi';
import TitleSpecial from '@/components/title-special';

// ═══════════════════════════════════════════
// FAQ Data
// ═══════════════════════════════════════════
const FAQ_ITEMS = [
  {
    icon: FiShield,
    question: 'Chất lượng nguyên liệu của Gấu LerMao có gì khác biệt?',
    answer:
      'Chúng tôi tuyển chọn khắt khe các dòng nguyên liệu topping theo xu hướng mới nhất. Mỗi sản phẩm đều có nguồn gốc rõ ràng, đạt chuẩn an toàn thực phẩm và được kiểm soát chặt chẽ về hương vị, giúp ly trà sữa của bạn luôn giữ được phong độ ổn định và khác biệt so với đối thủ.'
  },
  {
    icon: FiBookOpen,
    question: 'Tôi là người mới bắt đầu, Gấu LerMao có hỗ trợ công thức không?',
    answer:
      'Không chỉ cung cấp nguyên liệu, Gấu LerMao còn cung cấp giải pháp pha chế toàn diện. Khi mua hàng, bạn sẽ được tặng kèm bộ công thức chuẩn vị, tối ưu định lượng và giá vốn. Chúng tôi luôn cập nhật các món "trend" giúp menu của bạn luôn mới mẻ trong mắt khách hàng.'
  },
  {
    icon: FiDollarSign,
    question: 'Sản phẩm của Gấu LerMao có giúp tối ưu chi phí vận hành không?',
    answer:
      'Có. Các dòng nguyên liệu của chúng tôi được thiết kế để tối giản hóa quy trình pha chế nhưng vẫn đảm bảo chất lượng cao nhất. Điều này giúp chủ quán tiết kiệm thời gian chuẩn bị, giảm thiểu hao hụt và tối ưu hóa nhân sự trong những giờ cao điểm.'
  },
  {
    icon: FiTrendingUp,
    question: 'Gấu LerMao có cập nhật xu hướng thị trường thường xuyên không?',
    answer:
      'Đội ngũ R&D của Gấu LerMao làm việc liên tục để nghiên cứu thị trường F&B. Chúng tôi không chỉ cung cấp những gì thị trường đang có, mà còn tiên phong đưa ra các ý tưởng mix-match nguyên liệu độc đáo, giúp quán của bạn tạo ra những sản phẩm mang tính dẫn đầu xu hướng.'
  },
  {
    icon: FiTruck,
    question: 'Chính sách hỗ trợ và giao hàng của thương hiệu như thế nào?',
    answer:
      'Chúng tôi hiểu rằng nguồn hàng ổn định chính là "nhịp thở" giúp quán vận hành trơn tru mỗi ngày. Gấu LerMao cam kết quy trình xử lý đơn hàng nhanh chóng, hỗ trợ giao hàng linh hoạt và luôn sẵn sàng giải đáp các thắc mắc kỹ thuật pha chế để đảm bảo việc kinh doanh của bạn không bị gián đoạn.'
  },
  {
    icon: FiHeart,
    question: 'Tại sao nói Gấu LerMao là đối tác đồng hành thay vì chỉ là nhà cung cấp?',
    answer:
      'Tại Gấu LerMao, chúng tôi đặt sự thành công của khách hàng lên hàng đầu. Ngoài việc cung cấp nguyên liệu, chúng tôi sẵn sàng tư vấn về cách tối ưu menu, setup quầy kệ và chia sẻ kinh nghiệm vận hành quán hiệu quả, giúp bạn đi đường dài trong ngành trà sữa đầy cạnh tranh.'
  }
];

// ═══════════════════════════════════════════
// Single FAQ Item with measured height animation
// ═══════════════════════════════════════════
const FAQItem = ({ item, index, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const { icon, question, answer } = item;

  return (
    <Box borderBottom="1px solid" borderColor={isOpen ? 'main.1' : '#e8e8e8'} transition="border-color 0.3s ease">
      {/* Question row */}
      <Flex
        as="button"
        w="full"
        align="center"
        gap="16px"
        py="18px"
        px="4px"
        cursor="pointer"
        onClick={() => onToggle(index)}
        _hover={{ '& .faq-question': { color: 'main.1' } }}
        transition="all 0.2s"
        textAlign="left"
      >
        {/* Icon */}
        <Flex
          align="center"
          justify="center"
          minW="42px"
          w="42px"
          h="42px"
          borderRadius="full"
          bg={isOpen ? 'main.1' : '#f5f5f5'}
          transition="all 0.3s ease"
        >
          <Icon as={icon} boxSize="18px" color={isOpen ? 'white' : 'main.1'} transition="color 0.3s ease" />
        </Flex>

        {/* Question text */}
        <Text
          className="faq-question"
          flex={1}
          fontSize={{ xs: 15, lg: 16 }}
          fontWeight={700}
          color={isOpen ? 'main.1' : '#1d2128'}
          transition="color 0.25s ease"
          lineHeight="1.5"
        >
          {question}
        </Text>

        {/* Toggle icon */}
        <Flex
          align="center"
          justify="center"
          minW="32px"
          w="32px"
          h="32px"
          borderRadius="full"
          bg={isOpen ? 'main.1' : '#f0f0f0'}
          transition="all 0.3s ease"
        >
          <Icon
            as={isOpen ? FiMinus : FiPlus}
            boxSize="16px"
            color={isOpen ? 'white' : '#666'}
            transition="color 0.3s ease"
          />
        </Flex>
      </Flex>

      {/* Answer — animated via max-height + opacity */}
      <Box
        overflow="hidden"
        transition="max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease"
        maxH={isOpen ? `${contentRef.current?.scrollHeight || 500}px` : '0px'}
        opacity={isOpen ? 1 : 0}
      >
        <Box ref={contentRef} pb="20px" pl="58px" pr="48px">
          <Text fontSize={{ xs: 14, lg: 15 }} color="#555" lineHeight="1.8" textAlign="justify">
            {answer}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

// ═══════════════════════════════════════════
// Main Section
// ═══════════════════════════════════════════
const HomeFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <Box px={PX_ALL} py={{ xs: '40px', lg: '60px' }}>
      {/* ── Section Heading ── */}
      <Flex align="center" justify="center" gap="16px" mb="32px">
        <Box h="2px" flex={1} maxW="120px" bgGradient="linear(to-r, transparent, #00b7e9)" />
        <Text
          as="h2"
          fontSize={{ xs: '24px', md: '30px', lg: '36px' }}
          fontWeight={900}
          textAlign="center"
          lineHeight="1.2"
          letterSpacing="-0.02em"
          bgGradient="linear(to-r, #00b7e9, #77D0E8)"
          bgClip="text"
          sx={{ WebkitTextFillColor: 'transparent' }}
        >
          Tại Sao Nên Chọn Gấu LerMao ?
        </Text>
        <Box h="2px" flex={1} maxW="120px" bgGradient="linear(to-r, #77D0E8, transparent)" />
      </Flex>

      {/* Content: Image left + FAQ right */}
      <Flex direction={{ xs: 'column', lg: 'row' }} gap={{ xs: '32px', lg: '60px' }} align="flex-start">
        {/* Left — Illustration */}
        <Box
          flex={{ lg: '0 0 380px' }}
          w={{ xs: 'full', lg: '380px' }}
          position="relative"
          borderRadius="24px"
          overflow="hidden"
        >
          <Image
            src="/images/6-faq.webp"
            alt={IMG_ALT}
            w="full"
            h={{ xs: '400px', md: '360px', lg: '480px' }}
            objectFit="fill"
            borderRadius="24px"
            fallbackSrc="/images/preview.png"
          />

          {/* Overlay card */}
          {/* <Flex
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            direction="column"
            p="24px"
            bgGradient="linear(to-t, blackAlpha.700, transparent)"
            borderBottomRadius="24px"
          >
            <Text color="white" fontSize={{ xs: 18, lg: 22 }} fontWeight={800} lineHeight="1.3">
              Giải pháp pha chế
            </Text>
            <Text color="white" fontSize={{ xs: 18, lg: 22 }} fontWeight={800} lineHeight="1.3">
              toàn diện số 1
            </Text>
            <Text color="whiteAlpha.800" fontSize={14} mt="8px">
              Đồng hành cùng hơn 40000+ đối tác trên toàn quốc
            </Text>
          </Flex> */}

          {/* Mascot decoration */}
          {/* <Image
            src="/images/lermao-run.gif"
            alt={IMG_ALT}
            w="70px"
            h="auto"
            position="absolute"
            top="16px"
            right="16px"
            opacity={0.85}
            sx={{
              animation: 'mascotFloat 3s ease-in-out infinite',
              '@keyframes mascotFloat': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' }
              }
            }}
          /> */}
        </Box>

        {/* Right — FAQ Accordion */}
        <Box flex={1} w="full">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem key={index} item={item} index={index} isOpen={openIndex === index} onToggle={handleToggle} />
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeFAQSection;
