import TitleSpecial from '@/components/title-special';
import { API } from '@/utils/API';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { AspectRatio, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import BgProduct from './bg-product';
import TopProduct from './top-product';

const HomeProduct = async () => {
  const data = await API.request({
    url: '/api/category/get-all'
  });

  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return (
    <Flex direction="column" px={PX_ALL} mt="56px" pos="relative">
      <TitleSpecial fontSize={{ xs: 28, lg: 30, '2xl': 32 }} textAlign="center">
        Sản phẩm của Gấu Lermao
      </TitleSpecial>

      <Flex mt="40px" gap="20px" direction={{ xs: 'column', md: 'row' }} zIndex={10}>
        {data.map((item) => {
          const { name = '', id, description, imagesUrl } = item;

          return (
            <Flex
              key={id}
              flex={1}
              bgColor="#FFF"
              borderRadius="16px"
              boxShadow="0px 4px 24px 0px #0000000D"
              className="category-home-gradient-border"
            >
              <AspectRatio
                ratio={9 / 10}
                w="full"
                borderRadius="14px"
                className="category-home-gradient-border-content"
              >
                <Flex
                  direction="column"
                  gap="32px"
                  align="center"
                  justify="center"
                  borderRadius="14px"
                  pos="relative"
                  data-group
                >
                  <Text fontSize={20} fontWeight={700} textTransform="uppercase">
                    {name}
                  </Text>
                  <Image
                    src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/product.png'}
                    alt={IMG_ALT}
                    w={{ xs: '178px', md: '110px', lg: '178px' }}
                    h={{ xs: '212px', md: '150px', lg: '212px' }}
                    fit="cover"
                  />

                  <Flex
                    direction="column"
                    borderRadius="14px"
                    pos="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    p="24px"
                    justify="space-between"
                    bgColor="rgb(9, 30, 40, 0.9)"
                    opacity={0}
                    visibility="hidden"
                    transitionDuration="250ms"
                    _groupHover={{
                      opacity: 1,
                      visibility: 'visible'
                    }}
                  >
                    <Text
                      fontSize={14}
                      fontWeight={400}
                      lineHeight="18px"
                      color="#FFF"
                      textAlign="justify"
                      noOfLines={{ xs: undefined, lg: 10, '2xl': undefined }}
                    >
                      {description}
                    </Text>

                    <Link href={`/nguyen-lieu-pha-che?categoryId=${id}`}>
                      <Flex
                        color="#FFF"
                        border="1px solid #FFF"
                        fontWeight={700}
                        fontSize={16}
                        h="36px"
                        borderRadius={8}
                        align="center"
                        justify="center"
                        transitionDuration="250ms"
                        bgColor="transparent"
                        _hover={{
                          bgColor: 'transparent',
                          color: '#e7f7fb',
                          borderColor: '#e7f7fb'
                        }}
                        _active={{
                          bgColor: 'transparent',
                          color: '#e7f7fb',
                          borderColor: '#e7f7fb'
                        }}
                      >
                        Xem chi tiết
                      </Flex>
                    </Link>
                  </Flex>
                </Flex>
              </AspectRatio>
            </Flex>
          );
        })}
      </Flex>

      <TopProduct isHome />

      <Flex justify="center" mt="40px">
        <Link href="/nguyen-lieu-pha-che">
          <Flex
            align="center"
            justify="center"
            fontSize={16}
            fontWeight={700}
            borderRadius={8}
            color="#00B7E9"
            gap="4px"
            w="150px"
            h="40px"
            border="1px solid #00B7E9"
            bgColor="transparent"
            _hover={{
              bgColor: 'transparent',
              opacity: 0.8
            }}
            _active={{
              bgColor: 'transparent',
              opacity: 0.8
            }}
          >
            Xem tất cả
            <Image src="/images/arrow-right.png" alt={IMG_ALT} w="24px" h="24px" />
          </Flex>
        </Link>
      </Flex>

      <BgProduct />
    </Flex>
  );
};

export default HomeProduct;
