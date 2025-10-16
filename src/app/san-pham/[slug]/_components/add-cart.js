'use client';

import { useMutateContact } from '@/services/contact.service';
import { cartAtom } from '@/states/common';
import { IMG_ALT } from '@/utils/const';
import { showToast } from '@/utils/helper';
import {
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const AddCart = ({ productId, price, title }) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const isExists = cart?.map((i) => i.id)?.includes(productId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const { mutateAsync: submitContactMutate, isPending } = useMutateContact();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  const onAddCart = () => {
    setCart([...cart, { id: productId, quantity: 1 }]);
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

    const data = { email: email.trim(), phoneNumber: phone.trim(), note: title, receiverFullName: fullName.trim() };

    submitContactMutate(data)
      .then(() => {
        showToast({
          status: 'success',
          content: 'Gửi thông tin thành công!'
        });
        onClose();
      })
      .catch(() => {
        showToast({
          status: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
        });
      });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!price) {
    return (
      <>
        <Button
          fontSize={16}
          fontWeight={700}
          color="#FFF"
          gap="4px"
          borderRadius={8}
          w="180px"
          h="40px"
          bgColor="#00b7e9"
          _hover={{ color: '#FFF', opacity: 0.8 }}
          _active={{ color: '#FFF', opacity: 0.8 }}
          _disabled={{ bgColor: '#CCC' }}
          onClick={onOpen}
        >
          <Image src="/images/add-white.png" w="24px" h="24px" alt={IMG_ALT} />
          Liên hệ tư vấn
        </Button>

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
                _hover={{ color: '#FFF', opacity: 0.8 }}
                _active={{ color: '#FFF', opacity: 0.8 }}
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
                isLoading={isPending}
                isDisabled={!email.trim() || !phone.trim()}
                onClick={onSubmit}
              >
                Gửi
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Button
      isDisabled={isExists}
      fontSize={16}
      fontWeight={700}
      color="#FFF"
      gap="4px"
      borderRadius={8}
      w={isExists ? '240px' : '220px'}
      h="40px"
      bgColor="#00b7e9"
      _hover={{ color: '#FFF', opacity: 0.8 }}
      _active={{ color: '#FFF', opacity: 0.8 }}
      _disabled={{ bgColor: '#CCC' }}
      onClick={onAddCart}
    >
      <Image src="/images/add-white.png" w="24px" h="24px" alt={IMG_ALT} />
      {isExists ? 'Đã thêm' : 'Thêm'} vào giỏ hàng
    </Button>
  );
};

export default AddCart;
