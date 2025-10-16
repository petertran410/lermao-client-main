'use client';

import { Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { IoIosAdd } from 'react-icons/io';

const CreateButton = (props) => {
  const { href } = props;

  return (
    <Link href={href}>
      <Flex
        align="center"
        gap={0.5}
        bgColor="green.500"
        py="7px"
        w="110px"
        justify="center"
        borderRadius={5}
        _hover={{ bgColor: 'green.600' }}
        transitionDuration="250ms"
      >
        <Icon as={IoIosAdd} color="#FFF" fontSize={20} />
        <Text color="#FFF">Tạo mới</Text>
      </Flex>
    </Link>
  );
};

export default CreateButton;
