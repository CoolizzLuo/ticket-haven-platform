'use client';

import { Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@/lib/chakra';
import useOrders from '@/hooks/api/useOrders';
import { useState } from 'react';
import Pagination from '@/components/common/Pagination';
import ActivityAccordion from './TicketAccordion';

const Order = () => {
  return (
    <Container maxW="container.lg" pb="120px">
      <Center pt="120px" pb="80px">
        <Text textStyle="h1">我的訂單</Text>
      </Center>
      <Tabs variant="card" size="lg">
        <TabList>
          <Tab textStyle="t5">已完成</Tab>
          <Tab>未完成</Tab>
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
  const [page, setPage] = useState(1);
  const { orders = [], totalCount = 0 } = useOrders({ page, pageSize: 5, status: 'completed' });

  return (
    <>
      <ActivityAccordion data={orders} />
      <Pagination page={page} totalCount={totalCount} onPageChange={setPage} mt="40px" />
    </>
  );
}

function UnpaidOrders() {
  const [page, setPage] = useState(1);
  const { orders = [], totalCount = 0 } = useOrders({ page, pageSize: 5, status: 'unpaid' });

  return (
    <>
      <ActivityAccordion data={orders} />
      <Pagination page={page} totalCount={totalCount} onPageChange={setPage} mt="40px" />
    </>
  );
}

export default Order;
