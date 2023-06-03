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
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@/lib/chakra';
import { OrderStatus, OrderStatusLabel } from '@/constants/orderStatus';
import { CalendarIcon, LocationIcon } from '@/components/icons';

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

const ActivityAccordion = ({ data }: { data: AccordionData }) => {
  return (
    <Accordion allowMultiple>
      <VStack align="stretch" spacing="24px">
        {data.map(({ id, status, price, orderNo, activityName, startTime, location, seats }) => (
          <AccordionItem key={id} borderRadius="6px" border="none">
            <Flex p="24px" align="center">
              <Box flex={1}>
                <Text textStyle="h4" fontWeight="bold" mb="28px">
                  {activityName}
                </Text>
                <Flex gap="35px">
                  <Flex align="center" textStyle="t5">
                    <CalendarIcon mr="8px" />
                    <Text>{startTime}</Text>
                  </Flex>
                  <Flex align="center" textStyle="t5">
                    <LocationIcon mr="8px" />
                    <Text>{location}</Text>
                  </Flex>
                </Flex>
              </Box>
              <AccordionButton as="div" _hover={{ background: 'transparent' }}>
                <Button rightIcon={<AccordionIcon />} colorScheme="primary">
                  票券資訊
                </Button>
              </AccordionButton>
            </Flex>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={4}>
                <div>
                  <Text>訂單編號</Text>
                  <Text>{orderNo}</Text>
                </div>
                <div>
                  <Text>狀態</Text>
                  <Text>{OrderStatusLabel[status]}</Text>
                </div>
                <div>
                  <Text>票卷張數</Text>
                  <Text>{seats.length}</Text>
                </div>
                <div>
                  <Text>總金額</Text>
                  <Text>{price}</Text>
                </div>
              </SimpleGrid>
              <Flex mt="16px">
                <div>
                  <Text mb="4px">座位</Text>
                  {seats.map((s, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Text key={i}>
                      {s.areaName} {s.row}排 {s.seat}號
                    </Text>
                  ))}
                </div>
                <Spacer />
                <Button size="sm" variant="ghost" colorScheme="natural" alignSelf="self-end">
                  取消訂單
                </Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </VStack>
    </Accordion>
  );
};

export default ActivityAccordion;
