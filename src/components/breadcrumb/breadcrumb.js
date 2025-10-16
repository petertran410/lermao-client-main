import { IMG_ALT } from '@/utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Fragment } from 'react';

const Breadcrumb = (props) => {
  const { data } = props;

  return (
    <Flex align="center">
      {data.map((item, index) => {
        const { title, href, isActive } = item;

        return (
          <Fragment key={href}>
            <Link href={href}>
              <Text
                fontWeight={isActive ? 600 : 400}
                fontSize={isActive ? 13 : 12}
                color={isActive ? '#5FA6BA' : '#6A7074'}
              >
                {title}
              </Text>
            </Link>
            {index !== data.length - 1 && <Image src="/images/caret-right-blue.png" alt={IMG_ALT} w="24px" h="24px" />}
          </Fragment>
        );
      })}
    </Flex>
  );
};

export default Breadcrumb;
