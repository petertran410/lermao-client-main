import { useParamsURL } from '@/utils/hooks';
import { Box, Icon, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const FilterSearch = () => {
  const [paramsURL, setParamsURL] = useParamsURL();
  const { keyword } = paramsURL;
  const [keywordText, setKeywordText] = useState(keyword);

  return (
    <Box>
      <Text mb={0.5} fontSize={13} fontWeight={500}>
        Tìm kiếm
      </Text>
      <Box pos="relative">
        <Input
          pr={8}
          pb="1px"
          value={keywordText}
          onChange={(e) => setKeywordText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setParamsURL({ ...paramsURL, keyword: keywordText.trim() });
            }
          }}
        />

        {!!keywordText && (
          <Icon
            as={IoClose}
            zIndex={2}
            cursor="pointer"
            pos="absolute"
            top={2.5}
            right={2.5}
            fontSize={16}
            color="#828282"
            onClick={() => {
              setKeywordText('');
              setParamsURL({ ...paramsURL, keyword: '' });
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default FilterSearch;
