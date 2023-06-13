'use client';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  VStack,
  chakra,
} from '@/lib/chakra';
import { OrderStatus, OrderStatusLabel } from '@/constants/orderStatus';
import { Order } from '@/hooks/api/useOrders';
import { dayFormat } from '@/lib/dayjs';
import { CalendarIcon, LocationIcon, TicketIcon } from '@/components/icons';

export type AccordionData = {
  id: string;
  status: OrderStatus;
  price: number;
  orderNo: string;
  activityName: string;
  startTime: string;
  location: string;
  seats: {
    areaName: string;
    row: number;
    seat: number;
  }[];
}[];

const OrderAccordion = ({ data }: { data: Order[] }) => {
  return (
    <Accordion allowMultiple>
      <VStack align="stretch" spacing="24px">
        {data.map(({ id, status, price, orderNo, activity, seats }) => (
          <AccordionItem key={id} borderRadius="6px" border="none">
            <Flex p="24px" align="center">
              <Box flex={1}>
                <Text textStyle="h4" fontWeight="bold" mb="28px">
                  {activity.name}
                </Text>
                <Flex gap="35px">
                  <Flex align="center" textStyle="t5">
                    <CalendarIcon mr="8px" />
                    <Text>{dayFormat(activity.eventStartTime)}</Text>
                  </Flex>
                  <Flex align="center" textStyle="t5">
                    <LocationIcon mr="8px" />
                    <Text>{activity.location}</Text>
                  </Flex>
                </Flex>
              </Box>
              <AccordionButton as="div" _hover={{ background: 'transparent' }}>
                <Button rightIcon={<AccordionIcon />} colorScheme="primary">
                  訂單資訊
                </Button>
              </AccordionButton>
            </Flex>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={4}>
                <div>
                  <Text>訂單編號</Text>
                  <Text>#{orderNo}</Text>
                </div>
                <div>
                  <Text>狀態</Text>
                  <Text>
                    <Tag variant={status === OrderStatus.PAID ? 'warning' : 'info'}>{OrderStatusLabel[status]}</Tag>
                  </Text>
                </div>
                <div>
                  <Text>票卷張數</Text>
                  <Text>{seats.length}</Text>
                </div>
                <div>
                  <Text>總金額</Text>
                  <Text>${price}</Text>
                </div>
              </SimpleGrid>
              <Flex mt="16px">
                <div>
                  <Text mb="6px">座位</Text>
                  <List>
                    {seats.map((s, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <ListItem key={i}>
                        <ListIcon as={TicketIcon} color="primary.500" />
                        <chakra.span mr="32px">{s.subAreaName}</chakra.span>
                        <span>
                          {s.row}排 {s.seat}號
                        </span>
                      </ListItem>
                    ))}
                  </List>
                </div>
                <Spacer />
                {/* <Button size="sm" variant="ghost" colorScheme="natural" alignSelf="self-end">
                  取消訂單
                </Button> */}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </VStack>
    </Accordion>
  );
};

export default OrderAccordion;
