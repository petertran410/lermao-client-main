'use client';

import { IMG_ALT } from '@/utils/const';
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';

const RecipeItem = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, imagesUrl, description, instruction, recipeThumbnail } = item || {};

  const image = recipeThumbnail
    ? recipeThumbnail?.replace('http://', 'https://')
    : imagesUrl?.[0]?.replace('http://', 'https://');

  return (
    <>
      <AspectRatio w="full" ratio={16 / 9}>
        <Image w="full" h="full" src={image || '/images/recipe.png'} alt={IMG_ALT} fit="cover" borderRadius={12} />
      </AspectRatio>
      <Text fontSize={16} fontWeight={700} mt="16px" textAlign="center">
        {title}
      </Text>

      <Button
        mt="16px"
        bgColor="transparent"
        color="#00b7e9"
        w="full"
        h="40px"
        gap="4px"
        fontSize={16}
        borderRadius={8}
        fontWeight={700}
        border="1px solid #00b7e9"
        _hover={{ bgColor: 'transparent', opacity: 0.8 }}
        _active={{ bgColor: 'transparent', opacity: 0.8 }}
        onClick={onOpen}
      >
        Xem công thức
        <Image src="/images/arrow-right.png" alt={IMG_ALT} w="24px" h="24px" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={{ xs: 'lg', md: '4xl', lg: '6xl' }} isCentered autoFocus={false}>
        <ModalOverlay />
        <ModalContent p={0} borderRadius={16} overflow="hidden">
          <ModalBody p={0}>
            <Grid templateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}>
              <GridItem colSpan={1}>
                <Image
                  w="full"
                  h="full"
                  minH={{ xs: '15vh', md: '40vh', lg: '60vh' }}
                  src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/recipe.png'}
                  alt={IMG_ALT}
                  fit="cover"
                  display={{ xs: 'none', md: 'block' }}
                />
              </GridItem>
              <GridItem colSpan={2} px="24px" py="16px">
                <Flex align="flex-start" gap="16px" justify="space-between">
                  <Text fontWeight={700} fontSize={24}>
                    {title}
                  </Text>

                  <button type="button" onClick={onClose}>
                    <Image
                      src="/images/close.png"
                      alt={IMG_ALT}
                      w="32px"
                      h="32px"
                      transitionDuration="250ms"
                      _hover={{ opacity: 0.8 }}
                    />
                  </button>
                </Flex>

                <Box w="full" h="1px" bgColor="#E1E2E3" mt="18px" />

                <Box maxH="60vh" overflowY="auto" overflowX="hidden" className="small-scrollbar">
                  <Box mt="24px">
                    <Text fontSize={16} fontWeight={700}>
                      Nguyên liệu
                    </Text>
                    <Box
                      mt="16px"
                      className="html-content"
                      dangerouslySetInnerHTML={{
                        __html: description
                      }}
                    />
                  </Box>

                  <Box mt="24px">
                    <Text fontSize={16} fontWeight={700}>
                      Hướng dẫn chi tiết
                    </Text>
                    <Box
                      mt="16px"
                      className="html-content"
                      dangerouslySetInnerHTML={{
                        __html: instruction
                      }}
                    />
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipeItem;
