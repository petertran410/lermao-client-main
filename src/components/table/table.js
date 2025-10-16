import { Box, Table as ChakraTable, Flex, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { EmptyScreen, ErrorScreen, LoadingScreen } from '../effect-screen';

const Table = (props) => {
  const { columns, data, isLoading, error } = props;

  const renderData = () => {
    if (isLoading) {
      return (
        <Tbody pos="relative" h="300px">
          <Tr h="full">
            <Td h="full">
              <Flex w="full" pos="absolute" align="center" justify="center" top={0} left={0} h="full">
                <LoadingScreen />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      );
    }

    if (error) {
      return (
        <Tbody pos="relative" h="300px">
          <Tr h="full">
            <Td h="full">
              <Flex w="full" pos="absolute" align="center" justify="center" top={0} left={0} h="full">
                <ErrorScreen message={error?.message} />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      );
    }

    if (!data?.length) {
      return (
        <Tbody pos="relative" h="300px">
          <Tr h="full">
            <Td h="full">
              <Flex w="full" pos="absolute" align="center" justify="center" top={0} left={0} h="full">
                <EmptyScreen />
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      );
    }

    return (
      <Tbody>
        {data.map((item, index) => {
          return (
            <Tr key={index}>
              {columns.map((col) => {
                const { field, render, width } = col;
                if (render) {
                  return (
                    <Td key={field} w={width}>
                      {render(item, index, data)}
                    </Td>
                  );
                }
                return (
                  <Td key={field} w={width}>
                    {item[field]}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    );
  };

  return (
    <Box>
      <TableContainer>
        <ChakraTable variant="simple">
          <Thead bgColor="#1c2d3d">
            <Tr>
              {columns.map((col, colIdx) => {
                const { field, title, width } = col;
                return (
                  <Th
                    key={field}
                    color="#FFF"
                    py={4}
                    w={width}
                    textTransform="none"
                    fontSize={13}
                    fontWeight={500}
                    letterSpacing={0}
                    borderTopLeftRadius={colIdx === 0 ? 5 : 0}
                    borderTopRightRadius={colIdx === columns.length - 1 ? 5 : 0}
                  >
                    {title}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <>{renderData()}</>
        </ChakraTable>
      </TableContainer>
    </Box>
  );
};

export default Table;
