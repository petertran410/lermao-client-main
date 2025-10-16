'use client';

import { Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';

const BackButton = (props) => {
  const { href } = props;

  return (
    <Link href={href}>
      <Flex
        align="center"
        gap={0.5}
        bgColor="gray.50"
        py="6px"
        w="85px"
        justify="center"
        borderRadius={5}
        _hover={{ bgColor: 'gray.100' }}
        transitionDuration="250ms"
        border="1px solid #e6e6e6"
      >
        <Icon as={IoChevronBack} color="#828282" fontSize={14} />
        <Text color="#828282" fontSize={13}>
          Trở về
        </Text>
      </Flex>
    </Link>
  );
};

export default BackButton;
