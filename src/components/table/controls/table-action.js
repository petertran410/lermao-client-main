'use client';

import { useMutateDeleteProductCMS } from '@/services/product.service';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Icon,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';

const TableAction = (props) => {
  const { item, detailHref = '/', editHref = '/' } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: deleteMutate, isPending: loadingDelete } = useMutateDeleteProductCMS();

  const onDelete = () => {
    deleteMutate(item.id);
    onClose();
  };

  return (
    <Flex align="center" gap={3}>
      <Tooltip label="Chi tiết" placement="top">
        <Box>
          <Link href={detailHref}>
            <Flex
              align="center"
              justify="center"
              w={9}
              h={9}
              borderRadius={6}
              bgColor="green.500"
              _hover={{ bgColor: 'green.600' }}
              transitionDuration="250ms"
            >
              <Icon as={FaEye} fontSize={15} color="#FFF" />
            </Flex>
          </Link>
        </Box>
      </Tooltip>

      <Tooltip label="Chỉnh sửa" placement="top">
        <Box>
          <Link href={editHref}>
            <Flex
              align="center"
              justify="center"
              w={9}
              h={9}
              borderRadius={6}
              bgColor="green.500"
              _hover={{ bgColor: 'green.600' }}
              transitionDuration="250ms"
            >
              <Icon as={FaEdit} fontSize={15} color="#FFF" />
            </Flex>
          </Link>
        </Box>
      </Tooltip>

      <Tooltip label="Xoá" placement="top">
        <Box>
          <button type="button" onClick={onOpen}>
            <Flex
              align="center"
              justify="center"
              w={9}
              h={9}
              borderRadius={6}
              bgColor="green.500"
              _hover={{ bgColor: 'red.600' }}
              transitionDuration="250ms"
            >
              <Icon as={FaTrashAlt} fontSize={13} color="#FFF" />
            </Flex>
          </button>
        </Box>
      </Tooltip>

      <AlertDialog isOpen={isOpen} onClose={onClose} autoFocus={false}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xác nhận xoá
            </AlertDialogHeader>

            <AlertDialogBody>Bạn có chắc chắn muốn xoá thông tin này?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Huỷ</Button>
              <Button colorScheme="red" isLoading={loadingDelete} onClick={onDelete} ml={3}>
                Xoá
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default TableAction;
