import { Flex, Text } from '@chakra-ui/react';

const FormLabel = (props) => {
  const { title, required } = props;

  return (
    <Flex mb={1} align="center" gap={2}>
      <Text fontSize={13} fontWeight={500}>
        {title}
      </Text>

      {!!required && (
        <Text as="span" fontSize={15} color="red">
          *
        </Text>
      )}
    </Flex>
  );
};

export default FormLabel;
