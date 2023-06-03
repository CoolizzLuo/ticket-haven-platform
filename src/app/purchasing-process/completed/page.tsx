'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
} from '@/lib/chakra';
import Link from 'next/link';
import useOrder from '@/hooks/useOrder';
import { CalendarIcon, CheckIcon, LocationIcon } from '@/components/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Completed = () => {
  const router = useRouter();
  const params = useSearchParams();
  const orderNo = params.get('orderNo');
  const { order } = useOrder(orderNo);
  const activity = order?.activity;

  useEffect(() => {
    if (!orderNo) {
      router.push('/');
    }
  }, [orderNo]);

  return (
    <Container maxW="container.xl" pb="60px">
      <Box py="24px">
        <Text textStyle="h4" fontWeight="bold" mb="16px">
          {activity?.name}
        </Text>
        <Flex gap="35px">
          <Flex align="center" textStyle="t5">
            <CalendarIcon mr="8px" />
            <Text>{activity?.eventStartTime}</Text>
          </Flex>
          <Flex align="center" textStyle="t5">
            <LocationIcon mr="8px" />
            <Text>{activity?.location}</Text>
          </Flex>
        </Flex>
      </Box>
      <Center
        p="24px"
        alignContent="center"
        border="3px solid"
        borderColor="green.500"
        bgColor="green.100"
        color="green.500"
        textStyle="t2"
      >
        <CheckIcon mr="12px" />
        付款成功! 以下是您的訂票結果
      </Center>
      <VStack mt="24px" alignItems="stretch" gap="8px">
        {order?.seats.map((s, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={i}>
            <CardHeader>
              <Heading size="md">{activity?.name}</Heading>
              <Flex align="center" mt="12px" textStyle="t6">
                <CalendarIcon mr="8px" />
                <Text>{activity?.location}</Text>
              </Flex>
            </CardHeader>
            <Divider borderColor="natural.600" />
            <CardBody>
              <Flex>
                <VStack align="flex-start">
                  <Flex align="center">
                    <Text textStyle="t7" mr="16px">
                      場次
                    </Text>
                    <Text textStyle="t5">{activity?.eventStartTime}</Text>
                  </Flex>
                  <Flex align="center">
                    <Text textStyle="t6" mr="16px">
                      區域
                    </Text>
                    <Text textStyle="t5">{s.subAreaName}</Text>
                  </Flex>
                  <Flex align="center">
                    <Text textStyle="t6" mr="16px">
                      座位
                    </Text>
                    <Text textStyle="t5">
                      {s.row}排{s.seat}號
                    </Text>
                  </Flex>
                </VStack>
                <Spacer />
                <Box alignSelf="flex-end">
                  <Text textAlign="right" textStyle="t7">
                    票種 / 票價
                  </Text>
                  <Text textStyle="t5" fontWeight="bold">
                    全票 / {s.price}
                  </Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>
      <Flex mt="20px">
        <Spacer />
        <div>
          <Flex w="200px" px="20px" align="center" justify="space-between">
            <Text mr="24px">訂購張數</Text>
            <Text textStyle="t4" fontWeight="bold">
              {order?.seats.length}
            </Text>
          </Flex>
          <Flex w="200px" mt="12px" px="20px" align="center" justify="space-between">
            <Text mr="24px">總計</Text>
            <Text textStyle="t4" fontWeight="bold">
              {order?.price}
            </Text>
          </Flex>
        </div>
      </Flex>
      <Center mt="32px">
        <Button as={Link} href="/user/orders" colorScheme="primary">
          查看訂單明細
        </Button>
      </Center>
    </Container>
  );
};

export default Completed;
