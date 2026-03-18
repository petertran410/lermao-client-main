// src/components/article-detail-template/index.js
'use client';

import Breadcrumb from '@/components/breadcrumb';
import Carousel from '@/components/carousel';
import TableOfContents from '@/components/toc';
import { useQueryFindIdBySlug, useQueryNewsDetail, useQueryRelatedNews } from '@/services/news.service';
import { API } from '@/utils/API';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { AspectRatio, Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════
// Related Articles Sidebar
// ═══════════════════════════════════════════
const RelatedArticles = ({ type, currentId, basePath }) => {
  const { data: articles = [], isLoading } = useQueryRelatedNews(type, currentId, 6);

  if (isLoading || !articles.length) return null;

  return (
    <Box>
      <Text fontWeight={700} fontSize={18} mb="16px">
        Bài viết liên quan
      </Text>
      <Flex direction="column" gap="16px">
        {articles.map((article) => (
          <Link href={`${basePath}/${convertSlugURL(article.title)}`} key={article.id}>
            <Flex gap="12px" align="flex-start" data-group>
              <Image
                src={article.imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news-default.png'}
                w="120px"
                h="80px"
                objectFit="cover"
                borderRadius={8}
                alt={IMG_ALT}
                flexShrink={0}
              />
              <Flex direction="column" gap="4px" flex={1}>
                <Text
                  fontSize={14}
                  fontWeight={600}
                  noOfLines={2}
                  lineHeight="18px"
                  _groupHover={{ color: 'main.1' }}
                  transition="color 0.2s"
                >
                  {article.title}
                </Text>
                <Text fontSize={12} color="#999">
                  {dayjs(article.createdDate).format('DD/MM/YYYY')}
                </Text>
              </Flex>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

// ═══════════════════════════════════════════
// Main Detail Component
// ═══════════════════════════════════════════
const ArticleDetailClient = ({ slug, type, basePath, breadcrumbTitle, backLabel }) => {
  const { data: idData, isLoading: idLoading } = useQueryFindIdBySlug(slug, type);
  const articleId = idData?.id;
  const { data: newsDetail, isLoading: detailLoading } = useQueryNewsDetail(articleId);
  const hasIncrementedRef = useRef(false);

  // Increment view
  useEffect(() => {
    if (articleId && !hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      API.request({ url: `/api/news/client/increment-view/${articleId}`, method: 'POST' }).catch(() => {});
    }
  }, [articleId]);

  // Reset ref khi slug thay đổi
  useEffect(() => {
    hasIncrementedRef.current = false;
  }, [slug]);

  if (idLoading || detailLoading) {
    return (
      <Flex pt={{ xs: '90px', lg: '160px' }} px={PX_ALL} justify="center" align="center" minH="400px">
        <Spinner size="lg" color="main.1" />
      </Flex>
    );
  }

  if (!newsDetail) {
    return (
      <Flex pt={{ xs: '90px', lg: '160px' }} px={PX_ALL} direction="column" align="center" gap="16px" minH="400px">
        <Image src="/images/lermao-run.gif" alt={IMG_ALT} w="80px" h="auto" opacity={0.5} />
        <Text color="#999">Không tìm thấy bài viết</Text>
      </Flex>
    );
  }

  const { title, htmlContent, createdDate, imagesUrl, view, description } = newsDetail;

  const breadcrumbData = [
    { title: breadcrumbTitle, href: basePath },
    { title, href: '#', isActive: true }
  ];

  const hasToc = htmlContent?.startsWith('<toc></toc>') || htmlContent?.includes('<toc></toc>');

  return (
    <Flex
      direction="column"
      px={PX_ALL}
      pt={{ xs: '0px', md: '40px' }}
      pb="60px"
      zIndex={10}
      pos="relative"
      className="page-detail"
    >
      {/* Breadcrumb */}
      <Box display={{ xs: 'none', lg: 'block' }}>
        <Breadcrumb data={breadcrumbData} />
        <Box h="1px" w="full" bgColor="#E1E2E3" mt="12px" />
      </Box>

      <Flex gap={{ xs: '40px', lg: '32px' }} mt="24px" direction={{ xs: 'column', lg: 'row' }}>
        {/* Main content */}
        <Flex w="full" flex={{ xs: 'none', lg: 2 / 3 }} direction="column">
          <Text as="h1" lineHeight="32px" fontWeight={700} fontSize={24}>
            {title}
          </Text>

          <Flex align="center" gap="24px" mt="12px">
            <Flex align="center" gap="8px">
              <Image src="/images/calendar.png" alt={IMG_ALT} w="20px" h="20px" />
              <Text fontSize={12} color="#999">
                {dayjs(createdDate).format('DD/MM/YYYY')}
              </Text>
            </Flex>
            <Flex align="center" gap="8px">
              <Image src="/images/eye.png" alt={IMG_ALT} w="20px" h="20px" />
              <Text fontSize={12} color="#999">
                {view || newsDetail.viewCount || 0} lượt xem
              </Text>
            </Flex>
          </Flex>

          {description && (
            <Text mt="16px" fontSize={15} fontWeight={500} color="#555" lineHeight="24px">
              {description}
            </Text>
          )}

          {/* Table of Contents */}
          {hasToc && htmlContent && (
            <Box w="full" my="24px" borderRadius={8} border="1px solid #CCC" px="16px" py="12px">
              <Text fontWeight={700} fontSize={18}>
                Mục lục
              </Text>
              <TableOfContents html={htmlContent} />
            </Box>
          )}

          {/* Featured Image */}
          {imagesUrl?.[0] && (
            <AspectRatio ratio={{ xs: 4 / 3, md: 16 / 9 }} w="full" mt="20px">
              <Image
                src={imagesUrl[0]?.replace('http://', 'https://')}
                alt={title || IMG_ALT}
                w="full"
                h="full"
                fit="cover"
                borderRadius={12}
                fallbackSrc="/images/news-default.png"
              />
            </AspectRatio>
          )}

          {/* HTML Content */}
          {htmlContent && (
            <Box
              w="full"
              mt="24px"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="html-content"
              sx={{
                img: { borderRadius: '12px', my: '16px', maxW: '100%' },
                'h2, h3': { color: '#1d2128', mt: '24px', mb: '12px', fontWeight: 700 },
                p: { mb: '12px', lineHeight: '1.8', fontSize: '15px' },
                ul: { pl: '20px', mb: '12px' },
                li: { mb: '6px' }
              }}
            />
          )}
        </Flex>

        {/* Sidebar */}
        <Flex w={{ xs: 'full', lg: '33%' }} direction="column" position={{ lg: 'sticky' }} top={{ lg: '120px' }}>
          {articleId && <RelatedArticles type={type} currentId={articleId} basePath={basePath} />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ArticleDetailClient;
