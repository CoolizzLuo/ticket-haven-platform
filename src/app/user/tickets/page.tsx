'use client';

import { Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel, Flex, Button, Skeleton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import useTickets from '@/hooks/api/useTickets';
import TicketDialog from '@/components/tickets/TicketDialog';
import TicketsAccordion from '@/components/tickets/TicketsAccordion';
import Pagination from '@/components/common/Pagination';

const TicketList = ({ isValid }: { isValid: 0 | 1 }) => {
  const PAGE_SIZE = 3;
  const [page, setPage] = useState(1);
  const { tickets = [], isLoading, totalCount = 0 } = useTickets({ page, pageSize: PAGE_SIZE, isValid });

  return (
    <Skeleton minH="150px" isLoaded={!isLoading}>
      {tickets.length ? (
        <>
          <TicketsAccordion list={tickets} />
          <Pagination pageSize={PAGE_SIZE} page={page} totalCount={totalCount} onPageChange={(page) => setPage(page)} />
        </>
      ) : (
        <Text>沒有票券</Text>
      )}
    </Skeleton>
  );
};

const Tickets = () => {
  const VALID = 1;
  const INVALID = 0;

  return (
    <Container maxW="1200px" py="80px">
      <TicketDialog />
      <Text textStyle="h1" textAlign="center" mb="80px">
        我的票券
      </Text>
      <Tabs variant="card" size="lg">
        <TabList mb="24px" justifyContent="space-between">
          <Flex>
            <Tab mr="8px">可使用</Tab>
            <Tab mr="8px">已過期</Tab>
          </Flex>
          <Button leftIcon={<AddIcon />}>兌換票券</Button>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TicketList isValid={VALID} />
          </TabPanel>
          <TabPanel>
            <TicketList isValid={INVALID} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Tickets;
