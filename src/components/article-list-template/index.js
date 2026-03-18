// src/components/article-list-template/index.js
'use client';

import { LoadingScreen } from '@/components/effect-screen';
import Pagination from '@/components/pagination';
import TitleSpecial from '@/components/title-special';
import { useQueryNewsByType } from '@/services/news.service';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { useParamsURL } from '@/utils/hooks';
import { AspectRatio, Box, Button, Flex, Grid, GridItem, Image, Input, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

// ═══════════════════════════════════════════
// Article Card
// ═══════════════════════════════════════════
const ArticleCard = ({ item, basePath }) => {
  const { title, imagesUrl, createdDate, description } = item || {};
  const slug = convertSlugURL(title);
  const image = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news-default.png';

  return (
    <Flex
      direction="column"
      bgColor="#FFF"
      borderRadius={12}
      overflow="hidden"
      boxShadow="0px 4px 24px 0px #0000000D"
      h="full"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: '0px 8px 32px 0px #0000001A' }}
    >
      <Link href={`${basePath}/${slug}`}>
        <AspectRatio ratio={16 / 9} w="full">
          <Image
            src={image}
            alt={title || IMG_ALT}
            w="full"
            h="full"
            fit="cover"
            fallbackSrc="/images/news-default.png"
          />
        </AspectRatio>
      </Link>

      <Flex direction="column" p="16px" flex={1} justify="space-between" gap="12px">
        <Box>
          <Link href={`${basePath}/${slug}`}>
            <Text
              fontWeight={700}
              fontSize={16}
              noOfLines={2}
              lineHeight="22px"
              _hover={{ color: 'main.1' }}
              transition="color 0.2s"
            >
              {title}
            </Text>
          </Link>

          {description && (
            <Text mt="8px" fontSize={14} color="#666" noOfLines={2} lineHeight="20px">
              {description}
            </Text>
          )}
        </Box>

        <Flex direction="column" gap="12px">
          <Flex align="center" gap="8px">
            <Image src="/images/calendar.png" alt={IMG_ALT} w="16px" h="16px" />
            <Text fontSize={12} color="#999">
              {dayjs(createdDate).format('DD/MM/YYYY')}
            </Text>
          </Flex>

          <Link href={`${basePath}/${slug}`}>
            <Button
              size="sm"
              bgColor="transparent"
              color="main.1"
              border="1px solid"
              borderColor="main.1"
              borderRadius={8}
              fontWeight={600}
              fontSize={14}
              _hover={{ bgColor: 'main.1', color: '#FFF' }}
              _active={{ bgColor: 'main.1', color: '#FFF' }}
              transition="all 0.2s"
            >
              Đọc tiếp
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

// ═══════════════════════════════════════════
// Main Template
// ═══════════════════════════════════════════
const ArticleListTemplate = ({ type, title, basePath, pageSize = 12 }) => {
  const { data: dataQuery, isLoading } = useQueryNewsByType(type, pageSize);
  const { content = [], totalPages, pageable } = dataQuery || {};
  const { pageNumber = 0 } = pageable || {};
  const [paramsURL, setParamsURL] = useParamsURL();
  const { keyword } = paramsURL;
  const [keywordText, setKeywordText] = useState('');

  useEffect(() => {
    if (keyword) setKeywordText(keyword);
  }, [keyword]);

  const handleSearch = () => {
    setParamsURL({ keyword: keywordText.trim(), page: undefined });
  };

  return (
    <Flex direction="column" px={PX_ALL} pt="40px" pb="60px" zIndex={10} pos="relative">
      <TitleSpecial fontSize={{ xs: 28, lg: 30, '2xl': 32 }} textAlign="center">
        {title}
      </TitleSpecial>

      {/* Search bar */}
      <Flex align="center" mt="32px" gap="8px" maxW="600px" mx="auto" w="full">
        <Flex flex={1} pos="relative">
          <Input
            borderRadius={8}
            bgColor="#FFF"
            placeholder="Nhập từ khoá tìm kiếm..."
            borderColor="#C3C6C7"
            h="40px"
            color="text.1"
            pr={10}
            value={keywordText}
            onChange={(e) => setKeywordText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
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
            cursor="pointer"
            onClick={handleSearch}
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
          _hover={{ opacity: 0.8 }}
          _active={{ opacity: 0.8 }}
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Flex>

      {/* Loading */}
      {isLoading && (
        <Flex mt="40px" justify="center">
          <LoadingScreen />
        </Flex>
      )}

      {/* Grid */}
      {!isLoading && Array.isArray(content) && content.length > 0 && (
        <Box mt="32px">
          <Grid templateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px">
            {content.map((item) => (
              <GridItem key={item.id}>
                <ArticleCard item={item} basePath={basePath} />
              </GridItem>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box mt="32px">
              <Pagination totalPages={totalPages} currentPage={pageNumber + 1} />
            </Box>
          )}
        </Box>
      )}

      {/* Empty */}
      {!isLoading && (!Array.isArray(content) || content.length === 0) && (
        <Flex direction="column" align="center" mt="60px" gap="16px">
          <Image src="/images/lermao-run.gif" alt={IMG_ALT} w="80px" h="auto" opacity={0.5} />
          <Text color="#999" fontSize={16}>
            Không có dữ liệu
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

const ArticleListTemplateWrapper = (props) => {
  return (
    <Suspense>
      <ArticleListTemplate {...props} />
    </Suspense>
  );
};

export default ArticleListTemplateWrapper;
