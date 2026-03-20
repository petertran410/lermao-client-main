'use client';

import TitleSpecial from '@/components/title-special';
import { useMutateContact } from '@/services/contact.service';
import { PX_ALL } from '@/utils/const';
import { showToast } from '@/utils/helper';
import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const HomeContact = (props) => {
  const { mt = '56px', px = PX_ALL } = props;
  const { mutateAsync: sendContactMutate, isPending } = useMutateContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (values) => {
    const { email, phoneNumber, note, fullName } = values;
    const data = {
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      note: note.trim(),
      receiverFullName: fullName.trim()
    };
    sendContactMutate(data)
      .then(() => {
        reset();
        showToast({
          status: 'success',
          content: 'Gửi thông tin thành công!'
        });
      })
      .catch((e) => {
        showToast({
          status: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'
        });
      });
  };

  return (
    <Flex direction="column" px={px} mt={mt} pos="relative" zIndex={10}>
      {/* ── Section Heading ── */}
      <Flex align="center" justify="center" gap="16px" mb="32px">
        <Box h="2px" flex={1} maxW="120px" bgGradient="linear(to-r, transparent, #00b7e9)" />
        <Text
          as="h2"
          fontSize={{ xs: '24px', md: '30px', lg: '36px' }}
          fontWeight={900}
          textAlign="center"
          lineHeight="1.2"
          letterSpacing="-0.02em"
          bgGradient="linear(to-r, #00b7e9, #77D0E8)"
          bgClip="text"
          sx={{ WebkitTextFillColor: 'transparent' }}
        >
          Liên Hệ Với Chúng Tớ
        </Text>
        <Box h="2px" flex={1} maxW="120px" bgGradient="linear(to-r, #77D0E8, transparent)" />
      </Flex>

      <Box bgColor="#FFF" borderRadius={16} boxShadow="0px 4px 24px 0px #0000000D" className="gradient-border">
        <form
          style={{ display: 'block', padding: '24px', borderRadius: 14 }}
          onSubmit={handleSubmit(onSubmit)}
          className="gradient-border-content"
        >
          <Flex flex={1} direction="column" gap="8px">
            <Text fontSize={16} fontWeight={500}>
              Họ và tên
            </Text>
            <Input
              {...register('fullName')}
              color="text.1"
              placeholder="Nhập họ và tên"
              h="40px"
              borderRadius={8}
              fontWeight={500}
              _placeholder={{ fontWeight: 400 }}
              borderColor="#E1E2E3"
            />
            {!!errors.fullName && <Text color="red.400">{errors.fullName.message}</Text>}
          </Flex>

          <Flex gap="20px" direction={{ xs: 'column', md: 'row' }} mt="24px">
            <Flex flex={1} direction="column" gap="8px">
              <Text fontSize={16} fontWeight={500}>
                Số điện thoại{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </Text>
              <Input
                {...register('phoneNumber', {
                  required: 'Vui lòng nhập số điện thoại',
                  pattern: {
                    value: /^(03|05|07|08|09)\d{7,10}$/,
                    message: 'Số điện thoại không hợp lệ'
                  }
                })}
                color="text.1"
                placeholder="Nhập số điện thoại"
                h="40px"
                borderRadius={8}
                fontWeight={500}
                _placeholder={{ fontWeight: 400 }}
                borderColor="#E1E2E3"
              />
              {!!errors.phoneNumber && <Text color="red.400">{errors.phoneNumber.message}</Text>}
            </Flex>
            <Flex flex={1} direction="column" gap="8px">
              <Text fontSize={16} fontWeight={500}>
                Email{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </Text>
              <Input
                {...register('email', {
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email không hợp lệ'
                  }
                })}
                color="text.1"
                placeholder="Nhập email"
                h="40px"
                borderRadius={8}
                fontWeight={500}
                borderColor="#E1E2E3"
                _placeholder={{ fontWeight: 400 }}
              />
              {!!errors.email && <Text color="red.400">{errors.email.message}</Text>}
            </Flex>
          </Flex>

          <Flex direction="column" gap="8px" mt="24px">
            <Text fontSize={16} fontWeight={500}>
              Sản phẩm / Vấn đề mà bạn đang quan tâm{' '}
              <Text as="span" color="red">
                *
              </Text>
            </Text>
            <Textarea
              {...register('note', { required: 'Vui lòng nhập nội dung' })}
              rows={3}
              color="text.1"
              p="12px"
              placeholder="Điền thông tin"
              borderRadius={8}
              fontWeight={500}
              borderColor="#E1E2E3"
              _placeholder={{ fontWeight: 400 }}
            />
            {!!errors.note && <Text color="red.400">{errors.note.message}</Text>}
          </Flex>

          <Flex mt="24px" justify="center">
            <Button
              isLoading={isPending}
              type="submit"
              bgColor="#00b7e9"
              color="#FFF"
              w="144px"
              h="40px"
              fontSize={16}
              fontWeight={700}
              borderRadius={8}
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.8 }}
            >
              Gửi thông tin
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default HomeContact;
