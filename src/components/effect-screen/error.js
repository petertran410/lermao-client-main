import { Flex, Text } from '@chakra-ui/react';

const ErrorScreen = ({ message }) => {
  return (
    <Flex direction="column" justify="center" align="center" gap={4}>
      <Text color="red" fontSize={15} fontWeight={500}>
        Đã có lỗi xảy ra!
      </Text>
      <Text>{message}</Text>
    </Flex>
  );
};

export default ErrorScreen;
