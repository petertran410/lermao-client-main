'use client';

import { LoadingScreen } from '@/components/effect-screen';
import Pagination from '@/components/pagination';
import TitleSpecial from '@/components/title-special';
import { useQueryRecipeList } from '@/services/recipe.service';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { useParamsURL } from '@/utils/hooks';
import { Button, Flex, Grid, GridItem, Image, Input, Text } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import RecipeItem from './recipe-item';

const RecipeList = () => {
  const { data: dataQuery, isLoading } = useQueryRecipeList();
  const { content = [], totalPages, pageable } = dataQuery || {};
  const { pageNumber = 0 } = pageable || {};
  const [paramsURL, setParamsURL] = useParamsURL();
  const { keyword } = paramsURL;
  const [keywordText, setKeywordText] = useState('');

  useEffect(() => {
    if (keyword) {
      setKeywordText(keyword);
    }
  }, [keyword]);

  return (
    <Flex direction="column" px={PX_ALL} pt="40px" gap="32px" zIndex={10} pos="relative">
      <TitleSpecial fontSize={{ xs: 28, lg: 30, '2xl': 32 }} textAlign="center">
        Công thức đồ uống bí mật
      </TitleSpecial>

      <Flex align="center" mt="40px" gap="8px">
        <Flex flex={1} pos="relative">
          <Input
            borderRadius={8}
            bgColor="#FFF"
            placeholder="Nhập từ khoá"
            borderColor="#C3C6C7"
            h="40px"
            color="text.1"
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
          _hover={{ opacity: 0.8 }}
          _active={{ opacity: 0.8 }}
        >
          Tìm kiếm
        </Button>
      </Flex>

      {isLoading && (
        <Flex mt="40px" justify="center">
          <LoadingScreen />
        </Flex>
      )}

      {!isLoading && Array.isArray(content) && !!content.length && (
        <>
          <Grid templateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="20px">
            {content.map((item) => {
              return (
                <GridItem
                  key={item.id}
                  bgColor="#FFF"
                  borderRadius={12}
                  p="12px"
                  boxShadow="0px 4px 24px 0px #0000000D"
                >
                  <RecipeItem item={item} />
                </GridItem>
              );
            })}
          </Grid>
          <Pagination totalPages={totalPages} currentPage={pageNumber + 1} />
        </>
      )}

      {!isLoading && (!Array.isArray(content) || !content.length) && (
        <Text textAlign="center" mt="40px">
          Không có dữ liệu
        </Text>
      )}
    </Flex>
  );
};

const RecipeWrapper = () => {
  return (
    <Suspense>
      <RecipeList />
    </Suspense>
  );
};

export default RecipeWrapper;
