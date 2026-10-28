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
import { useState } from 'react';
import { useQueryMenuCategories } from '@/services/category.service';
import CartHeader from './_components/cart-header';
import CartHeaderMobile from './_components/cart-header-mobile';

const Header = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Title mục cấp 1 đang mở dropdown và id danh mục đang mở flyout cấp 2.
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { data: menuCategories = [] } = useQueryMenuCategories();

  const closeDropdown = () => {
    setOpenDropdown(null);
    setOpenSubmenu(null);
  };

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
      title: 'Nguyên Liệu Pha Chế',
      href: '/nguyen-lieu-pha-che',
      dropdownItems: menuCategories
    },
    {
      title: 'Logo',
      href: '/'
    },
    {
      title: 'Công Thức',
      href: '/cong-thuc-pha-che'
    },
    {
      title: 'Workshop Pha Chế',
      href: '/workshop-pha-che'
    },
    {
      title: 'Tin Tức',
      href: '/tin-tuc'
    }
    // {
    //   title: 'Liên hệ',
    //   href: '/lien-he'
    // }
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
        bgColor="#FFF"
        boxShadow="0px 4px 24px 0px #0000000D"
        pos="fixed"
        top={0}
        left={0}
        w="full"
      >
        {/* Left menu */}
        <Flex flex={1} justify="flex-end" gap="8px" pr="32px">
          {MENU_LIST.slice(0, 3).map((item) => {
            const { title, href, dropdownItems } = item;
            const isActive = pathname === href;
            const hasDropdown = dropdownItems?.length > 0;
            return (
              <Box
                key={title}
                pos="relative"
                onMouseEnter={hasDropdown ? () => setOpenDropdown(title) : undefined}
                onMouseLeave={hasDropdown ? closeDropdown : undefined}
              >
                <Link href={href} onClick={hasDropdown ? closeDropdown : undefined}>
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
                      whiteSpace="nowrap"
                    >
                      {title}
                    </Text>
                  </Box>
                </Link>

                {/* Dropdown cấp 1: danh mục cha */}
                {hasDropdown && openDropdown === title && (
                  <Box
                    pos="absolute"
                    top="100%"
                    left={0}
                    bg="white"
                    border="1px solid #e2e8f0"
                    borderRadius="8px"
                    boxShadow="0 10px 25px rgba(0,0,0,0.15)"
                    py={2}
                    minW="280px"
                    zIndex={1001}
                  >
                    {dropdownItems.map((category) => {
                      const hasSub = category.children.length > 0;
                      return (
                        <Box
                          key={category.id}
                          pos="relative"
                          onMouseEnter={() => setOpenSubmenu(hasSub ? category.id : null)}
                          onMouseLeave={() => setOpenSubmenu(null)}
                        >
                          <Link href={category.href} onClick={closeDropdown}>
                            <Flex
                              align="center"
                              justify="space-between"
                              px={4}
                              py={3}
                              color="gray.700"
                              _hover={{ bg: 'gray.200', color: 'black' }}
                              transition="all 0.2s ease"
                            >
                              <Text as="span" fontSize={16}>
                                {category.name}
                              </Text>
                              {hasSub && (
                                <Text as="span" ml={2} fontSize={14} color="gray.500">
                                  ›
                                </Text>
                              )}
                            </Flex>
                          </Link>

                          {/* Flyout cấp 2: danh mục con */}
                          {hasSub && openSubmenu === category.id && (
                            <Box
                              pos="absolute"
                              top={0}
                              left="100%"
                              bg="white"
                              border="1px solid #e2e8f0"
                              borderRadius="8px"
                              boxShadow="0 10px 25px rgba(0,0,0,0.15)"
                              py={2}
                              minW="260px"
                              maxH="400px"
                              overflowY="auto"
                              zIndex={1002}
                            >
                              {category.children.map((child) => (
                                <Link key={child.id} href={child.href} onClick={closeDropdown}>
                                  <Box
                                    px={4}
                                    py={3}
                                    fontSize={16}
                                    color="gray.700"
                                    _hover={{ bg: 'gray.200', color: 'black' }}
                                    transition="all 0.2s ease"
                                  >
                                    {child.name}
                                  </Box>
                                </Link>
                              ))}
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          })}
        </Flex>

        {/* Logo — center */}
        <Link href="/">
          <Image src="/images/logo.webp" w="70px" h="64px" fit="cover" alt={IMG_ALT} flexShrink={0} />
        </Link>

        {/* Right menu */}
        <Flex flex={1} justify="flex-start" gap="8px" pl="32px">
          {MENU_LIST.slice(4).map((item) => {
            const { title, href } = item;
            const isActive = pathname === href;
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
                    whiteSpace="nowrap"
                  >
                    {title}
                  </Text>
                </Box>
              </Link>
            );
          })}
        </Flex>
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
          <Image src="/images/logo.webp" alt={IMG_ALT} w={12} h="auto" fit="cover" />
        </Link>

        {/* <CartHeaderMobile /> */}
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} autoFocus={false}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex align="center" gap={4}>
              <Link href="/">
                <Image src="/images/logo.webp" alt={IMG_ALT} w={14} h="auto" fit="cover" />
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
                const { title, href, dropdownItems } = item;
                const isActive = pathname === href;

                if (title === 'Logo') {
                  return null;
                }

                return (
                  <Box key={title}>
                    <Link href={href} onClick={onClose}>
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

                    {/* Danh mục cấp 1 + cấp 2 (thụt lề sâu hơn) */}
                    {dropdownItems?.length > 0 && (
                      <Flex direction="column" bg="#f9f9f9">
                        {dropdownItems.map((category) => (
                          <Box key={category.id}>
                            <Link href={category.href} onClick={onClose}>
                              <Box
                                pl="32px"
                                pr="18px"
                                py="10px"
                                fontSize={15}
                                color={pathname === category.href ? 'main.1' : '#555'}
                                _hover={{ bg: '#eef2f6', color: 'main.1' }}
                                borderBottom="1px solid #e2e8f0"
                              >
                                {category.name}
                              </Box>
                            </Link>

                            {category.children.map((child) => (
                              <Link key={child.id} href={child.href} onClick={onClose}>
                                <Box
                                  pl="48px"
                                  pr="18px"
                                  py="8px"
                                  fontSize={14}
                                  color={pathname === child.href ? 'main.1' : '#888'}
                                  _hover={{ bg: '#eef2f6', color: 'main.1' }}
                                  borderBottom="1px solid #e2e8f0"
                                >
                                  {child.name}
                                </Box>
                              </Link>
                            ))}
                          </Box>
                        ))}
                      </Flex>
                    )}
                  </Box>
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
