import { Flex, useColorModeValue, Box, Heading } from '@chakra-ui/react';

const Header = () => {
  // const { data: session } = useSession();

  return (
    <Box p="4" bg={useColorModeValue('gray.300', 'gray.800')}>
      <Flex align="center" justify="space-between">
        <Heading fontSize="3xl">Login test</Heading>
      </Flex>
    </Box>
  );
};

export default Header;
