'use client';

import { LoadingScreen } from '@/components/effect-screen';
import Pagination from '@/components/pagination';
import TitleSpecial from '@/components/title-special';
import { useQueryNewsList } from '@/services/news.service';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { useParamsURL } from '@/utils/hooks';
import { AspectRatio, Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

const NewsList = () => {
  const { data: dataQuery = [], isLoading } = useQueryNewsList();
  const { content: newsList = [], totalPages, pageable } = dataQuery || {};
  const { pageNumber = 0 } = pageable || {};
  const [paramsURL, setParamsURL] = useParamsURL();
  const { keyword } = paramsURL;
  const [keywordText, setKeywordText] = useState('');

  useEffect(() => {
    if (keyword) {
      setKeywordText(keyword);
    }
  }, [keyword]);

  const [firstNews, ...newsListSmall] = newsList || [];

  return (
    <Flex direction="column" px={PX_ALL} pt="40px" zIndex={10} pos="relative">
      <TitleSpecial fontSize={{ xs: 28, lg: 30, '2xl': 32 }} textAlign="center">
        Tin tức
      </TitleSpecial>

      <Flex gap={{ xs: '40px', lg: '20px' }} mt="40px" direction={{ xs: 'column', lg: 'row' }}>
        <Flex direction="column" flex={{ xs: 'none', lg: 1 }}>
          <Flex align="center" gap="8px">
            <Flex flex={1} pos="relative">
              <Input
                borderRadius={8}
                bgColor="#FFF"
                color="text.1"
                placeholder="Nhập từ khoá"
                borderColor="#C3C6C7"
                h="40px"
                pr={10}
                value={keywordText}
                onChange={(e) => setKeywordText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setParamsURL({ keyword: keywordText.trim() });
                  }
                }}
              />
              <Image
                src="/images/search.png"
                w="24px"
                h="24px"
                pos="absolute"
                zIndex={10}
                top="8px"
                right="10px"
                alt={IMG_ALT}
              />
            </Flex>
            <Button
              bgColor="#00b7e9"
              color="#FFF"
              w="110px"
              h="40px"
              fontSize={16}
              borderRadius={8}
              fontWeight={700}
              _hover={{ opacity: 0.8, color: '#FFF' }}
              _active={{ opacity: 0.8, color: '#FFF' }}
            >
              Tìm kiếm
            </Button>
          </Flex>

          {isLoading && (
            <Flex mt="40px" justify="center">
              <LoadingScreen />
            </Flex>
          )}

          {!isLoading && Array.isArray(newsList) && !!newsList.length && (
            <>
              {pageNumber === 0 && (
                <AspectRatio ratio={{ xs: 4 / 3, md: 20 / 9 }} w="full" mt="24px">
                  <Link
                    href={`/tin-tuc/${convertSlugURL(firstNews?.title)}.${firstNews?.id}`}
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  >
                    <Box h="full" w="full" pos="relative" borderRadius={8} overflow="hidden">
                      <Image
                        src={firstNews?.imagesUrl?.[0]?.replace('http://', 'https://')}
                        alt={IMG_ALT}
                        fallbackSrc="/images/news-default.png"
                        w="full"
                        h="full"
                        fit="cover"
                      />

                      <Box pos="absolute" bottom={0} left={0} w="full" bgColor="#091e28c4" p="16px" pt="8px">
                        <Flex align="center" gap="24px">
                          <Flex align="center" gap="8px">
                            <Image src="/images/calendar-white.png" alt={IMG_ALT} w="20px" h="20px" />
                            <Text fontSize={12} color="#FFF" _hover={{ color: '#FFF' }}>
                              {dayjs(firstNews?.createdDate).format('DD/MM/YYYY')}
                            </Text>
                          </Flex>
                          <Flex align="center" gap="8px">
                            <Image src="/images/eye-white.png" alt={IMG_ALT} w="20px" h="20px" />
                            <Text fontSize={12} color="#FFF" _hover={{ color: '#FFF' }}>
                              {firstNews?.view || 0} lượt xem
                            </Text>
                          </Flex>
                        </Flex>

                        <Text
                          mt="8px"
                          fontWeight={700}
                          fontSize={24}
                          noOfLines={2}
                          color="#FFF"
                          lineHeight="29px"
                          _hover={{ color: '#FFF' }}
                        >
                          {firstNews?.title}
                        </Text>
                      </Box>
                    </Box>
                  </Link>
                </AspectRatio>
              )}

              <Flex direction="column" my="24px" gap="16px">
                {newsListSmall?.map((item) => {
                  const { title, id, imagesUrl, createdDate, description, view } = item;

                  return (
                    <Flex key={id} gap={{ xs: '14px', md: '24px' }} align="flex-start">
                      <AspectRatio ratio={4 / 3} w={{ xs: '130px', md: '215px' }}>
                        <Link href={`/tin-tuc/${convertSlugURL(title)}.${id}`}>
                          <Image
                            src={imagesUrl?.[0]?.replace('http://', 'https://')}
                            alt={IMG_ALT}
                            h="full"
                            w="auto"
                            fallbackSrc="/images/news-default.png"
                            fit="cover"
                            borderRadius={8}
                          />
                        </Link>
                      </AspectRatio>

                      <Flex flex={1} direction="column" gap="8px">
                        <Flex align="center" gap="24px">
                          <Flex align="center" gap="8px">
                            <Image src="/images/calendar.png" alt={IMG_ALT} w="20px" h="20px" />
                            <Text fontSize={12} _hover={{ color: 'text.1' }}>
                              {dayjs(createdDate).format('DD/MM/YYYY')}
                            </Text>
                          </Flex>
                          <Flex align="center" gap="8px">
                            <Image src="/images/eye.png" alt={IMG_ALT} w="20px" h="20px" />
                            <Text fontSize={12} _hover={{ color: 'text.1' }}>
                              {view || 0} lượt xem
                            </Text>
                          </Flex>
                        </Flex>

                        <Link href="/tin-tuc/abcdef.1">
                          <Text
                            as="h2"
                            fontSize={16}
                            fontWeight={700}
                            noOfLines={{ xs: 3, md: 2 }}
                            lineHeight="20px"
                            transitionDuration="250ms"
                            _hover={{ color: '#00b7e9' }}
                          >
                            {title}
                          </Text>
                        </Link>

                        <Text noOfLines={1} display={{ xs: 'none', md: '-webkit-box' }} _hover={{ color: 'text.1' }}>
                          {description}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>

              <Pagination totalPages={totalPages} currentPage={pageNumber + 1} />
            </>
          )}

          {!isLoading && (!Array.isArray(newsList) || !newsList.length) && (
            <Text textAlign="center" mt="40px">
              Không có dữ liệu
            </Text>
          )}
        </Flex>

        {/* <Flex w={{ xs: 'full', lg: '216px' }}>
          <CategoryList />
        </Flex> */}
      </Flex>
    </Flex>
  );
};

const NewsWrapper = () => {
  return (
    <Suspense>
      <NewsList />
    </Suspense>
  );
};

export default NewsWrapper;
