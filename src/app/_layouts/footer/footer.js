'use client';

import { useQueryCategoryList } from '@/services/category.service';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { Box, Link as ChakraLink, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isIntroPage = pathname === '/gioi-thieu';
  const { data: CATEGORY_LIST = [] } = useQueryCategoryList();
  const MENU_LINKS = [
    {
      title: 'Giới thiệu',
      href: '/gioi-thieu'
    },
    {
      title: 'Sản phẩm',
      href: '/san-pham'
    },
    {
      title: 'Công thức',
      href: '/cong-thuc'
    },
    {
      title: 'Tin tức',
      href: '/tin-tuc'
    },
    {
      title: 'Liên hệ',
      href: '/lien-he'
    }
  ];

  const CONTACT_LINKS = [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/dieptra.0788339379'
    },
    {
      title: 'Zalo',
      href: 'https://zalo.me/4415290839928975010'
    }
  ];

  return (
    <Flex
      backgroundImage={isIntroPage ? 'url(/images/bg-footer-intro.png)' : 'url(/images/bg-footer.png)'}
      bgSize="cover"
      bgColor={isIntroPage ? '#FFF' : 'transparent'}
      bgRepeat="no-repeat"
      align="flex-end"
      justify="space-between"
      px={PX_ALL}
      pb="36px"
      pt={{
        xs: isIntroPage ? '300px' : '550px',
        md: isIntroPage ? '100px' : '350px',
        lg: '250px',
        xl: isIntroPage ? '100px' : '200px'
      }}
      gap={{ xs: '40px', lg: '150px' }}
      direction={{ xs: 'column', md: 'row' }}
      pos="relative"
      mt={{ xs: isIntroPage ? '-70px' : '-300px', md: isIntroPage ? '0px' : '-180px', lg: '-50px', xl: '0px' }}
    >
      <Flex flex={{ xs: 'none', md: 1 }} direction="column">
        <Image src="/images/logo.png" alt={IMG_ALT} w="75px" h="auto" fit="cover" />

        <Text
          fontSize={20}
          color="#FFF"
          fontWeight={700}
          mt="16px"
          borderBottom="1px solid #FFF"
          pb="8px"
          _hover={{ color: '#FFF' }}
        >
          Công ty TNHH XNK Hi Sweetie Việt Nam
        </Text>

        <Flex direction="column" mt="24px" gap="11px">
          <Flex align="flex-start" gap="8px">
            <Image src="/images/email.png" alt={IMG_ALT} w="24px" h="24px" />
            <ChakraLink
              href="mailto:hisweetievietnam@gmail.com"
              color="#FFF"
              fontSize={16}
              fontWeight={400}
              _hover={{ textDecor: 'none', color: '#FFF' }}
            >
              hisweetievietnam@gmail.com
            </ChakraLink>
          </Flex>

          <Flex align="flex-start" gap="8px">
            <Image src="/images/phone.png" alt={IMG_ALT} w="24px" h="24px" />
            <ChakraLink
              href="tel:+84973123230"
              color="#FFF"
              fontSize={16}
              fontWeight={400}
              _hover={{ textDecor: 'none', color: '#FFF' }}
            >
              +84 973 123 230
            </ChakraLink>
          </Flex>

          <Flex align="flex-start" gap="8px">
            <Image src="/images/location.png" alt={IMG_ALT} w="24px" h="24px" />
            <Box>
              <Text color="#FFF" fontSize={15} fontWeight={400} _hover={{ color: '#FFF' }}>
                Trụ sở chính: B-TT10-4 thuộc dự án Him Lam Vạn Phúc, đường Tố Hữu, Phường Vạn Phúc, Quận Hà Đông, Thành
                phố Hà Nội
              </Text>
              <Text color="#FFF" fontSize={15} fontWeight={400} mt="8px" _hover={{ color: '#FFF' }}>
                Cửa hàng tại TP.HCM: Số 42 Đường số 7, Phường 10, Quận Tân Bình, Thành phố Hồ Chí Minh
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        flex={{ xs: 'none', md: 1 }}
        w={{ xs: 'full', md: 'auto' }}
        justify={{ xs: 'space-between', md: 'flex-end' }}
        gap={{ xs: '20px', lg: '56px' }}
      >
        <Flex direction="column">
          <Text color="#FFF" fontWeight={700} fontSize={16} _hover={{ color: '#FFF' }}>
            Danh mục
          </Text>

          <Flex direction="column" mt="16px" gap="12px">
            {MENU_LINKS.map((item) => {
              const { title, href } = item;
              return (
                <Link href={href} key={title}>
                  <Text as="span" color="#FFF" fontWeight={400} fontSize={16} _hover={{ color: '#FFF' }}>
                    {title}
                  </Text>
                </Link>
              );
            })}
          </Flex>
        </Flex>

        <Flex direction="column">
          <Text color="#FFF" fontWeight={700} fontSize={16} _hover={{ color: '#FFF' }}>
            Nhóm sản phẩm
          </Text>

          <Flex direction="column" mt="16px" gap="12px">
            {CATEGORY_LIST.map((item) => {
              const { name, id } = item;
              return (
                <Link href={`/san-pham?categoryId=${id}`} key={id}>
                  <Text as="span" color="#FFF" fontWeight={400} fontSize={16} _hover={{ color: '#FFF' }}>
                    {name}
                  </Text>
                </Link>
              );
            })}
          </Flex>
        </Flex>

        <Flex direction="column">
          <Text color="#FFF" fontWeight={700} fontSize={16} _hover={{ color: '#FFF' }}>
            Liên hệ chúng tôi
          </Text>

          <Flex direction="column" mt="16px" gap="12px">
            {CONTACT_LINKS.map((item) => {
              const { title, href } = item;
              return (
                <ChakraLink target="_blank" href={href} key={title} _hover={{ textDecor: 'none' }}>
                  <Text as="span" color="#FFF" fontWeight={400} fontSize={16} _hover={{ color: '#FFF' }}>
                    {title}
                  </Text>
                </ChakraLink>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
