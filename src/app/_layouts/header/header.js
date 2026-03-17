'use client';

import { IMG_ALT, PX_ALL } from '@/utils/const';
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartHeader from './_components/cart-header';
import CartHeaderMobile from './_components/cart-header-mobile';

const Header = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const MENU_LIST = [
    {
      title: 'Trang Chủ',
      href: '/'
    },
    {
      title: 'Giới Thiệu',
      href: '/gioi-thieu'
    },
    {
      title: 'Sản Phẩm',
      href: '/san-pham'
    },
    {
      title: 'Logo',
      href: '/'
    },
    {
      title: 'Công Thức',
      href: '/cong-thuc'
    },
    {
      title: 'Workshop Pha Chế',
      href: '/'
    },
    {
      title: 'Tin Tức',
      href: '/tin-tuc'
    },
    {
      title: 'Liên hệ',
      href: '/lien-he'
    }
  ];

  return (
    <Box>
      <Flex
        display={{ xs: 'none', lg: 'flex' }}
        zIndex={1000}
        as="header"
        align="center"
        h="100px"
        px={PX_ALL}
        gap="20px"
        justify="space-between"
        bgColor="#FFF"
        boxShadow="0px 4px 24px 0px #0000000D"
        pos="fixed"
        top={0}
        left={0}
        w="full"
      >
        {MENU_LIST.map((item) => {
          const { title, href } = item;
          const isActive = pathname === href;

          if (title === 'Logo') {
            return (
              <Link href="/" key={title}>
                <Image src="/images/logo.png" w="70px" h="64px" fit="cover" alt={IMG_ALT} />
              </Link>
            );
          }

          return (
            <Link href={href} key={title}>
              <Box
                px="18px"
                py="10px"
                borderBottom="1px solid"
                borderColor={isActive ? 'main.1' : 'transparent'}
                data-group
              >
                <Text
                  fontWeight={700}
                  fontSize={16}
                  color={isActive ? 'main.1' : undefined}
                  _groupHover={{ color: 'main.1' }}
                  transitionDuration="250ms"
                >
                  {title}
                </Text>
              </Box>
            </Link>
          );
        })}

        <CartHeader />
      </Flex>

      <Flex
        display={{ xs: 'flex', lg: 'none' }}
        zIndex={1000}
        as="header"
        align="center"
        h="72px"
        px={PX_ALL}
        gap="20px"
        justify="space-between"
        bgColor="#FFF"
        boxShadow="0px 4px 24px 0px #0000000D"
        pos="fixed"
        top={0}
        left={0}
        w="full"
      >
        <button onClick={onOpen}>
          <Image
            src="https://cdn-icons-png.flaticon.com/128/10233/10233705.png"
            alt={IMG_ALT}
            w="40px"
            h="auto"
            fit="cover"
          />
        </button>

        <Link href="/">
          <Image src="/images/logo.png" alt={IMG_ALT} w={12} h="auto" fit="cover" />
        </Link>

        <CartHeaderMobile />
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} autoFocus={false}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex align="center" gap={4}>
              <Link href="/">
                <Image src="/images/logo.png" alt={IMG_ALT} w={14} h="auto" fit="cover" />
              </Link>

              <Text fontWeight={700} fontSize={20}>
                Lermao
              </Text>
            </Flex>
          </DrawerHeader>

          <Divider />

          <DrawerBody>
            <Flex direction="column">
              {MENU_LIST.map((item) => {
                const { title, href } = item;
                const isActive = pathname === href;

                if (title === 'Logo') {
                  return null;
                }

                return (
                  <Link href={href} key={title} onClick={onClose}>
                    <Box
                      px="18px"
                      py="10px"
                      borderBottom="1px solid"
                      borderColor={isActive ? 'main.1' : 'transparent'}
                      data-group
                    >
                      <Text
                        fontWeight={700}
                        fontSize={16}
                        color={isActive ? 'main.1' : undefined}
                        _groupHover={{ color: 'main.1' }}
                        transitionDuration="250ms"
                      >
                        {title}
                      </Text>
                    </Box>
                  </Link>
                );
              })}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
