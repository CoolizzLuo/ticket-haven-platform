import { Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@/components/chakra';
import { OrderStatus } from '@/constants/orderStatus';
import ActivityAccordion from './TicketAccordion';

const orders = [
  {
    id: 'asdfa',
    status: OrderStatus.PAID,
    price: 3800,
    orderNo: '20230520efco4n',
    activityName: 'BLACKPINK WORLD TOUR [BORN PINK] KAOHSIUNG',
    startTime: '2022/03/18 19:30',
    location: '高雄國家體育場 (世運主場館)',
    seats: [
      {
        areaName: '紅 218 區',
        row: 34,
        seat: 4,
      },
      {
        areaName: '紅 218 區',
        row: 34,
        seat: 5,
      },
    ],
  },
  {
    id: 'awd13p',
    status: OrderStatus.PAID,
    price: 3800,
    orderNo: '20230520efco4n',
    activityName: 'BLACKPINK WORLD TOUR [BORN PINK] KAOHSIUNG',
    startTime: '2022/03/18 19:30',
    location: '高雄國家體育場 (世運主場館)',
    seats: [
      {
        areaName: '紅 218 區',
        row: 34,
        seat: 4,
      },
      {
        areaName: '紅 218 區',
        row: 34,
        seat: 5,
      },
    ],
  },
];

const Order = () => {
  return (
    <Container maxW="container.lg" pb="120px">
      <Center pt="120px" pb="80px">
        <Text textStyle="h1">我的票券</Text>
      </Center>
      <Tabs variant="card">
        <TabList>
          <Tab textStyle="t5">可使用</Tab>
          <Tab>已過期</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActivityAccordion data={orders} />
          </TabPanel>
          <TabPanel>
            <ActivityAccordion data={orders} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Order;
