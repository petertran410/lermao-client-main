import { API } from '@/utils/API';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { formatCurrency, META_DESCRIPTION } from '@/utils/helper-server';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Breadcrumb from '@/components/breadcrumb';
import Carousel from '@/components/carousel';
import ProductItem from '@/components/product-item';
import { serverFetchJSON } from '@/utils/server-fetch';

export async function generateMetadata({ params }) {
  const { slug } = params;

  let data = {};
  try {
    data = await serverFetchJSON(`/api/product/client/find-by-slug/${slug}`);
  } catch (e) {
    data = {};
  }

  const { title: titleData, imagesUrl, title_meta, general_description } = data || {};
  const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.png';
  const title = title_meta || `${titleData} | Gấu Lermao`;
  const description = general_description || META_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}

const FALLBACK_IMAGE = '/images/lermao.png';

const ProductDetail = async ({ params }) => {
  const { slug } = params;

  let productDetail;
  try {
    productDetail = await API.request({ url: `/api/product/client/find-by-slug/${slug}` });
  } catch (e) {
    productDetail = null;
  }

  if (!productDetail) {
    return (
      <Flex justify="center" align="center" minH="50vh" pt="180px">
        <Text fontSize="xl" color="gray.500">
          Không tìm thấy sản phẩm
        </Text>
      </Flex>
    );
  }

  let relatedProducts = [];
  try {
    if (productDetail.categoryId) {
      const res = await API.request({
        url: '/api/product/client/get-all',
        params: {
          pageSize: 6,
          pageNumber: 0,
          categoryId: productDetail.categoryId,
          excludeProductId: productDetail.id,
          randomize: 'true'
        }
      });
      relatedProducts = res?.content || [];
    }
  } catch (e) {
    relatedProducts = [];
  }

  const {
    title,
    description = '',
    instruction = '',
    imagesUrl,
    price,
    kiotviet_price,
    categoryHierarchy = []
  } = productDetail;

  const displayPrice = price || kiotviet_price;
  const productImage = imagesUrl?.[0]?.replace('http://', 'https://') || FALLBACK_IMAGE;

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản phẩm', href: '/san-pham' },
    ...categoryHierarchy.map((cat) => ({
      title: cat.name,
      href: `/san-pham/${cat.slug}`
    })),
    { title, href: '#', isActive: true }
  ];

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '80px', lg: '180px' }} pb="60px">
      <Breadcrumb data={breadcrumbData} />

      <Flex mt="24px" gap="40px" direction={{ xs: 'column', lg: 'row' }}>
        {/* Hình ảnh */}
        <Flex justify="center" flex={1}>
          <Image
            src={productImage}
            alt={title || IMG_ALT}
            w="auto"
            maxH="400px"
            objectFit="contain"
            borderRadius={16}
            onError={(e) => {
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </Flex>

        {/* Thông tin */}
        <Flex direction="column" flex={1} gap="16px">
          <Text fontSize={{ xs: '24px', lg: '32px' }} fontWeight={700} color="#333">
            {title}
          </Text>

          {displayPrice && displayPrice > 0 ? (
            <Text fontSize="22px" fontWeight={700} color="#1E96BC">
              {formatCurrency(displayPrice)}
            </Text>
          ) : (
            <Text fontSize="18px" fontWeight={600} color="main.1">
              Liên hệ
            </Text>
          )}

          {description && (
            <Box
              mt="16px"
              fontSize="16px"
              lineHeight="1.8"
              color="gray.700"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {instruction && (
            <Box mt="16px">
              <Text fontWeight={700} fontSize="18px" mb="8px">
                Hướng dẫn sử dụng
              </Text>
              <Box
                fontSize="16px"
                lineHeight="1.8"
                color="gray.700"
                dangerouslySetInnerHTML={{ __html: instruction }}
              />
            </Box>
          )}
        </Flex>
      </Flex>

      {/* Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <Box mt="60px">
          <Text fontSize="24px" fontWeight={700} textAlign="center" mb="24px">
            Sản phẩm liên quan
          </Text>
          <Carousel breakpoints={breakpoints} slidesPerView={3}>
            {relatedProducts.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </Carousel>
        </Box>
      )}
    </Flex>
  );
};

export default ProductDetail;
