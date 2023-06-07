'use client';

import { Center, Container, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@/lib/chakra';
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
            <OrderList status="completed" />
          </TabPanel>
          <TabPanel>
            <OrderList status="unpaid" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

function OrderList({ status }: { status: 'completed' | 'unpaid' }) {
  const [page, setPage] = useState(1);
  const { orders = [], totalCount = 0, isLoading } = useOrders({ page, pageSize: 5, status });

  return (
    <>
      <Skeleton minH="150px" isLoaded={!isLoading}>
        <ActivityAccordion data={orders} />
      </Skeleton>
      <Pagination page={page} totalCount={totalCount} onPageChange={setPage} mt="40px" />
    </>
  );
}

export default Order;
