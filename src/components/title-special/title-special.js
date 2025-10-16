import { Text } from '@chakra-ui/react';
// import { Dela_Gothic_One } from 'next/font/google';
import localFont from 'next/font/local';

const fontDela = localFont({ src: './DelaGothicOne.ttf' });
// const fontDela = Dela_Gothic_One({ subsets: ['latin', 'vietnamese'], weight: '400' });

const TitleSpecial = (props) => {
  return (
    <Text
      as="h1"
      className={fontDela.className}
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
