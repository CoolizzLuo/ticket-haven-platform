'use client';

import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box as="section" py={{ base: '20px', lg: '108px' }} bg="#383537">
      <Box as="nav" width="100%">
        <Container maxW="container.xl">
          <Flex alignItems="center" justifyContent="space-between">
            <Flex as="ul" pl="0">
              <Box as="li" listStyleType="none" mr="40px" color="white">
                <Link href="/">關於 TicketHaven</Link>
              </Box>
              <Box as="li" listStyleType="none" mr="40px" color="white">
                <Link href="/">常見問題</Link>
              </Box>
              <Box as="li" listStyleType="none" mr="40px" color="white">
                <Link href="/">隱私政策</Link>
              </Box>
              <Box as="li" listStyleType="none" color="white">
                <Link href="/">聯絡我們</Link>
              </Box>
            </Flex>
            <Box>
              <Box mb="20px" textAlign="right">
                <CheckCircleIcon fontSize="1.5rem" color="white" mr="22px" />
                <CheckCircleIcon fontSize="1.5rem" color="white" mr="22px" />
                <CheckCircleIcon fontSize="1.5rem" color="white" />
              </Box>
              <Text color="white">TicketHaven, team of north 14 group. All rights reserved.</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
