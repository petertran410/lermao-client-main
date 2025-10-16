import Breadcrumb from '@/components/breadcrumb';
import Carousel from '@/components/carousel';
import ProductItem from '@/components/product-item';
import { API } from '@/utils/API';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL, formatCurrency, META_DESCRIPTION } from '@/utils/helper-server';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';
import AddCart from './_components/add-cart';
import ProductImage from './_components/product-image';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split('.').pop();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product/get-by-id/${id}`);
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

const ProductDetail = async ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const productDetail = await API.request({ url: `/api/product/get-by-id/${id}` });
  const productList = await API.request({ url: '/api/product/search', params: { pageSize: 6, type: 'SAN_PHAM' } }).then(
    (res) => res?.content
  );

  if (!productDetail) {
    return null;
  }

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  const { title, description = '', instruction = '', imagesUrl, price, generalDescription } = productDetail;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    headline: title,
    author: {
      '@type': 'Person',
      name: 'Lermao'
    },
    publisher: {
      '@type': 'Organization',
      name: 'lermao.vn',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lermao.vn/images/logo.png'
      }
    },
    datePublished: '2025-01-03',
    dateModified: '2025-01-03',
    name: title,
    image: imagesUrl || [],
    description: description || '',
    brand: {
      '@type': 'Brand',
      name: 'Lermao'
    },
    sku: id,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/san-pham/${slug}`,
      priceCurrency: 'VND',
      price: price || 0,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Lermao',
        url: process.env.NEXT_PUBLIC_DOMAIN
      }
    },
    additionalType: [
      'https://www.google.com/search?q=g%E1%BA%A5u+lermao',
      'https://www.facebook.com/lermao.sanhannhugau',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    sameAs: [
      'https://www.google.com/search?q=g%E1%BA%A5u+lermao',
      'https://www.facebook.com/lermao.sanhannhugau',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    brand: {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: process.env.NEXT_PUBLIC_DOMAIN,
      '@id': 'Lermao',
      name: 'Lermao',
      address:
        'B-TT10-4 thuộc dự án Him Lam Vạn Phúc, đường Tố Hữu, Phường Vạn Phúc, Quận Hà Đông, Thành phố Hà Nội, Việt Nam',
      telephone: '+84931566676'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      bestRating: '5',
      ratingCount: '50',
      ratingValue: '5'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Kim Dung'
        },
        reviewBody:
          'Tôi vô cùng ấn tượng với sản phẩm Khoai Môn tươi Nghiền thuộc Dòng Sản phẩm Đông lạnh của Thương hiệu Gấu LerMao. Với vị ngọt, béo, ngậy, mình cảm thấy rất phù hợp với các món trà sữa, và tôi tin sẽ trở thành xu hướng mới trong mùa thu đông năm nay'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Thùy Linh'
        },
        reviewBody:
          'Sản phẩm của thương hiệu Gấu LerMao vô cùng đa dạng, với các khẩu vị vô cùng mới lạ, tươi ngon, đặc biệt hấp dẫn”. Hiện nay thị trường Việt Nam có rất nhiều sản phẩm, tuy nhiên để được đa dạng và chất lượng như sản phẩm của công ty HI SWEETIE VIỆT NAM hiếm bên nào có thể làm được'
      }
    ]
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/san-pham/${slug}`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Script
        id="json-ld-san-pham"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Flex direction="column" px={PX_ALL} pt={{ xs: '20px', md: '40px' }}>
        <Box display={{ xs: 'none', lg: 'block' }}>
          <Breadcrumb
            data={[
              { title: 'Danh sách sản phẩm', href: '/san-pham' },
              { title, href: `/san-pham/${convertSlugURL(title)}.${id}`, isActive: true }
            ]}
          />
          <Box h="1px" w="full" bgColor="#E1E2E3" mt="12px" mb={{ xs: '20px', md: '42px' }} />
        </Box>

        <Flex align="flex-start" gap={{ xs: 0, lg: 2 }} justify="space-between" direction={{ xs: 'column', lg: 'row' }}>
          <Box>
            <Text as="h1" fontSize={32} fontWeight={800} textTransform="uppercase">
              {title}
            </Text>
            {!!price && (
              <Text mt="8px" fontWeight={700} fontSize={24} color="#EA1D21">
                {formatCurrency(price)}
              </Text>
            )}
          </Box>

          <Flex mt={{ xs: '24px', lg: 0 }}>
            <AddCart productId={id} price={price} title={title} />
          </Flex>
        </Flex>

        <Flex
          mt="40px"
          align="flex-start"
          bgColor="#FFF"
          borderRadius={16}
          boxShadow="0px 4px 24px 0px #0000000D"
          p={{ xs: '15px', md: '32px' }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <Flex flex={{ xs: 'none', md: 2 / 7 }} align="center" justify="center" direction="column">
            <ProductImage imagesUrl={imagesUrl} />
          </Flex>

          <Flex
            flex={{ xs: 'none', md: 3 / 7 }}
            mr={{ xs: 0, md: '12px', lg: '24px' }}
            ml={{ xs: 0, md: '24px', lg: '48px' }}
            pos="relative"
          >
            <Image
              src="/images/product-description.png"
              alt={IMG_ALT}
              w="full"
              h={{ xs: '300px', md: '50%' }}
              fit="contain"
            />
            <Box
              p={{ xs: '24px', md: '18px', lg: '24px' }}
              mt={{ xs: '30px', md: 0 }}
              pos="absolute"
              top={0}
              left={0}
              w="full"
              h="full"
            >
              <Text fontWeight={700} fontSize={16}>
                Mô tả chung:
              </Text>
              <Text
                mt={{ xs: '16px', md: '8px', lg: '16px' }}
                fontWeight={400}
                fontSize={14}
                noOfLines={{ xs: 6, md: 4, lg: 6, '2xl': 10 }}
              >
                {generalDescription}
              </Text>
            </Box>
          </Flex>

          <Flex flex={2 / 7} display={{ xs: 'none', md: 'flex' }}>
            <Image
              src="/images/lermao.png"
              alt={IMG_ALT}
              w="80%"
              h={{ xs: '380px', md: '220px', lg: '380px' }}
              fit="contain"
            />
          </Flex>
        </Flex>

        <Flex
          mt="24px"
          p="20px"
          borderRadius={16}
          bgColor="#77D0E8"
          gap={{ xs: '16px', md: '32px' }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <Flex flex={1} direction="column" gap="10px" pb={{ xs: 0, md: '24px' }}>
            <Flex align="center" gap="8px">
              <Image src="/images/material.png" alt={IMG_ALT} w="24px" h="24px" />
              <Text fontSize={16} fontWeight={700} _hover={{ color: 'text.1' }}>
                Thành phần nguyên liệu
              </Text>
            </Flex>

            <Box
              dangerouslySetInnerHTML={{
                __html: description
              }}
            />
          </Flex>

          <Box h="auto" w="1px" bgColor="#5FA6BA" />

          <Flex flex={1} direction="column" gap="10px" pb="24px">
            <Flex align="center" gap="8px">
              <Image src="/images/instruction.png" alt={IMG_ALT} w="24px" h="24px" />
              <Text fontSize={16} fontWeight={700} _hover={{ color: 'text.1' }}>
                Hướng dẫn sử dụng
              </Text>
            </Flex>

            <Box
              dangerouslySetInnerHTML={{
                __html: instruction
              }}
            />
          </Flex>
        </Flex>

        {Array.isArray(productList) && !!productList.length && (
          <Flex mt="56px" direction="column">
            <Text as="h2" textAlign="center" fontWeight={700} fontSize={20}>
              Sản phẩm liên quan
            </Text>

            <Box mt="24px">
              <Carousel breakpoints={breakpoints} slidesPerView={3}>
                {productList
                  .filter((i) => i.id !== Number(id))
                  .map((item) => {
                    return <ProductItem key={item.id} item={item} />;
                  })}
              </Carousel>
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ProductDetail;
