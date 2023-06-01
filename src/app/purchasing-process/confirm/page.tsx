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
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import useActivity from '@/hooks/useActivity';
import useOrder from '@/hooks/useOrder';
import { event } from '../mocks';

const Confirm = () => {
  const activityId = useTicketPurchasingStore.use.activityId();
  const orderNo = useTicketPurchasingStore.use.orderNo();
  const { activity } = useActivity(activityId);
  const { order } = useOrder(orderNo || '2023051809fc10');

  return (
    <Container maxW="container.xl" pb="60px">
      <Box py="24px">
        <Text textStyle="h4" fontWeight="bold" mb="16px">
          {activity?.name}
        </Text>
        <Flex gap="35px">
          <Flex align="center" textStyle="t5">
            <Icon as={LuCalendarDays} mr="8px" />
            <Text>{activity?.startTime}</Text>
          </Flex>
          <Flex align="center" textStyle="t5">
            <Icon as={GoLocation} mr="8px" />
            <Text>{activity?.location}</Text>
          </Flex>
        </Flex>
      </Box>
      <Center p="24px" border="3px solid" borderColor="primary.500" bgColor="primary.100" color="primary.500">
        <Text textStyle="t2">請於 08 分 10 秒內完成資料填寫，並選擇付款方式</Text>
      </Center>
      <Heading fontSize="28px" mt="32px" mb="16px">
        會員資訊
      </Heading>
      <Box p="24px" bgColor="natural.50" borderRadius="6px">
        <VStack spacing="12px" align="flex-start">
          <Flex align="center">
            <Text mr="16px" textStyle="t7">
              會員姓名
            </Text>
            <Text textStyle="t5">{order?.user.name}</Text>
          </Flex>
          <Flex align="center">
            <Text mr="16px" textStyle="t7">
              電子郵件
            </Text>
            <Text textStyle="t5">{order?.user.email}</Text>
          </Flex>
          <Flex align="center">
            <Text mr="16px" textStyle="t7">
              連絡電話
            </Text>
            <Text textStyle="t5">{order?.user.cellphone}</Text>
          </Flex>
        </VStack>
      </Box>

      <Heading fontSize="28px" mt="32px" mb="16px">
        訂單編號 #{order?.orderNo}
      </Heading>
      <VStack alignItems="stretch" gap="8px">
        {order?.seats.map((s, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={i}>
            <CardHeader>
              <Heading size="md">{activity?.name}</Heading>
              <Flex align="center" mt="12px" textStyle="t6">
                <Icon as={LuCalendarDays} mr="8px" />
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
      <Heading fontSize="28px" mt="32px" mb="16px">
        付款方式
      </Heading>
      <Button variant="outline" colorScheme="blue" w="150px" p="24px" borderRadius={0}>
        藍新金流
      </Button>
      <Flex mt="32px" gap="16px">
        <Button as={Link} href={`/activities/${activity?.id}`} variant="outline" colorScheme="natural">
          取消訂單
        </Button>
        <Spacer />
        <Button as={Link} href="/purchasing-process/select-area" variant="outline" colorScheme="primary">
          繼續選購
        </Button>
        <Button colorScheme="primary" leftIcon={<BsCheckLg />}>
          我同意節目規則，去付款
        </Button>
      </Flex>
    </Container>
  );
};

export default Confirm;
