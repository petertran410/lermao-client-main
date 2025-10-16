import Breadcrumb from '@/components/breadcrumb';
import Carousel from '@/components/carousel';
import TableOfContents from '@/components/toc';
import { API } from '@/utils/API';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL, META_DESCRIPTION, META_KEYWORDS } from '@/utils/helper-server';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split('.').pop();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/${id}`);
  const data = await response.json();

  const { title: titleData, imagesUrl } = data || {};
  const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.png';
  const title = `${titleData} | Gấu Lermao`;
  const description = META_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl]
    }
  };
}

const NewsDetail = async ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const newsDetail = await API.request({ url: `/api/news/client/${id}` });
  const newsListQuery = await API.request({ url: '/api/news/get-all', params: { pageSize: 6, type: 'NEWS' } });
  const { content: newsList = [] } = newsListQuery || {};

  if (!newsDetail) {
    return null;
  }

  const otherNewsBreakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  const { title, htmlContent, createdDate, imagesUrl, view, description } = newsDetail;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: 'vi-VN',
    isFamilyFriendly: true,
    isAccessibleForFree: 'true',
    articleSection: ['amusements', 'culture', 'arts', 'lifestyle'],
    copyrightYear: '2025',
    typicalAgeRange: '22-50',
    accessModeSufficient: ['textual', 'visual'],
    accessMode: ['visual'],
    schemaVersion: '10.0',
    additionalType: [
      'https://www.google.com/search?q=g%E1%BA%A5u+lermao',
      'https://www.facebook.com/lermao.sanhannhugau',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    keywords: META_KEYWORDS,
    backstory: description || '',
    exampleOfWork: META_KEYWORDS,
    sameAs: [
      'https://www.google.com/search?q=g%E1%BA%A5u+lermao',
      'https://www.facebook.com/lermao.sanhannhugau',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    abstract: title,
    name: title,
    alternativeHeadline: title,
    headline: title,
    url: `${process.env.NEXT_PUBLIC_API_DOMAIN}/tin-tuc/${slug}`,
    description: description || '',
    disambiguatingDescription: title,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_API_DOMAIN}/tin-tuc/${slug}`,
    image: imagesUrl || [],
    thumbnailUrl: imagesUrl?.[0]?.replace('http://', 'https://') || '',
    articleBody: description || '',
    genre: title,
    creativeWorkStatus: 'Published'
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/tin-tuc/${slug}`} />
      </Head>

      <Script
        id="json-ld-tin-tuc"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Flex
        direction="column"
        px={PX_ALL}
        pt={{ xs: '0px', md: '40px' }}
        zIndex={10}
        pos="relative"
        className="page-detail"
      >
        <Box display={{ xs: 'none', lg: 'block' }}>
          <Breadcrumb
            data={[
              { title: 'Tin tức', href: '/tin-tuc' },
              { title: 'Chi tiết bài viết', href: `/tin-tuc/${convertSlugURL(title)}.${id}`, isActive: true }
            ]}
          />

          <Box h="1px" w="full" bgColor="#E1E2E3" mt="12px" />
        </Box>

        <Flex gap={{ xs: '40px', lg: '20px' }} mt="24px" direction={{ xs: 'column', lg: 'row' }}>
          <Flex w="full" flex={{ xs: 'none', lg: 1 }}>
            <Box w="full">
              <Text as="h1" lineHeight="30px" fontWeight={700} fontSize={24}>
                {title}
              </Text>

              <Flex align="center" gap="24px" mt="8px">
                <Flex align="center" gap="8px">
                  <Image src="/images/calendar.png" alt={IMG_ALT} w="20px" h="20px" />
                  <Text fontSize={12}>{dayjs(createdDate).format('DD/MM/YYYY')}</Text>
                </Flex>
                <Flex align="center" gap="8px">
                  <Image src="/images/eye.png" alt={IMG_ALT} w="20px" h="20px" />
                  <Text fontSize={12}>{view || 1} lượt xem</Text>
                </Flex>
              </Flex>

              {!!htmlContent?.startsWith('<toc></toc>') && (
                <Box
                  w="full"
                  my="24px"
                  className="html-content"
                  borderRadius={8}
                  border="1px solid #CCC"
                  px="16px"
                  py="12px"
                >
                  <Text fontWeight={700} fontSize={18}>
                    Mục lục
                  </Text>
                  <TableOfContents html={htmlContent} />
                </Box>
              )}

              {!!imagesUrl?.[0] && (
                <AspectRatio ratio={{ xs: 4 / 3, md: 20 / 9 }} w="full" mt="24px">
                  <Image
                    src={imagesUrl[0]?.replace('http://', 'https://')}
                    alt={IMG_ALT}
                    w="full"
                    h="full"
                    fit="cover"
                    borderRadius={8}
                    fallbackSrc="/images/news-default.png"
                  />
                </AspectRatio>
              )}

              <Box
                w="full"
                mt="24px"
                dangerouslySetInnerHTML={{
                  __html: htmlContent
                }}
                className="html-content"
              />
            </Box>
          </Flex>

          {/* <Flex w={{ xs: 'full', lg: '216px' }}>
          <CategoryList />
        </Flex> */}
        </Flex>

        {Array.isArray(newsList) && !!newsList.length && (
          <Flex mt="40px" direction="column" w={{ xs: '100%', lg: '106%' }} ml={{ xs: 0, lg: '-3%' }}>
            <Text textAlign="center" fontWeight={700} fontSize={16} mb="24px">
              Bài viết liên quan
            </Text>

            <Carousel breakpoints={otherNewsBreakpoints} slidesPerView={3} autoplay={false}>
              {newsList
                .filter((i) => i.id !== Number(id))
                .map((item) => {
                  return (
                    <Link
                      href={`/tin-tuc/${item.title}.${item.id}`}
                      key={item.id}
                      style={{ display: 'block', height: '100%' }}
                    >
                      <Box borderRadius={16} bgColor="#FFF" p="12px" h="full" data-group>
                        <AspectRatio ratio={16 / 9} w="full">
                          <Image
                            src={item?.imagesUrl?.[0]?.replace('http://', 'https://')}
                            alt={IMG_ALT}
                            w="full"
                            h="full"
                            fit="cover"
                            borderRadius={8}
                            fallbackSrc="/images/news-default.png"
                          />
                        </AspectRatio>

                        <Flex align="center" justify="space-between" gap="10px" mt="8px">
                          <Flex align="center" gap="8px">
                            <Image src="/images/calendar.png" alt={IMG_ALT} w="20px" h="20px" />
                            <Text fontSize={12}>{dayjs(item.createdDate).format('DD/MM/YYYY')}</Text>
                          </Flex>
                          <Flex align="center" gap="8px">
                            <Image src="/images/eye.png" alt={IMG_ALT} w="20px" h="20px" />
                            <Text fontSize={12}>{item?.view || 0} lượt xem</Text>
                          </Flex>
                        </Flex>

                        <Text
                          fontWeight={700}
                          fontSize={16}
                          mt="8px"
                          noOfLines={3}
                          h="60px"
                          lineHeight="20px"
                          transitionDuration="250ms"
                          _groupHover={{ color: '#00b7e9' }}
                        >
                          {item.title}
                        </Text>
                      </Box>
                    </Link>
                  );
                })}
            </Carousel>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default NewsDetail;
