'use client';

import { cartAtom } from '@/states/common';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';

const DeleteCart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setCart = useSetRecoilState(cartAtom);

  return (
    <>
      <Button
        bgColor="transparent"
        color="#00b7e9"
        w="116px"
        h="40px"
        gap="4px"
        mx={{ xs: 'auto', md: 'initial' }}
        fontSize={16}
        borderRadius={8}
        fontWeight={700}
        _hover={{ opacity: 0.8 }}
        _active={{ opacity: 0.8 }}
        onClick={onOpen}
      >
        Xoá tất cả
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose} autoFocus={false}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xác nhận xoá
            </AlertDialogHeader>

            <AlertDialogBody>Bạn có chắc chắn xoá tất cả sản phẩm khỏi giỏ hàng không?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Huỷ</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  setCart([]);
                }}
                ml={3}
              >
                Xoá
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCart;
