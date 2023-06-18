'use client';

import { Box, Container, Flex, Text, Icon } from '@chakra-ui/react';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { LuMail } from 'react-icons/lu';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box as="section" py={{ base: '20px', lg: '108px' }} bg="natural.900">
      <Box as="nav" width="100%">
        <Container maxW="container.xl">
          <Flex flexDir={{ base: 'column', md: 'row' }} alignItems="center" justifyContent="space-between">
            <Flex as="ul" pl="0" flexDir={{ base: 'column', md: 'row' }} textAlign={{ base: 'center', md: 'left' }}>
              {['關於 TicketHaven', '常見問題', '隱私政策', '聯絡我們'].map((page) => (
                <Box
                  as="li"
                  listStyleType="none"
                  color="white"
                  mr={{ md: '40px' }}
                  mb={{ base: '16px', md: '0' }}
                  key={page}
                >
                  <Link href="/">{page}</Link>
                </Box>
              ))}
            </Flex>
            <Box textAlign={{ base: 'center', md: 'right' }}>
              <Flex justifyContent={{ base: 'center', md: 'end' }} alignItems="center" mb="20px">
                <Icon as={BsFacebook} fontSize="1.5rem" color="white" mr="22px" />
                <Icon as={BsInstagram} fontSize="1.5rem" color="white" mr="22px" />
                <Icon as={LuMail} fontSize="1.8rem" color="white" />
              </Flex>
              <Text color="white" fontSize={{ base: '14px', md: '16px' }}>
                TicketHaven, team of north 14 group. All rights reserved.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
