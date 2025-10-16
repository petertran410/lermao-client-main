import { Image } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <>
      <Image
        src="/images/404-mobile.png"
        display={{ xs: 'block', md: 'none' }}
        w="full"
        h="100vh"
        fit="cover"
        alt="404"
      />
      <Image src="/images/404.png" display={{ xs: 'none', md: 'block' }} w="full" h="100vh" fit="cover" alt="404" />
    </>
  );
};

export default NotFound;
