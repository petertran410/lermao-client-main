import { Flex, Text } from '@chakra-ui/react';

const EmptyScreen = () => {
  return (
    <Flex direction="column" justify="center" align="center" gap={4}>
      <Text fontSize={15} fontWeight={500}>
        Chưa có dữ liệu!
      </Text>
    </Flex>
  );
};

export default EmptyScreen;
