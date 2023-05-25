'use client';

import {
  Avatar,
  Flex,
  Box,
  Container,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import { getTokenFromLS, clearTokenFromLS } from '@/api/auth';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const getToken = !!getTokenFromLS();

  const [isLogin, setIsLogin] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLogin(getToken);
  }, [getToken]);

  const logOut = () => {
    clearTokenFromLS();
    setIsLogin(false);
    router.push('/');
  };

  return (
    <Box as="section" p="5" bg="brand.100">
      <Box as="nav" width="100%">
        <Container maxW="1200px">
          <HStack justifyContent="space-between">
            <NextLink href="/">
              <Image w="180px" src="/brand-white.svg" alt="Logo" />
            </NextLink>
            {!isMobile ? (
              <HStack>
                <InputGroup width="320px" alignItems="center" mr="2">
                  <Input
                    type="text"
                    borderRadius="70px"
                    bg="white"
                    focusBorderColor="green"
                    placeholder="搜尋藝人、場館、活動..."
                    fontSize="20px"
                    py="12px"
                    px="24px"
                  />
                  <InputRightElement>
                    <SearchIcon color="gray.500" boxSize={5} />
                  </InputRightElement>
                </InputGroup>
                <Flex alignItems="center">
                  {!isLogin ? (
                    <>
                      <NextLink href={`/signup?redirect=${pathname}`}>
                        <Button
                          fontSize={20}
                          fontWeight={600}
                          color="brand.100"
                          bg="white"
                          height="auto"
                          px={8}
                          py={2}
                          _hover={{
                            bg: 'black',
                            color: 'white',
                          }}
                          mr={2}
                        >
                          註冊
                        </Button>
                      </NextLink>
                      <NextLink href={`/signin?redirect=${pathname}`}>
                        <Button
                          fontSize={20}
                          fontWeight={600}
                          color="white"
                          border="1px solid white"
                          bg="brand.100"
                          height="auto"
                          px={8}
                          py={2}
                          _hover={{
                            bg: 'black',
                            color: 'white',
                            borderColor: 'black',
                          }}
                          mr={2}
                        >
                          登入
                        </Button>
                      </NextLink>
                    </>
                  ) : (
                    <Menu>
                      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                        <Avatar
                          size="sm"
                          src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                        />
                      </MenuButton>
                      <MenuList>
                        <NextLink href="user/account">
                          <MenuItem>我的資料</MenuItem>
                        </NextLink>
                        <MenuDivider />
                        <NextLink href="user/orders">
                          <MenuItem>我的訂單</MenuItem>
                        </NextLink>
                        <MenuDivider />
                        <NextLink href="user/tickets">
                          <MenuItem>我的票券</MenuItem>
                        </NextLink>
                        <MenuDivider />
                        <MenuItem onClick={logOut}>登出</MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              </HStack>
            ) : (
              <IconButton
                variant="ghost"
                icon={<HamburgerIcon fontSize="1.5rem" color="white" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
