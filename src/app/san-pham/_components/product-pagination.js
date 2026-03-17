'use client';

import { HStack, Button, Text, Icon, Box } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <HStack spacing={2}>
        <Button
          leftIcon={<Icon as={FiChevronLeft} />}
          variant="outline"
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          borderColor="main.1"
          color="main.1"
          _hover={{ bg: 'main.1', color: 'white' }}
        >
          Trước
        </Button>

        {pageNumbers[0] > 1 && (
          <>
            <Button size="sm" variant="outline" onClick={() => onPageChange(1)}>
              1
            </Button>
            {pageNumbers[0] > 2 && (
              <Text color="gray.500" px={2}>
                ...
              </Text>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? 'solid' : 'outline'}
            bg={currentPage === page ? 'main.1' : 'white'}
            borderColor="main.1"
            color={currentPage === page ? 'white' : 'main.1'}
            _hover={{
              bg: currentPage === page ? 'main.1' : 'gray.100'
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <Text color="gray.500" px={2}>
                ...
              </Text>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPageChange(totalPages)}
              borderColor="main.1"
              color="main.1"
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          rightIcon={<Icon as={FiChevronRight} />}
          variant="outline"
          size="sm"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          borderColor="main.1"
          color="main.1"
          _hover={{ bg: 'main.1', color: 'white' }}
        >
          Sau
        </Button>
      </HStack>
    </Box>
  );
};

export default ProductPagination;
