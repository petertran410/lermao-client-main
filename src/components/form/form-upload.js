import { Box, Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const FormUpload = (props) => {
  const { type = 'file', multiple = true, ...rest } = props;
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemove = (removeIndex) => {
    setFiles(files.filter((_, idx) => removeIndex !== idx));
  };

  return (
    <Box>
      <Input
        {...rest}
        type="file"
        accept={type === 'image' ? 'image/*' : '*/*'}
        multiple={multiple}
        onChange={handleFileChange}
        mb={4}
      />
      {files.length > 0 && (
        <Flex flexWrap="wrap" align="center" mt={3} gap={5}>
          {files.map((file, index) => (
            <Box key={index} pos="relative" border="1px solid #e6e6e6" borderRadius={4}>
              {type === 'image' ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  boxSize={{ xs: '50px', md: '70px', lg: '100px' }}
                  objectFit="cover"
                />
              ) : (
                <Flex align="center" gap={1} px={3} py={1.5} bgColor="#f2f2f2">
                  <Icon as={FaFileAlt} color="#828282" fontSize={13} />
                  <Text display="inline-block" fontSize={13}>
                    {file.name}
                  </Text>
                </Flex>
              )}
              <Button
                onClick={() => handleRemove(index)}
                bgColor="red.400"
                w={6}
                h={6}
                borderRadius="full"
                pos="absolute"
                top={-3}
                right={-3}
                minH={0}
                minW={0}
                p={0}
                zIndex={5}
                _hover={{ bgColor: 'red.500' }}
                title="Xoá"
              >
                <Icon as={IoClose} fontSize={15} color="#FFF" />
              </Button>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default FormUpload;
