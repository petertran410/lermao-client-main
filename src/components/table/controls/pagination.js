'use client';

import { useSetParamsURL } from '@/utils/hooks';
import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const Pagination = (props) => {
  const { totalPages, currentPage = 1, onChange } = props;
  const [page, setPage] = useState(currentPage);
  const setParamsURL = useSetParamsURL();

  return (
    <Flex align="center" flexWrap="wrap">
      <Button
        isDisabled={page < 2}
        bgColor="#FFF"
        borderRadius={6}
        minH={0}
        minW={0}
        border="1px solid #FFF"
        mx="2px"
        h="34px"
        w="34px"
        _hover={{ bgColor: '#f2f2f2' }}
        _active={{ bgColor: '#f2f2f2' }}
        onClick={() => {
          const newPage = page - 1;
          setPage(newPage);
          onChange && onChange(newPage);
          setParamsURL({ page: newPage });
        }}
      >
        <Icon as={IoChevronBack} fontSize={16} />
      </Button>
      {Array.from({ length: props.totalPages }, (_, index) => {
        const isActive = page === index + 1;

        return (
          <Button
            key={index}
            borderRadius={6}
            bgColor="#FFF"
            border="1px solid"
            mx="2px"
            borderColor={isActive ? 'green' : '#FFF'}
            minH={0}
            minW={0}
            h={isActive ? '33px' : '35px'}
            w={isActive ? '33px' : '35px'}
            _hover={{ bgColor: '#f2f2f2' }}
            _active={{ bgColor: '#f2f2f2' }}
            onClick={() => {
              const newPage = index + 1;
              setPage(newPage);
              onChange && onChange(newPage);
              setParamsURL({ page: newPage });
            }}
          >
            <Text>{index + 1}</Text>
          </Button>
        );
      })}
      <Button
        isDisabled={page >= totalPages}
        bgColor="#FFF"
        borderRadius={6}
        minH={0}
        minW={0}
        border="1px solid #FFF"
        h="34px"
        mx="2px"
        w="34px"
        _hover={{ bgColor: '#f2f2f2' }}
        _active={{ bgColor: '#f2f2f2' }}
        onClick={() => {
          const newPage = page + 1;
          setPage(newPage);
          onChange && onChange(newPage);
          setParamsURL({ page: newPage });
        }}
      >
        <Icon as={IoChevronForward} fontSize={16} />
      </Button>
    </Flex>
  );
};

export default Pagination;
