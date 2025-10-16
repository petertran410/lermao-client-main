import { IMG_ALT } from '@/utils/const';
import { Flex, Image, Text } from '@chakra-ui/react';

const Process = () => {
  const PROCESS_LIST = [
    {
      title: 'Thành lập Công ty TNHH Xuất Nhập Khẩu HI SWEETIE VIỆT NAM',
      description: 'Tiêu chí hoạt động: Học hỏi, Áp dụng, Thích Nghi theo thực tiễn thị trường Việt Nam',
      year: '2018'
    },
    {
      title: 'Mở Chi nhánh tại Miền Nam',
      year: '2020'
    },
    {
      title: 'Triển khai Thương hiệu TRÀ PHƯỢNG HOÀNG',
      year: '2022'
    },
    {
      title: 'Triển khai thương hiệu Lermao',
      description: 'Triển khai các mã hàng lạnh đầu tiên',
      year: '2023'
    },
    {
      title: 'Xây dựng Hệ thống kho lạnh ở cả hai miền Nam - Bắc',
      year: '2024'
    }
  ];

  return (
    <Flex align="center" pt="40px" bgColor="#FFF" px="60px" justify="center">
      <Flex flex={1} direction="column" gap="56px" align="center" display={{ xs: 'none', lg: 'flex' }}>
        <Image src="/images/img-process-2.png" w="180px" h="120px" alt={IMG_ALT} />
        <Flex align="center" gap="40px">
          <Image src="/images/img-process-3.png" w="118px" h="78px" alt={IMG_ALT} />
          <Image src="/images/img-process-1.png" w="256px" h="170px" alt={IMG_ALT} />
        </Flex>
        <Image src="/images/img-process-2.png" w="180px" h="120px" alt={IMG_ALT} />
      </Flex>
      <Flex direction="column" gap="16px" align="center">
        {PROCESS_LIST.map((item, index) => {
          const { title, description, year } = item;
          return (
            <Flex direction="column" key={year} gap="16px" align="center">
              <Flex
                align="center"
                justify="center"
                bgColor="main.1"
                color="#FFF"
                w="216px"
                h="50px"
                gap="4px"
                fontSize={24}
                borderRadius={8}
                fontWeight={700}
              >
                {year}
              </Flex>

              <Flex direction="column" align="center">
                <Text textAlign="center" fontSize={16} fontWeight={700}>
                  {title}
                </Text>
                {!!description && (
                  <Text textAlign="center" fontSize={16}>
                    {description}
                  </Text>
                )}
              </Flex>
              {index !== PROCESS_LIST.length - 1 && (
                <Image src="/images/arrow-down-blue.png" w="15px" h="25px" alt={IMG_ALT} />
              )}
            </Flex>
          );
        })}
      </Flex>
      <Flex flex={1} direction="column" gap="56px" align="center" display={{ xs: 'none', lg: 'flex' }}>
        <Image src="/images/img-process-6.png" w="180px" h="120px" alt={IMG_ALT} />
        <Flex align="center" gap="40px">
          <Image src="/images/img-process-5.png" w="256px" h="170px" alt={IMG_ALT} />
          <Image src="/images/img-process-7.png" w="118px" h="78px" alt={IMG_ALT} />
        </Flex>
        <Image src="/images/img-process-8.png" w="180px" h="120px" alt={IMG_ALT} />
      </Flex>
    </Flex>
  );
};

export default Process;
