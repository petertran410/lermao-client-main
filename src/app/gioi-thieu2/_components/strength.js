import TitleSpecial from '@/components/title-special';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Strength = () => {
  return (
    <Box w="full" py="90px">
      <Image
        src="/images/strength-top.png"
        alt={IMG_ALT}
        w="50%"
        mx="auto"
        h="40px"
        display={{ xs: 'none', lg: 'block' }}
      />
      <Flex align="center" gap="12px" justify={{ xs: 'center', lg: 'center' }} px={PX_ALL}>
        {/* <Image
          src="/images/fruit-pattern-left.png"
          w={{ xs: '212px', lg: '155px', '2xl': '280px' }}
          h={{ xs: '212px', lg: '155px', '2xl': '280px' }}
          alt={IMG_ALT}
          display={{ xs: 'none', lg: 'block' }}
        /> */}
        {/* <Box w={{ xs: '212px', lg: '155px', '2xl': '280px' }} h={{ xs: '212px', lg: '155px', '2xl': '280px' }} /> */}
        <Flex
          align="center"
          gap="22px"
          direction={{ xs: 'column', lg: 'row' }}
          // px={{ xs: '0px', lg: '0px', '2xl': '135px' }}
          py="32px"
        >
          <Flex direction="column" gap="52px" flex={1} display={{ xs: 'none', lg: 'flex' }}>
            <Flex align="flex-start" gap="12px">
              <Image src="/images/strength-1.png" w="24px" h="24px" alt={IMG_ALT} />
              <Text>Sản phẩm đa dạng phong phú</Text>
            </Flex>
            <Flex align="flex-start" gap="12px">
              <Image src="/images/strength-2.png" w="24px" h="24px" alt={IMG_ALT} />
              <Text>Giá thành tối ưu, đảm bảo tiết kiệm chi phí mà vẫn đáp ứng tiêu chuẩn cao</Text>
            </Flex>
          </Flex>

          <Flex
            direction="column"
            align="center"
            justify="center"
            borderRadius={16}
            border="3px solid #77D0E8"
            p="16px"
            h="150px"
            gap="16px"
          >
            <TitleSpecial fontSize={64} as="span" fontWeight={400} color="#5FA6BA">
              4
            </TitleSpecial>
            <Text textAlign="center" textTransform="uppercase" lineHeight="29px" fontWeight={700} fontSize={24}>
              Thế mạnh
              <br />
              sản phẩm
            </Text>
          </Flex>

          <Flex direction="column" gap="52px" flex={1} display={{ xs: 'none', lg: 'flex' }} align="flex-end">
            <Flex align="flex-start" gap="12px">
              <Text textAlign="right">Nguồn nguyên liệu chất lượng cao, hàm lượng hoa quả tươi lên đến 50%</Text>
              <Image src="/images/strength-3.png" w="24px" h="24px" alt={IMG_ALT} />
            </Flex>
            <Flex align="flex-start" gap="12px">
              <Text textAlign="right">
                Không ngừng R&D, đổi mới sáng tạo, cung cấp các giải pháp toàn diện và xu thế
              </Text>
              <Image src="/images/strength-4.png" w="24px" h="24px" alt={IMG_ALT} />
            </Flex>
          </Flex>

          <Flex direction="column" gap="22px" w="full" px="22px" display={{ xs: 'flex', lg: 'none' }}>
            <Flex align="flex-start" gap="12px">
              <Image src="/images/strength-1.png" w="24px" h="24px" alt={IMG_ALT} />
              <Text>Sản phẩm đa dạng phong phú</Text>
            </Flex>
            <Flex align="flex-start" gap="12px">
              <Image src="/images/strength-2.png" w="24px" h="24px" alt={IMG_ALT} />
              <Text>Giá thành tối ưu, đảm bảo tiết kiệm chi phí mà vẫn đáp ứng tiêu chuẩn cao</Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="22px" w="full" px="22px" display={{ xs: 'flex', lg: 'none' }}>
            <Flex align="flex-start" gap="12px">
              <Image src="/images/strength-3.png" w="24px" h="24px" alt={IMG_ALT} />
              <Text>Nguồn nguyên liệu chất lượng cao, hàm lượng hoa quả tươi lên đến 50%</Text>
            </Flex>
            <Flex align="flex-start" gap="12px">
              <Image src="/images/strength-4.png" w="24px" h="24px" alt={IMG_ALT} />
              <Text>Không ngừng R&D, đổi mới sáng tạo, cung cấp các giải pháp toàn diện và xu thế</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* <Box w={{ xs: '212px', lg: '155px', '2xl': '280px' }} h={{ xs: '212px', lg: '155px', '2xl': '280px' }} /> */}
        {/* <Image
          src="/images/fruit-pattern-right.png"
          w={{ xs: '212px', lg: '155px', '2xl': '280px' }}
          h={{ xs: '212px', lg: '155px', '2xl': '280px' }}
          alt={IMG_ALT}
          display={{ xs: 'none', lg: 'block' }}
        /> */}
      </Flex>
      <Image
        src="/images/strength-bottom.png"
        alt={IMG_ALT}
        w="50%"
        mx="auto"
        h="40px"
        display={{ xs: 'none', lg: 'block' }}
      />
    </Box>
  );
};

export default Strength;
