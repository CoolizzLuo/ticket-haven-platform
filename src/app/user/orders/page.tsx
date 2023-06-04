'use client';

import { Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@/lib/chakra';
import useOrders from '@/hooks/useOrders';
import ActivityAccordion from './TicketAccordion';

const Order = () => {
  return (
    <Container maxW="container.lg" pb="120px">
      <Center pt="120px" pb="80px">
        <Text textStyle="h1">我的票券</Text>
      </Center>
      <Tabs variant="card" size="lg">
        <TabList>
          <Tab textStyle="t5">可使用</Tab>
          <Tab>已過期</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CompletedOrders />
          </TabPanel>
          <TabPanel>
            <UnpaidOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

function CompletedOrders() {
  const { orders = [] } = useOrders({ page: 1, pageSize: 5, status: 'completed' });

  return <ActivityAccordion data={orders} />;
}

function UnpaidOrders() {
  const { orders = [] } = useOrders({ page: 1, pageSize: 5, status: 'unpaid' });

  return <ActivityAccordion data={orders} />;
}

export default Order;
