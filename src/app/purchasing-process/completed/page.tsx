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
  Icon,
  Spacer,
  Text,
  VStack,
} from '@/lib/chakra';
import { LuCalendarDays } from 'react-icons/lu';
import { GoLocation } from 'react-icons/go';
import { BsCheckLg } from 'react-icons/bs';
import Link from 'next/link';
import { activity, event, order } from '../mocks';

const Completed = () => {
  return (
    <Container maxW="container.xl" pb="60px">
      <Box py="24px">
        <Text textStyle="h4" fontWeight="bold" mb="16px">
          {activity.name}
        </Text>
        <Flex gap="35px">
          <Flex align="center" textStyle="t5">
            <Icon as={LuCalendarDays} mr="8px" />
            <Text>{activity.startTime}</Text>
          </Flex>
          <Flex align="center" textStyle="t5">
            <Icon as={GoLocation} mr="8px" />
            <Text>{activity.location}</Text>
          </Flex>
        </Flex>
      </Box>
      <Center p="24px" border="3px solid" borderColor="green.500" bgColor="green.100" color="green.500">
        <Text textStyle="t2">
          <Icon as={BsCheckLg} />
          付款成功! 以下是您的訂票結果
        </Text>
      </Center>
      <VStack mt="24px" alignItems="stretch" gap="8px">
        {order.seats.map((s, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={i}>
            <CardHeader>
              <Heading size="md">{activity.name}</Heading>
              <Flex align="center" mt="12px" textStyle="t6">
                <Icon as={LuCalendarDays} mr="8px" />
                <Text>{activity.location}</Text>
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
                    <Text textStyle="t5">{event.startTime}</Text>
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
              {order.seats.length}
            </Text>
          </Flex>
          <Flex w="200px" mt="12px" px="20px" align="center" justify="space-between">
            <Text mr="24px">總計</Text>
            <Text textStyle="t4" fontWeight="bold">
              {order.price}
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
