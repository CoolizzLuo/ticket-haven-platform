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
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Text,
  Divider,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { SearchIcon } from '@chakra-ui/icons';
import { usePathname, useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaListAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { BsFillPersonFill, BsFillTicketDetailedFill } from 'react-icons/bs';
import { CgMenuRightAlt } from 'react-icons/cg';
import { useState } from 'react';
import { useUser } from '@/hooks/api/useUser';

const ROUTE_NORMAL_LIST = [
  {
    route: 'user/account',
    name: '我的資料',
    icon: BsFillPersonFill,
  },
  {
    route: 'user/orders',
    name: '我的訂單',
    icon: FaListAlt,
  },
  {
    route: 'user/tickets',
    name: '我的票券',
    icon: BsFillTicketDetailedFill,
  },
];

type HandleSearchType = (searchQ: string) => void;

const HeaderSearchInput = ({ handleSearch }: { handleSearch: HandleSearchType }) => {
  const [searchQ, setSearchQ] = useState<string>('');
  return (
    <InputGroup width="320px" height="44px" alignItems="center" mr="2">
      <Input
        borderRadius="70px"
        focusBorderColor="primary.500"
        bg="white"
        placeholder="搜尋藝人、場館、活動..."
        fontSize="md"
        height="inherit"
        maxLength={50}
        py="12px"
        px="24px"
        value={searchQ}
        onChange={(e) => setSearchQ(e.target.value)}
      />
      <InputRightElement height="inherit">
        <SearchIcon
          color="gray.500"
          boxSize={5}
          cursor="pointer"
          onClick={() => {
            setSearchQ('');
            handleSearch(searchQ);
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

const MobileNav = ({ isLogin }: { isLogin: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();

  const handleRedirect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <>
      <IconButton
        variant="ghost"
        icon={<CgMenuRightAlt fontSize="2.5rem" color="white" />}
        aria-label="Open Menu"
        onClick={onOpen}
      />
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent
          style={{
            opacity: 1,
            transform: 'none',
            width: '100vw',
            padding: '24px 0',
            margin: 0,
            bottom: 0,
            borderRadius: '8px 8px 0 0',
            position: 'absolute',
          }}
        >
          <ModalBody>
            <Box mb="24px">
              <HeaderSearchInput handleSearch={(queryStr) => handleRedirect(`/activities?q=${queryStr}`)} />
            </Box>
            {isLogin ? (
              <List>
                {ROUTE_NORMAL_LIST.map((r) => (
                  <ListItem key={r.route} mb="24px" cursor="pointer" onClick={() => handleRedirect(r.route)}>
                    <ListIcon as={r.icon} mr="8px" />
                    {r.name}
                  </ListItem>
                ))}
                <Divider my="24px" />
                <ListItem cursor="pointer" onClick={() => signOut()}>
                  <ListIcon as={FiLogOut} mr="8px" />
                  登出
                </ListItem>
              </List>
            ) : (
              <>
                <Text onClick={() => signIn(undefined, { callbackUrl: pathname })}>
                  <Icon as={FiLogOut} mr="8px" height="16px" />
                  登入
                </Text>
                <Divider my="24px" />
                <NextLink href={`/signup?redirect=${pathname}`}>
                  <Button
                    height="auto"
                    px={8}
                    py={2}
                    _hover={{
                      bg: 'black',
                      color: 'white',
                    }}
                    mr={2}
                  >
                    立即註冊
                  </Button>
                </NextLink>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const DeskTopNav = ({ isLogin }: { isLogin: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useUser();

  return (
    <HStack>
      <HeaderSearchInput handleSearch={(queryStr) => router.push(`/activities?q=${queryStr}`)} />
      <Flex alignItems="center">
        {!isLogin ? (
          <>
            <NextLink href={`/signup?redirect=${pathname}`}>
              <Button
                color="primary.500"
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
            <Button
              color="white"
              border="1px solid white"
              height="auto"
              px={8}
              py={2}
              _hover={{
                bg: 'black',
                color: 'white',
                borderColor: 'black',
              }}
              onClick={() => signIn(undefined, { callbackUrl: pathname })}
            >
              登入
            </Button>
          </>
        ) : (
          <Menu placement="bottom-end">
            <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
              <Avatar height="44px" src={user?.avatarUrl} />
            </MenuButton>
            <MenuList minW="150px" py="9px">
              {ROUTE_NORMAL_LIST.map((m) => (
                <NextLink key={m.route} href={m.route}>
                  <MenuItem p="7px 24px">
                    <Icon as={m.icon} mr="8px" />
                    <span>{m.name}</span>
                  </MenuItem>
                </NextLink>
              ))}
              <MenuDivider my="0" />
              <MenuItem onClick={() => signOut()} p="7px 24px">
                <Icon as={FiLogOut} mr="8px" />
                <span>登出</span>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </HStack>
  );
};

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { status } = useSession();
  const isLogin = status === 'authenticated';

  return (
    <Box as="section" p={{ base: 4, md: 5 }} bg="primary.500">
      <Box as="nav" width="100%">
        <Container maxW="container.xl">
          <HStack justifyContent="space-between">
            <NextLink href="/">
              <Image w="180px" src="/brand-white.svg" alt="Logo" />
            </NextLink>
            {!isMobile ? <DeskTopNav isLogin={isLogin} /> : <MobileNav isLogin={isLogin} />}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
