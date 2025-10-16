'use client';

import { FILTER_OPTIONS } from '@/services/product.service';
import { IMG_ALT } from '@/utils/const';
import { useParamsURL } from '@/utils/hooks';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

const ProductFilter = () => {
  const [paramsURL, setParamsURL] = useParamsURL();
  const { keyword, sort } = paramsURL;
  const [keywordText, setKeywordText] = useState(keyword);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const currentSort = useMemo(() => {
    if (!sort) {
      return undefined;
    }
    return FILTER_OPTIONS.find((i) => i.value === sort);
  }, [sort]);

  useEffect(() => {
    if (typeof keyword !== 'undefined') {
      setKeywordText(keyword);
    }
  }, [keyword]);

  return (
    <Flex gap={{ xs: '20px', md: '8px' }} align="center" direction="column" w="full">
      <Grid templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} w="full" gap={{ xs: '20px', lg: '20px' }}>
        <GridItem colSpan={1}>
          <Flex w="full">
            <Popover matchWidth onClose={onClose} isOpen={isOpen}>
              <PopoverTrigger>
                <Button
                  w="full"
                  h="40px"
                  justifyContent="space-between"
                  bgColor="#FFF"
                  fontSize={14}
                  fontWeight={400}
                  color={currentSort ? 'text.1' : '#888D90'}
                  border="1px solid #C3C6C7"
                  _hover={{ bgColor: '#FFF', color: 'text.1' }}
                  _active={{ bgColor: '#FFF' }}
                  onClick={onOpen}
                >
                  {currentSort ? currentSort.label : 'Bộ lọc tìm kiếm'}
                  <Image
                    src={isOpen ? '/images/chevron-up.png' : '/images/chevron-down.png'}
                    w="24px"
                    h="24px"
                    alt={IMG_ALT}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent borderRadius={8} bgColor="#FFF" p={0} w="full">
                <PopoverBody p="0px">
                  <Flex direction="column" cursor="pointer">
                    {FILTER_OPTIONS.map((item, index) => {
                      const { value, label } = item;

                      return (
                        <Flex
                          key={value}
                          h="44px"
                          px="12px"
                          align="center"
                          data-group
                          borderBottom={index === FILTER_OPTIONS.length - 1 ? 'none' : '1px solid #C3C6C7'}
                          onClick={() => {
                            onClose();
                            setParamsURL({ sort: value });
                          }}
                        >
                          <Text color="#52525B" transitionDuration="200ms" _groupHover={{ color: '#000' }}>
                            {label}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </GridItem>

        <GridItem colSpan={{ xs: 1, lg: 2 }} pl={{ xs: '0px', lg: '60px' }}>
          <Flex w="full" gap="8px">
            <Box pos="relative" w="full">
              <Input
                placeholder="Nhập từ khoá"
                borderColor="#C3C6C7"
                bgColor="#FFF"
                h="40px"
                w="full"
                pr={10}
                fontWeight={400}
                color="text.1"
                _hover={{ color: 'text.1' }}
                _placeholder={{ color: '#888D90' }}
                value={keywordText}
                onChange={(e) => setKeywordText(e.target.value)}
              />

              <Image
                src="/images/search.png"
                alt={IMG_ALT}
                w="24px"
                h="24px"
                pos="absolute"
                right={2}
                top={2.5}
                zIndex={5}
              />
            </Box>

            <Button
              bgColor="#00b7e9"
              color="#FFF"
              w="110px"
              h="40px"
              fontSize={16}
              borderRadius={8}
              fontWeight={700}
              _hover={{ opacity: 0.8, color: '#FFFFFF' }}
              _active={{ opacity: 0.8, color: '#FFF' }}
              onClick={() => setParamsURL({ keyword: keywordText?.trim() })}
            >
              Tìm kiếm
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default ProductFilter;
