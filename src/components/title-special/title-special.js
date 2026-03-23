import { Text } from '@chakra-ui/react';

const TitleSpecial = (props) => {
  return (
    <Text
      as="h1"
      fontFamily="'SFProDisplayMedium', sans-serif"
      fontSize={props.fontSize || 32}
      fontWeight={props.fontWeight}
      color={props.color}
      lineHeight={props.lineHeight || '44px'}
      _hover={props._hover || { color: 'text.1' }}
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default TitleSpecial;
