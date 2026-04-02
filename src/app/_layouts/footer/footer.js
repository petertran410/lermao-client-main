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
      title: 'Giới Thiệu',
      href: '/gioi-thieu'
    },
    {
      title: 'Nguyên Liệu Pha Chế',
      href: '/nguyen-lieu-pha-che'
    },
    {
      title: 'Mứt Pha Chế',
      href: '/nguyen-lieu-pha-che/mut-pha-che-lermao'
    },
    {
      title: 'Topping Trà Sữa',
      href: '/nguyen-lieu-pha-che/cac-loai-topping-tra-sua'
    },
    {
      title: 'Bột Pha Chế',
      href: '/nguyen-lieu-pha-che/bot-pha-che-lermao'
    },
    {
      title: 'Workshop Pha Chế',
      href: '/workshop-pha-che'
    }
  ];

  const CONTACT_LINKS = [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/lermao.sanhannhugau'
    },
    {
      title: 'Zalo',
      href: 'https://zalo.me/4415290839928975010'
    },
    {
      title: 'Tin Tức',
      href: '/tin-tuc'
    },
    {
      title: 'Liên Hệ',
      href: '/lien-he'
    }
  ];

  return (
    <Flex
      backgroundImage={isIntroPage ? 'url(/images/bg-footer-intro.png)' : 'url(/images/bg-footer.webp)'}
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
        xl: isIntroPage ? '200px' : '280px'
      }}
      gap={{ xs: '40px', lg: '150px' }}
      direction={{ xs: 'column', md: 'row' }}
      pos="relative"
      mt={{ xs: isIntroPage ? '-70px' : '-300px', md: isIntroPage ? '0px' : '-180px', lg: '-50px', xl: '0px' }}
    >
      <Flex flex={{ xs: 'none', md: 1 }} direction="column">
        {/* <Image src="/images/logo.webp" alt={IMG_ALT} w="75px" h="auto" fit="cover" /> */}

        <Text
          fontSize={18}
          color="#FFF"
          fontWeight={700}
          mt="16px"
          borderBottom="1px solid #FFF"
          pb="8px"
          _hover={{ color: '#FFF' }}
        >
          Gấu LerMao | Nguyên Liệu Pha Chế Hiện Đại
        </Text>

        <Text color="#FFF" mt="16px">
          Gấu LerMao là thương hiệu tập trung phát triển các dòng mứt trái cây, topping nấu nhanh và giải pháp menu theo
          xu hướng.
        </Text>

        <Flex align="flex-start" gap="8px" mt="10px">
          <Flex direction="column" gap="8px">
            <Flex align="center" gap="8px">
              <Image src="/images/location.png" alt={IMG_ALT} w="24px" h="24px" />
              <Text color="#FFF" fontSize={13} fontWeight={400} _hover={{ color: '#FFF' }}>
                Văn Phòng R&D Miền Nam: P1.2.24 Diamond Alnata, Block A3, Celadon City, Tân Phú, TP.HCM.
              </Text>
            </Flex>

            <Flex align="center" gap="8px">
              <Image src="/images/location.png" alt={IMG_ALT} w="24px" h="24px" />
              <Text color="#FFF" fontSize={13} fontWeight={400} _hover={{ color: '#FFF' }}>
                Văn Phòng R&D Miền Bắc: B-TT10-4 Him Lam Vạn Phúc, Tố Hữu, Hà Đông, Hà Nội.
              </Text>
            </Flex>

            <Flex align="center" gap="8px">
              <Image src="/images/location.png" alt={IMG_ALT} w="24px" h="24px" />
              <Text color="#FFF" fontSize={13} fontWeight={400} mt="8px" _hover={{ color: '#FFF' }}>
                Cửa Hàng Gấu LerMao: Số 42 Đường số 7, Phường 10, Quận Tân Bình, TP.HCM.
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex align="flex-start" gap="8px" mt="10px" pl="2px">
          <Image src="/images/world-wide-web.webp" alt={IMG_ALT} w="20px" h="20px" />
          <ChakraLink
            href="https://www.lermao.com/"
            color="#FFF"
            fontSize={14}
            fontWeight={400}
            target="_blank"
            _hover={{ textDecor: 'none', color: '#FFF' }}
          >
            Website: lermao.com
          </ChakraLink>
        </Flex>

        <Flex align="flex-start" gap="8px" mt="10px">
          <Image src="/images/phone.png" alt={IMG_ALT} w="24px" h="24px" />
          <ChakraLink
            href="tel:+84973123230"
            color="#FFF"
            fontSize={14}
            fontWeight={400}
            _hover={{ textDecor: 'none', color: '#FFF' }}
          >
            +84 973 123 230
          </ChakraLink>
        </Flex>

        <Flex direction="column" mt="10px" gap="11px">
          <Flex align="flex-start" gap="8px">
            <Image src="/images/email.png" alt={IMG_ALT} w="24px" h="24px" />
            <ChakraLink
              href="mailto:nguyenlieuphachelermao@gmail.com"
              color="#FFF"
              fontSize={14}
              fontWeight={400}
              _hover={{ textDecor: 'none', color: '#FFF' }}
            >
              nguyenlieuphachelermao@gmail.com
            </ChakraLink>
          </Flex>
        </Flex>

        <Flex align="flex-start" gap="8px" mt="10px">
          <Flex direction="column" gap="8px">
            <Flex align="center" gap="8px">
              <Text
                color="#FFF"
                fontSize={13}
                fontWeight={400}
                _hover={{ color: '#FFF' }}
                borderTop="1px solid #FFF"
                pt="8px"
              >
                Gấu LerMao là thương hiệu được phát triển và phân phối bởi Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt
                Nam.
              </Text>
            </Flex>

            <Flex align="center" gap="8px">
              <Text color="#FFF" fontSize={13} fontWeight={400} _hover={{ color: '#FFF' }}>
                Mã số doanh nghiệp: 0110211839
              </Text>
            </Flex>
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
          <Text color="#FFF" fontWeight={700} fontSize={14} _hover={{ color: '#FFF' }}>
            Danh mục
          </Text>

          <Flex direction="column" mt="16px" gap="12px">
            {MENU_LINKS.map((item) => {
              const { title, href } = item;
              return (
                <Link href={href} key={title} target="_blank">
                  <Text as="span" color="#FFF" fontWeight={400} fontSize={14} _hover={{ color: '#FFF' }}>
                    {title}
                  </Text>
                </Link>
              );
            })}
          </Flex>
        </Flex>

        {/* <Flex direction="column">
          <Text color="#FFF" fontWeight={700} fontSize={16} _hover={{ color: '#FFF' }}>
            Nhóm sản phẩm
          </Text>

          <Flex direction="column" mt="16px" gap="12px">
            {CATEGORY_LIST.map((item) => {
              const { name, id } = item;
              return (
                <Link href={`/nguyen-lieu-pha-che?categoryId=${id}`} key={id}>
                  <Text as="span" color="#FFF" fontWeight={400} fontSize={16} _hover={{ color: '#FFF' }}>
                    {name}
                  </Text>
                </Link>
              );
            })}
          </Flex>
        </Flex> */}

        <Flex direction="column">
          <Text color="#FFF" fontWeight={700} fontSize={14} _hover={{ color: '#FFF' }}>
            Kết Nối Với Gấu LerMao
          </Text>

          <Flex direction="column" mt="16px" gap="12px">
            {CONTACT_LINKS.map((item) => {
              const { title, href } = item;
              return (
                <ChakraLink target="_blank" rel="nofollow" href={href} key={title} _hover={{ textDecor: 'none' }}>
                  <Text as="span" color="#FFF" fontWeight={400} fontSize={14} _hover={{ color: '#FFF' }}>
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
