'use client';

import TitleSpecial from '@/components/title-special';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

const ProductProcess = () => {
  const STEPS = [
    {
      image: '/images/product-process.png',
      description: 'Lựa chọn kỹ càng và thu hoạch nông sản chất lượng cao tại vườn',
      step: 1
    },
    {
      image: '/images/product-process.png',
      description: 'Sơ chế nông sản chất lượng cao',
      step: 2
    },
    {
      image: '/images/product-process.png',
      description: 'Điều chế theo Công thức Độc quyền bằng công nghệ tiên tiến hàng đầu',
      step: 3
    },
    {
      image: '/images/product-process.png',
      description: 'Sản xuất khép kín đảm bảo vệ sinh an toàn thực phẩm',
      step: 4
    },
    {
      image: '/images/product-process.png',
      description: 'Đóng gói sản phẩm',
      step: 5
    },
    {
      image: '/images/product-process.png',
      description: 'Thực hiện chu trình kiểm soát chất lượng sản phẩm lần cuối trước khi đưa đến tay người tiêu dùng',
      step: 6
    },
    {
      image: '/images/product-process.png',
      description: 'Vận chuyển, thực hiện các hoạt động về xuất nhập khẩu hàng hóa, đảm bảo tối ưu về thời gian',
      step: 7
    }
  ];

  const [currentStep, setCurrentStep] = useState(STEPS[0]);

  return (
    <Flex direction="column" bgColor="#FFF" pos="relative" px={{ xs: '18px', lg: 0 }}>
      <Flex direction="column" align="center">
        <TitleSpecial fontSize={32} textAlign="center">
          Quy trình sản xuất, đóng gói,
          <br />
          vận chuyển
        </TitleSpecial>
        <Image src={currentStep.image} alt={IMG_ALT} w="456px" h="178px" mt="24px" borderRadius={16} />
        <Text textAlign="center" mt="16px">
          {currentStep.description}
        </Text>
      </Flex>

      <Flex mt="24px" justify="space-between" pos="relative" gap="8px" display={{ xs: 'none', lg: 'flex' }} mx={PX_ALL}>
        {STEPS.map((item, index) => {
          const { step } = item;
          const isActive = step === currentStep.step;

          return (
            <Flex gap="8px" key={index} align="flex-end" pos="relative" zIndex={5}>
              <Flex direction="column" align="center" gap="12px">
                {isActive && <Image src="/images/lermao-run.gif" w="80px" h="100px" alt={IMG_ALT} />}
                <Button
                  color={isActive ? '#FFF' : 'main.1'}
                  w="86px"
                  h="36px"
                  gap="4px"
                  fontSize={16}
                  borderRadius={8}
                  fontWeight={700}
                  border="1px solid"
                  borderColor="main.1"
                  bgColor={isActive ? 'main.1' : '#FFF'}
                  _hover={{ opacity: 0.8, color: '#FFF' }}
                  _active={{ opacity: 0.8, color: '#FFF' }}
                  onClick={() => setCurrentStep(item)}
                >
                  Bước {step}
                </Button>
              </Flex>
              {/* {index !== STEPS.length - 1 && (
                <Image src="/images/product-process-line.png" w="32px" h="auto" mb="16px" alt={IMG_ALT} />
              )} */}
            </Flex>
          );
        })}

        <Flex align="center" pos="absolute" bottom={0} left={0} gap="10px" overflow="hidden">
          {Array.from(Array(24).keys()).map((item) => (
            <Image key={item} src="/images/product-process-line.png" w="40px" h="auto" mb="16px" alt={IMG_ALT} />
          ))}
        </Flex>
      </Flex>

      <Flex display={{ xs: 'flex', lg: 'none' }} px="18px" mt="20px" direction="column" justify="center">
        <Flex align="center" justify="center" gap="50px">
          <Image src="/images/fruit-pattern-left.png" w="90px" h="95px" alt={IMG_ALT} />
          <Image src="/images/lermao-run.gif" alt={IMG_ALT} w="120px" h="140px" />
          <Image src="/images/fruit-pattern-right.png" w="90px" h="95px" alt={IMG_ALT} />
        </Flex>

        <Flex align="center" gap="22px">
          <Flex
            align="center"
            justify="center"
            borderRadius={12}
            w="48px"
            h="48px"
            boxShadow="0px 4px 16px 0px #0000000D"
            onClick={() => {
              if (currentStep.step === 1) {
                return;
              }
              setCurrentStep(STEPS[currentStep.step - 2]);
            }}
          >
            <Image src="/images/caret-left.png" alt={IMG_ALT} w="12px" h="20px" />
          </Flex>

          <Flex
            flex={1}
            h="48px"
            borderRadius={8}
            border="1px solid"
            borderColor="main.1"
            align="center"
            justify="center"
          >
            <Text fontWeight={700} fontSize={16} color="main.1">
              Bước {currentStep.step}
            </Text>
          </Flex>

          <Flex
            align="center"
            justify="center"
            borderRadius={12}
            w="48px"
            h="48px"
            boxShadow="0px 4px 16px 0px #0000000D"
            onClick={() => {
              if (currentStep.step === 7) {
                return;
              }
              setCurrentStep(STEPS[currentStep.step]);
            }}
          >
            <Image src="/images/caret-right.png" alt={IMG_ALT} w="12px" h="20px" />
          </Flex>
        </Flex>
      </Flex>

      <Box pos="absolute" top={0} left={'-70px'} display={{ xs: 'none', lg: 'block' }}>
        <Parallax scale={[0.5, 1]} easing="easeInOut" speed={10}>
          <Image src="/images/bg-process-left.png" h="380px" w="auto" alt={IMG_ALT} fit="contain" />
        </Parallax>
      </Box>

      <Box pos="absolute" top={0} right={'-70px'} display={{ xs: 'none', lg: 'block' }}>
        <Parallax scale={[0.5, 1]} easing="easeInOut" speed={10}>
          <Image src="/images/bg-process-right.png" h="380px" w="auto" alt={IMG_ALT} fit="contain" />
        </Parallax>
      </Box>
    </Flex>
  );
};

export default ProductProcess;
