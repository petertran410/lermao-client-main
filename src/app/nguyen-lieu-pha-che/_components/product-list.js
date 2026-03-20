'use client';

import Pagination from '@/components/pagination';
import ProductItem from '@/components/product-item';
import { useQueryProductList } from '@/services/product.service';
import { Box, Grid, GridItem } from '@chakra-ui/react';

const ProductList = () => {
  const { data } = useQueryProductList();
  const { content = [], totalPages, pageable } = data || {};
  const { pageNumber } = pageable || {};

  return (
    <Box>
      <Grid templateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="20px" mb="32px">
        {content?.map((item) => {
          return (
            <GridItem key={item.id}>
              <ProductItem item={item} />
            </GridItem>
          );
        })}
      </Grid>
      <Pagination totalPages={totalPages} currentPage={pageNumber + 1} />
    </Box>
  );
};

export default ProductList;
