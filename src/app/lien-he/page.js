import { IMG_ALT, PX_ALL } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Flex, Image, Link, Text } from '@chakra-ui/react';
import HomeContact from '../(home)/_components/contact';

export const metadata = getMetadata({ title: 'Liên hệ | Gấu Lermao' });

const Contact = () => {
  return (
    <Flex direction="column" px={PX_ALL} pt="40px" gap="32px" zIndex={10} pos="relative">
      <HomeContact px={0} mt={0} />

      <Image
        mt="36px"
        src="/images/contact-map.png"
        w="full"
        h="auto"
        fit="cover"
        display={{ xs: 'none', md: 'block' }}
        alt={IMG_ALT}
      />

      <Flex direction="column" display={{ xs: 'flex', lg: 'none' }} gap="20px" mt="25px">
        <Flex direction="column">
          <Text fontSize={16} fontWeight={600}>
            Cửa hàng tại Hà Nội:
          </Text>
          <Text fontSize={16}>
            B-TT10-4 thuộc dự án Him Lam Vạn Phúc, đường Tố Hữu, Phường Vạn Phúc, Quận Hà Đông, Thành phố Hà Nội
          </Text>
        </Flex>

        <Flex direction="column">
          <Text fontSize={16} fontWeight={600}>
            Cửa hàng tại TP. Hồ Chí Minh:
          </Text>
          <Text fontSize={16}>Số 42 Đường số 7, Phường 10, Quận Tân Bình, Thành phố Hồ Chí Minh</Text>
        </Flex>
      </Flex>

      <Flex
        mt="40px"
        h={{ xs: '210px', md: '174px' }}
        p="24px"
        borderRadius={16}
        align="flex-start"
        justify="space-between"
        bgImage="url(/images/intro-contact.png)"
        bgRepeat="no-repeat"
        bgSize="cover"
        gap={{ xs: '15px', md: '40px' }}
        direction={{ xs: 'column', md: 'row' }}
      >
        <Text fontWeight={700} fontSize={24} color="#FFF">
          Cập nhật thông tin từ Gấu Lermao trên các nền tảng
        </Text>

        <Flex align="center" gap="20px">
          <Link
            href="https://zalo.me/4415290839928975010"
            target="_blank"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize={{ xs: '60px', md: '90px', lg: '126px' }}
            bgColor="#FFF"
            borderRadius="full"
          >
            <Image src="/images/zalo-contact.png" alt={IMG_ALT} boxSize={{ xs: '40px', md: '60px', lg: '90px' }} />
          </Link>
          <Link
            href="https://www.facebook.com/lermao.sanhannhugau"
            target="_blank"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize={{ xs: '60px', md: '90px', lg: '126px' }}
            bgColor="#FFF"
            borderRadius="full"
          >
            <Image src="/images/facebook-contact.png" alt={IMG_ALT} boxSize={{ xs: '40px', md: '60px', lg: '90px' }} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Contact;
