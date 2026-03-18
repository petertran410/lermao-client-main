export const convertSlugURL = (text) => {
  if (!text) {
    return '';
  }
  let slug = text.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  slug = slug.replace(/ /gi, '-');
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  slug = slug.replace(/\\/gi, '-');
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};

export const formatCurrency = (price = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(Number(price));

const META_TITLE = 'Gấu Lermao | Giải pháp pha chế toàn diện số 1 tại Việt Nam';
export const META_DESCRIPTION =
  'Gấu LerMao tự hào là thương hiệu dẫn đầu trong hoạt động cung cấp nguyên liệu pha chế toàn diện, sẵn sàng đồng hành cùng các chủ doanh nghiệp kinh doanh ngành F&B, coffee, trà sữa và đồ uống trên toàn quốc. Với sứ mệnh mang đến những sản phẩm chất lượng vượt trội,  Gấu LerMao luôn cam kết cung cấp nguồn nguyên liệu tươi ngon, đa dạng và an toàn nhất. Chúng tôi không chỉ đáp ứng nhu cầu sáng tạo của các nhà pha chế, mà còn mang đến giải pháp toàn diện cho các doanh nghiệp, nâng tầm mọi thức uống trong menu, chinh phục khẩu vị khách hàng của bạn một cách trọn vẹn.';
const META_IMAGE = '/images/preview.png';
export const META_KEYWORDS = [
  'Gấu LerMao',
  'giải pháp pha chế toàn diện',
  'nguyên liệu pha chế',
  'nguyên liệu pha chế F&B',
  'nguyên liệu pha chế coffee',
  'nguyên liệu pha chế trà sữa',
  'nguyên liệu pha chế đồ uống',
  'thương hiệu pha chế',
  'nguyên liệu tươi ngon',
  'nguyên liệu an toàn',
  'nguyên liệu chất lượng',
  'sản phẩm pha chế',
  'giải pháp pha chế cho doanh nghiệp',
  'doanh nghiệp F&B',
  'doanh nghiệp coffee',
  'doanh nghiệp trà sữa',
  'doanh nghiệp đồ uống',
  'menu đồ uống',
  'khẩu vị khách hàng',
  'tạo ra thức uống đặc biệt',
  'tạo sáng tạo pha chế',
  'ngành F&B Việt Nam',
  'cung cấp nguyên liệu pha chế',
  'pha chế chuyên nghiệp',
  'pha chế đồ uống sáng tạo',
  'cung cấp nguyên liệu chất lượng',
  'sản phẩm pha chế Gấu LerMao',
  'thức uống sáng tạo',
  'doanh nghiệp pha chế tại Việt Nam',
  'nguyên liệu pha chế uy tín'
];
const META_URL = 'https://lermao.vn';
const META_SITENAME = 'Gấu Lermao | Giải pháp pha chế toàn diện số 1 tại Việt Nam';
const META_TYPE = 'website';

export const getMetadata = (data) => {
  const {
    title = META_TITLE,
    description = META_DESCRIPTION,
    keywords = META_KEYWORDS,
    url = META_URL,
    siteName = META_SITENAME,
    type = META_TYPE
  } = data || {};

  return {
    title,
    description,
    keywords,
    url,
    type,
    images: [META_IMAGE],
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [META_IMAGE],
      type
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [META_IMAGE]
    }
  };
};
