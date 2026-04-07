import { IMG_ALT } from '@/utils/const';
import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { FiHome } from 'react-icons/fi';

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
                fontWeight={600}
                fontSize="16px"
                color={isActive ? 'main.1' : 'gray.500'}
                _hover={{ color: 'main.1' }}
                transition="color 0.2s"
                noOfLines={1}
              >
                {index === 0 && <Icon as={FiHome} boxSize="15px" mr="4px" mb="-2px" />}
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
