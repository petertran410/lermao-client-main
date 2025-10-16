import { IMG_ALT } from '@/utils/const';
import { useSetParamsURL } from '@/utils/hooks';
import { Flex, Image, Text } from '@chakra-ui/react';

const Pagination = (props) => {
  const { totalPages, currentPage = 1 } = props;
  const setParamsURL = useSetParamsURL();

  return (
    <Flex
      h="40px"
      p="8px"
      borderRadius={8}
      gap="16px"
      justify="center"
      bgColor="#FFF"
      boxShadow="0px 4px 24px 0px #0000000D"
      w="fit-content"
      mx="auto"
    >
      <button
        type="button"
        onClick={() => {
          if (currentPage === 1) {
            return;
          }
          setParamsURL({ page: currentPage + 1 });
        }}
      >
        <Image
          src={currentPage === 1 ? '/images/chevron-left-disable.png' : '/images/chevron-left.png'}
          alt={IMG_ALT}
          w="24px"
          h="24px"
        />
      </button>

      {Array.from(Array(totalPages).keys()).map((item) => {
        const isActive = currentPage === item + 1;

        return (
          <button
            type="button"
            key={item}
            onClick={() => {
              if (currentPage === item + 1) {
                return;
              }
              setParamsURL({ page: item + 1 });
            }}
          >
            <Text
              w="24px"
              h="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius={8}
              fontSize={16}
              fontWeight={400}
              bgColor={isActive ? '#00b7e9' : '#FFF'}
              color={isActive ? '#FFF' : undefined}
              transitionDuration="200ms"
              _hover={{
                bgColor: isActive ? undefined : '#e6e6e6'
              }}
            >
              {item + 1}
            </Text>
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => {
          if (currentPage === totalPages) {
            return;
          }
          setParamsURL({ page: currentPage - 1 });
        }}
      >
        <Image
          src={currentPage === totalPages ? '/images/chevron-right-disable.png' : '/images/chevron-right.png'}
          alt={IMG_ALT}
          w="24px"
          h="24px"
        />
      </button>
    </Flex>
  );
};

export default Pagination;
