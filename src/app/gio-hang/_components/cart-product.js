'use client';

import { useMutateOrder } from '@/services/contact.service';
import { useQueryProductByIds } from '@/services/product.service';
import { cartAtom } from '@/states/common';
import { IMG_ALT } from '@/utils/const';
import { getInlineHTML, showToast } from '@/utils/helper';
import { convertSlugURL, formatCurrency } from '@/utils/helper-server';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import DeleteCart from './delete-cart';

const CartProduct = () => {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const [cart, setCart] = useRecoilState(cartAtom);
  const { mutateAsync: submitOrderMutate, isPending } = useMutateOrder();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const router = useRouter();

  const { data: cartQuery = [], isLoading } = useQueryProductByIds(cart?.map((i) => i.id));
  const cartData = cartQuery?.filter((cQ) => cart.map((i) => Number(i.id)).includes(Number(cQ.id)));

  const onClose = () => {
    onCloseModal();
    setEmail('');
    setPhone('');
    setFullName('');
  };

  const onSubmit = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPhone = /^(03|05|07|08|09)\d{7,10}$/;

    if (!regexPhone.test(phone.trim())) {
      showToast({
        status: 'error',
        content: 'Số điện thoại không hợp lệ'
      });
      return;
    }

    if (!regexEmail.test(email.trim())) {
      showToast({
        status: 'error',
        content: 'Email không hợp lệ'
      });
      return;
    }

    const data = {
      email: email.trim(),
      phoneNumber: phone.trim(),
      receiverFullName: fullName?.trim(),
      products: cartData?.map((i) => ({ productId: i.id, quantity: 1 })),
      htmlContent: getInlineHTML(cartData)
    };

    submitOrderMutate(data)
      .then(() => {
        showToast({
          status: 'success',
          content: 'Gửi thông tin thành công!'
        });
        setCart([]);
        router.push('/');
        onClose();
      })
      .catch(() => {
        showToast({
          status: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
        });
      });
  };

  if (isLoading) {
    return null;
  }

  return (
    <Box id="cart-html">
      <Grid templateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="18px">
        {cartData?.map((item) => {
          const { title, id, price, imagesUrl } = item;

          return (
            <GridItem key={id}>
              <Flex p="16px" bgColor="#FFF" gap="16px" borderRadius={8} boxShadow="0px 4px 24px 0px #0000000D">
                <Link href={`/nguyen-lieu-pha-che/${convertSlugURL(title)}.${id}`} target="_blank">
                  <Image src={imagesUrl?.[0]?.replace('http://', 'https://')} alt={IMG_ALT} h="100px" w="auto" />
                </Link>

                <Flex flex={1} direction="column" gap="8px" borderLeft="1px solid #E1E2E3" pl="16px">
                  <Flex align="flex-start" gap="16px">
                    <Link
                      href={`/nguyen-lieu-pha-che/${convertSlugURL(title)}.${id}`}
                      target="_blank"
                      style={{ display: 'flex', flex: 1 }}
                    >
                      <Text fontWeight={700} fontSize={16} noOfLines={2} flex={1}>
                        {title}
                      </Text>
                    </Link>
                    <Tooltip label="Xoá sản phẩm">
                      <div>
                        <button
                          type="button"
                          onClick={() => setCart((prev) => prev.filter((i) => Number(i.id) !== Number(id)))}
                        >
                          <Image
                            src="/images/trash.png"
                            alt={IMG_ALT}
                            w="24px"
                            h="24px"
                            transitionDuration="250ms"
                            _hover={{ opacity: 0.8 }}
                          />
                        </button>
                      </div>
                    </Tooltip>
                  </Flex>
                  <Text color="#EA1D21">{price ? formatCurrency(price) : 'Liên hệ'}</Text>
                </Flex>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>

      <Box w="full" h="1px" bgColor="#E1E2E3" mt="32px" mb="16px" />

      <Flex align="center" justify="space-between" direction={{ xs: 'column', md: 'row' }}>
        <Link href="/nguyen-lieu-pha-che">
          <Flex
            align="center"
            justify="center"
            bgColor="transparent"
            color="#00b7e9"
            w="168px"
            h="40px"
            gap="4px"
            mx={{ xs: 'auto', md: 'initial' }}
            fontSize={16}
            borderRadius={8}
            border="1px solid #00b7e9"
            fontWeight={700}
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.8 }}
          >
            Thêm sản phẩm
          </Flex>
        </Link>

        <Flex align="center" gap="8px" direction={{ xs: 'column', md: 'row' }} mt={{ xs: '12px', md: 0 }}>
          <DeleteCart />

          <Button
            mt={{ xs: '6px', md: 0 }}
            bgColor="#00b7e9"
            color="#FFF"
            w="150px"
            h="40px"
            gap="4px"
            mx={{ xs: 'auto', md: 'initial' }}
            fontSize={16}
            borderRadius={8}
            fontWeight={700}
            _hover={{ opacity: 0.8, color: '#FFF' }}
            _active={{ opacity: 0.8, color: '#FFF' }}
            onClick={onOpen}
          >
            Liên hệ tư vấn
          </Button>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent borderRadius={16}>
          <ModalHeader>
            <Flex justify="space-between" align="flex-start">
              <Text fontWeight={700} fontSize={20}>
                Liên hệ tư vấn
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
          </ModalHeader>
          <Divider />
          <ModalBody p="24px">
            <Flex direction="column" gap="24px">
              <Flex align="center" gap="8px">
                <Text fontWeight={500}>Sản phẩm đã chọn:</Text>
                <Text fontWeight={500} color="#EA1D21">
                  {cart?.length} sản phẩm
                </Text>
              </Flex>
              <Flex direction="column" gap="8px">
                <Text fontWeight={500}>Họ và tên</Text>
                <Input
                  placeholder="Nhập họ và tên"
                  h="40px"
                  _placeholder={{ color: '#888D90' }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Flex>
              <Flex direction="column" gap="8px">
                <Text fontWeight={500}>
                  Số điện thoại{' '}
                  <Text as="span" color="red">
                    *
                  </Text>
                </Text>
                <Input
                  placeholder="Nhập số điện thoại"
                  h="40px"
                  _placeholder={{ color: '#888D90' }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Flex>
              <Flex direction="column" gap="8px">
                <Text fontWeight={500}>
                  Email{' '}
                  <Text as="span" color="red">
                    *
                  </Text>
                </Text>
                <Input
                  placeholder="Nhập email"
                  h="40px"
                  _placeholder={{ color: '#888D90' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Flex>
            </Flex>
          </ModalBody>
          <Divider />
          <ModalFooter justifyContent="center" gap="8px">
            <Button
              bgColor="transparent"
              color="#00b7e9"
              w="66px"
              h="40px"
              gap="4px"
              mx={{ xs: 'auto', md: 'initial' }}
              fontSize={16}
              borderRadius={8}
              fontWeight={700}
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.8 }}
              onClick={onClose}
            >
              Huỷ
            </Button>

            <Button
              bgColor="#00b7e9"
              color="#FFF"
              w="60px"
              h="40px"
              gap="4px"
              mx={{ xs: 'auto', md: 'initial' }}
              fontSize={16}
              borderRadius={8}
              fontWeight={700}
              _hover={{ opacity: 0.8, color: '#FFF' }}
              _active={{ opacity: 0.8, color: '#FFF' }}
              isDisabled={!email.trim() || !phone.trim()}
              isLoading={isPending}
              onClick={onSubmit}
            >
              Gửi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CartProduct;
