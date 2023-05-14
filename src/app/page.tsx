'use client';

import { Text, Box, useBreakpointValue, Button, Image } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import ActivitySearchForm from '@/components/activity/ActivitySearchForm';
import ActivitySearchTemplate from '@/components/activity/ActivitySearchTemplate';

const Home = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const pathname = usePathname();

  return (
    <>
      {!isMobile && <ActivitySearchForm />}
      <ActivitySearchTemplate />
      <ActivitySearchTemplate />
      <Box as="section" py="120px" bgColor="#F7F4F6" textAlign="center">
        <Image w="200px" src="/brand.svg" alt="Logo" margin="auto" mb="60px" />
        <Text>採用 QR code 電子票券</Text>
        <Text mb="60px">掃描即可輕鬆入場</Text>
        <NextLink href={`/signup?redirect=${pathname}`}>
          <Button
            fontSize={20}
            fontWeight={600}
            bg="brand.100"
            color="white"
            height="auto"
            px={8}
            py={2}
            _hover={{
              bg: 'black',
              color: 'white',
            }}
          >
            立刻註冊
          </Button>
        </NextLink>
      </Box>
    </>
  );
};

export default Home;
