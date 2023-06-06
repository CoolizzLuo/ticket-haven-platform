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
  IconButton,
  Spacer,
  Text,
  VStack,
} from '@/lib/chakra';
import Link from 'next/link';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import useActivity from '@/hooks/useActivity';
import useOrder from '@/hooks/useOrder';
import { CalendarIcon, CheckIcon, LocationIcon, MdDeleteIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import { dayFormat } from '@/lib/dayjs';

const paymentUrl = process.env.NEXT_PUBLIC_NEWEB_PAYMENT_URL;

const calcLeftTime = (limitTime: Dayjs) => {
  if (dayjs().isAfter(limitTime)) return { minute: '00', second: '00' };

  const diff = limitTime.diff(dayjs(), 'minute', true);
  const minute = Math.floor(diff).toString().padStart(2, '0');
  const second = Math.floor(parseFloat(diff.toString().replace(/[0-9]*\./, '0.')) * 60)
    .toString()
    .padStart(2, '0');

  return { minute, second };
};

const createPaymentForm = (paymentInfo: Record<string, string | number>) => {
  const form = document.createElement('form');
  form.method = 'post';
  form.style.display = 'none';
  form.action = paymentUrl;
  for (const key in paymentInfo) {
    if (Object.prototype.hasOwnProperty.call(paymentInfo, key)) {
      const value = paymentInfo[key];
      const input = document.createElement('input');
      input.name = key;
      input.value = value.toString();
      form.appendChild(input);
    }
  }
  document.body.appendChild(form);
  return form;
};

const Confirm = () => {
  const router = useRouter();
  const activityId = useTicketPurchasingStore.use.activityId();
  const orderNo = useTicketPurchasingStore.use.orderNo();
  const clear = useTicketPurchasingStore.use.clear();
  const { activity } = useActivity(activityId);
  const { order, cancelOder, getPaymentInfo, error, deleteSeat } = useOrder(orderNo);

  const [leftTime, setLeftTime] = useState({ minute: '15', second: '00' });

  useEffect(() => {
    if (!orderNo || error) {
      router.back();
    }
  }, [orderNo, error]);

  useEffect(() => {
    const cb = () => {
      if (!order) return;
      const limitTime = dayjs(order.createAt).add(15, 'm');
      if (dayjs().isAfter(limitTime)) {
        clear();
        router.push('/');
      }
      setLeftTime(calcLeftTime(limitTime));
    };

    cb();
    const id = setInterval(cb, 1000);
    return () => clearInterval(id);
  }, [order]);

  const cancelOrder = () => {
    cancelOder();
    clear();
    router.push(`/activities/${activityId}`);
  };

  const pay = async () => {
    const paymentInfo = await getPaymentInfo();
    const form = createPaymentForm(paymentInfo);
    form.submit();
  };

  return (
    activity &&
    order && (
      <Container maxW="container.xl" pb="60px">
        <Box py="24px">
          <Text textStyle="h4" fontWeight="bold" mb="16px">
            {activity.name}
          </Text>
          <Flex gap="35px">
            <Flex align="center" textStyle="t5">
              <CalendarIcon mr="8px" />
              <Text>{dayFormat(order.activity.eventStartTime)}</Text>
            </Flex>
            <Flex align="center" textStyle="t5">
              <LocationIcon mr="8px" />
              <Text>{activity.location}</Text>
            </Flex>
          </Flex>
        </Box>
        <Center p="24px" border="3px solid" borderColor="primary.500" bgColor="primary.100" color="primary.500">
          <Text textStyle="t2">
            請於 {leftTime.minute} 分 {leftTime.second} 秒內完成付款
          </Text>
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
              <Text textStyle="t5">{order.user.name}</Text>
            </Flex>
            <Flex align="center">
              <Text mr="16px" textStyle="t7">
                電子郵件
              </Text>
              <Text textStyle="t5">{order.user.email}</Text>
            </Flex>
            <Flex align="center">
              <Text mr="16px" textStyle="t7">
                連絡電話
              </Text>
              <Text textStyle="t5">{order.user.cellphone}</Text>
            </Flex>
          </VStack>
        </Box>

        <Heading fontSize="28px" mt="32px" mb="16px">
          訂單編號 #{order.orderNo}
        </Heading>
        <VStack alignItems="stretch" gap="16px">
          {order.seats.map((s, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={i} borderLeft="4px" borderColor="primary.500">
              <CardHeader>
                <Heading size="md">{activity.name}</Heading>
                <Flex align="center" mt="12px" textStyle="t6">
                  <CalendarIcon mr="8px" />
                  <Text>{activity.location}</Text>
                </Flex>
                {order.seats.length > 1 && (
                  <IconButton
                    pos="absolute"
                    top="1.25rem"
                    right="1.25rem"
                    isRound
                    size="icon-sm"
                    colorScheme="natural"
                    variant="light"
                    icon={<MdDeleteIcon />}
                    aria-label="Delete seat"
                    onClick={() => deleteSeat(s)}
                  />
                )}
              </CardHeader>
              <Divider borderColor="natural.600" w="auto" mx="20px" />
              <CardBody>
                <Flex>
                  <VStack align="flex-start">
                    <Flex align="center">
                      <Text textStyle="t6" mr="16px">
                        場次
                      </Text>
                      <Text textStyle="t5">{dayFormat(order.activity.eventStartTime)}</Text>
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
                      全票 / ${s.price}
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
                ${order.price}
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
          <Button onClick={cancelOrder} variant="outline" colorScheme="natural">
            取消訂單
          </Button>
          <Spacer />
          <Button as={Link} href="/purchasing-process/select-area" variant="outline" colorScheme="primary">
            繼續選購
          </Button>
          <Button onClick={pay} colorScheme="primary" leftIcon={<CheckIcon />}>
            我同意節目規則，去付款
          </Button>
        </Flex>
      </Container>
    )
  );
};

export default Confirm;
