'use client';

import { useQueryCategoryList } from '@/services/category.service';
import { IMG_ALT } from '@/utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CategoryList = () => {
  const { data = [] } = useQueryCategoryList();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Flex direction="column" bgColor="#FFF" borderRadius={8} p="8px" w="full" h="fit-content">
      <Image src="/images/category-list.png" alt={IMG_ALT} w="19px" h="19px" />
      <Text fontWeight={700} fontSize={16} mt="8px" _hover={{ color: 'text.1' }}>
        Danh mục sản phẩm
      </Text>
      <Flex direction="column" mt="16px" gap="8px">
        {data?.map((item, index) => {
          const { name, id } = item;
          let bgImage = '/images/bg-category-1.png';
          if (index === 1) {
            bgImage = '/images/bg-category-2.png';
          }
          if (index === 2) {
            bgImage = '/images/bg-category-3.png';
          }

          return (
            <Link href={`/san-pham?categoryId=${id}`} key={id} style={{ display: 'block' }}>
              <Flex
                align="center"
                justify="space-between"
                py="18px"
                px="16px"
                borderRadius={4}
                bgImage={bgImage}
                bgSize="cover"
                bgRepeat="no-repeat"
                _hover={{ opacity: 0.8 }}
                transitionDuration="250ms"
              >
                <Text fontWeight={700} fontSize={16} color="#FFF" _hover={{ color: '#FFF' }}>
                  {name}
                </Text>
                <Image src="/images/arrow-right-white.png" alt={IMG_ALT} w="24px" h="24px" />
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default CategoryList;
