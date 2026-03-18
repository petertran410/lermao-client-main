// src/components/article-detail-template/index.js
'use client';

import Breadcrumb from '@/components/breadcrumb';
import TableOfContents from '@/components/toc';
import { useQueryFindIdBySlug, useQueryNewsDetail, useQueryRelatedNews } from '@/services/news.service';
import { API } from '@/utils/API';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { injectHeadingIds } from '@/utils/html-heading';
import { AspectRatio, Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';

// ═══════════════════════════════════════════
// Video Embed
// ═══════════════════════════════════════════
const VideoEmbed = ({ embedUrl }) => {
  if (!embedUrl) return null;

  return (
    <AspectRatio ratio={16 / 9} w="full" mt="20px" mb="20px">
      <iframe
        src={embedUrl}
        title="Video nhúng"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: '8px' }}
      />
    </AspectRatio>
  );
};

// ═══════════════════════════════════════════
// Sidebar — Bài viết mới nhất
// ═══════════════════════════════════════════
const LatestArticlesSidebar = ({ type, currentId, basePath }) => {
  const { data: articles = [], isLoading } = useQueryRelatedNews(type, currentId, 6);

  if (isLoading) {
    return (
      <Box p="16px" bg="gray.50" borderRadius="8px">
        <Text fontSize={18} fontWeight={500} mb="16px">
          Đang tải...
        </Text>
      </Box>
    );
  }

  if (!articles.length) {
    return (
      <Box p="16px" bg="gray.50" borderRadius="8px">
        <Text fontSize={18} fontWeight={500} mb="16px">
          Bài viết mới nhất
        </Text>
        <Text fontSize={14} color="gray.500">
          Chưa có bài viết nào khác
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize={20} fontWeight={600} mb="20px">
        Bài viết mới nhất
      </Text>
      <Flex direction="column" gap="20px">
        {articles.map((article) => (
          <Link href={`${basePath}/${convertSlugURL(article.title)}`} key={article.id}>
            <Flex gap="12px" align="flex-start" data-group>
              <Image
                src={article.imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news-default.png'}
                w="150px"
                h="100px"
                minW="150px"
                objectFit="cover"
                borderRadius="8px"
                alt={IMG_ALT}
              />
              <Flex direction="column" gap="4px" flex={1}>
                <Text
                  fontSize={16}
                  fontWeight={500}
                  lineHeight="20px"
                  noOfLines={2}
                  _groupHover={{ color: 'main.1' }}
                  transition="color 0.2s"
                >
                  {article.title}
                </Text>
                <Text fontSize={14} color="#A1A1AA">
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

  useEffect(() => {
    if (articleId && !hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      API.request({ url: `/api/news/client/increment-view/${articleId}`, method: 'POST' }).catch(() => {});
    }
  }, [articleId]);

  useEffect(() => {
    hasIncrementedRef.current = false;
  }, [slug]);

  // Inject heading IDs vào HTML 1 lần, dùng chung cho cả TOC và content
  const processedHtml = useMemo(() => {
    return injectHeadingIds(newsDetail?.htmlContent);
  }, [newsDetail?.htmlContent]);

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

  const { title, createdDate, imagesUrl, view, description, embedUrl, viewCount } = newsDetail;

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: breadcrumbTitle, href: basePath },
    { title, href: '#', isActive: true }
  ];

  const showToc = processedHtml && !processedHtml.startsWith('<toc></toc>');

  return (
    <Flex
      pt={{ xs: '10px', lg: '40px' }}
      px={PX_ALL}
      gap={{ xs: '32px', lg: '48px' }}
      pb="50px"
      direction={{ xs: 'column', lg: 'row' }}
      zIndex={10}
      pos="relative"
    >
      {/* ══════════════════════════════════════
          MAIN CONTENT — 2/3
      ══════════════════════════════════════ */}
      <Flex flex={2 / 3} direction="column">
        <Breadcrumb data={breadcrumbData} />

        <Text as="h1" fontSize={{ xs: 24, lg: 28 }} fontWeight={700} mt="20px" lineHeight="34px">
          {title}
        </Text>

        <Text mt="12px" color="#A1A1AA" fontSize={16}>
          Ngày đăng: {dayjs(createdDate).format('DD/MM/YYYY')}
        </Text>

        {description && (
          <Text mt="16px" fontWeight={500} fontSize={{ xs: 16, lg: 18 }} lineHeight="28px" color="#333">
            {description}
          </Text>
        )}

        {/* Table of Contents — dùng processedHtml (đã có id) */}
        {showToc && (
          <Box my="24px" borderRadius={8} border="1px solid #CCC" px="16px" py="12px">
            <Text fontWeight={700} fontSize={20}>
              Mục lục
            </Text>
            <TableOfContents html={processedHtml} />
          </Box>
        )}

        <AspectRatio ratio={16 / 9} w="full" mt="20px">
          <Image
            src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news-default.png'}
            w="full"
            h="full"
            alt={title || IMG_ALT}
            borderRadius={8}
            fallbackSrc="/images/news-default.png"
          />
        </AspectRatio>

        <VideoEmbed embedUrl={embedUrl} />

        {/* HTML Content — dùng cùng processedHtml (heading đã có id khớp với TOC) */}
        {processedHtml && (
          <Box
            w="full"
            mt="20px"
            className="html-content"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
            sx={{
              fontSize: '17px',
              lineHeight: '1.9',
              color: '#333',
              // h2: { fontSize: '22px', fontWeight: 700, color: '#1d2128', mt: '32px', mb: '12px' },
              // h3: { fontSize: '19px', fontWeight: 700, color: '#1d2128', mt: '24px', mb: '12px' },
              // p: { mb: '14px' },
              // img: { borderRadius: '8px', my: '16px', maxW: '100%', h: 'auto' },
              // 'ul, ol': { pl: '24px', mb: '14px' },
              // li: { mb: '8px' },
              // a: { color: 'main.1', textDecoration: 'underline' },
              blockquote: {
                borderLeft: '4px solid',
                borderColor: 'main.1',
                pl: '16px',
                ml: '0',
                my: '16px',
                fontStyle: 'italic',
                color: '#555'
              },
              table: { w: '100%', borderCollapse: 'collapse', my: '16px' },
              'th, td': { border: '1px solid #ddd', p: '8px 12px', textAlign: 'left' },
              th: { bgColor: '#f5f5f5', fontWeight: 600 }
            }}
          />
        )}
      </Flex>

      {/* ══════════════════════════════════════
          SIDEBAR — 1/3
      ══════════════════════════════════════ */}
      <Flex flex={1 / 3} direction="column" position={{ lg: 'sticky' }} top={{ lg: '120px' }} alignSelf="flex-start">
        {articleId && <LatestArticlesSidebar type={type} currentId={articleId} basePath={basePath} />}
      </Flex>
    </Flex>
  );
};

export default ArticleDetailClient;
