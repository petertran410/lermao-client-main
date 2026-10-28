// Chỉ giữ các field mà client component thật sự dùng.
// Props truyền vào client component bị Next.js serialize nguyên vào HTML (self.__next_f),
// nên field thừa (instruction_en, description_en, pos, kiotViet...) sẽ lộ ra cho Google đọc.

const CARD_FIELDS = [
  'id',
  'title',
  'slug',
  'imagesUrl',
  'posName',
  'posImages',
  'kiotviet_name',
  'kiotviet_images',
  'kiotviet_price',
  'price',
  'price_on',
  'general_description',
  'categoryId',
  'category_id'
];

const DETAIL_FIELDS = [...CARD_FIELDS, 'description', 'instruction', 'rate', 'categoryHierarchy'];

const pick = (obj, fields) => {
  const out = {};
  for (const key of fields) {
    if (obj[key] !== undefined) out[key] = obj[key];
  }
  return out;
};

const pickCategory = (category) =>
  category && typeof category === 'object'
    ? { id: category.id ?? null, name: category.name ?? null, slug: category.slug ?? null }
    : null;

export const pickProductCard = (product) => {
  if (!product || typeof product !== 'object') return product;
  return { ...pick(product, CARD_FIELDS), category: pickCategory(product.category) };
};

export const pickProductDetail = (product) => {
  if (!product || typeof product !== 'object') return product;
  const images = product.kiotViet?.images;
  return {
    ...pick(product, DETAIL_FIELDS),
    category: pickCategory(product.category),
    kiotViet: Array.isArray(images) ? { images } : null
  };
};
