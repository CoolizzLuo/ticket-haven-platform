'use client';

import { Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel, Flex, Button, Skeleton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState, useMemo } from 'react';
import TicketDialog from '@/components/tickets/TicketDialog';
import TicketsAccordion from '@/components/tickets/TicketsAccordion';
import Pagination from '@/components/common/Pagination';
import useTicketGroups from '@/hooks/api/useTickets';
import TicketContext from './TicketContext';
import useTicketContext from './useTicketContext';
import { ShareModalProvider } from './ShareModalContext';
import { ShareTicketModal } from './ShareTicketModal';
import { ExchangeTicketModal } from './ExchangeTicketModal';

const INVALID = 0;
const VALID = 1;

const TicketList = ({ isValid }: { isValid: 0 | 1 }) => {
  const PAGE_SIZE = 3;
  const [page, setPage] = useState(1);
  const { ticketGroups = [], isLoading, totalCount = 0 } = useTicketGroups({ page, pageSize: PAGE_SIZE, isValid });
  // detailContext
  const { dialogState, closeDialog, openTicket } = useTicketContext();
  const contextValue = useMemo(
    () => ({ dialogState, closeDialog, openTicket }),
    [dialogState, closeDialog, openTicket],
  );

  return (
    <Skeleton minH="150px" isLoaded={!isLoading}>
      <TicketContext.Provider value={contextValue}>
        {ticketGroups.length ? (
          <>
            <TicketDialog />
            <TicketsAccordion list={ticketGroups} />
            <Pagination
              pageSize={PAGE_SIZE}
              page={page}
              totalCount={totalCount}
              onPageChange={(page) => setPage(page)}
            />
          </>
        ) : (
          <Text>沒有票券</Text>
        )}
      </TicketContext.Provider>
    </Skeleton>
  );
};

const Tickets = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container maxW="container.lg" py={{ base: '40px', md: '120px' }} bgColor={{ base: 'natural.50', md: 'white' }}>
      <Text textStyle={{ base: 'h4', md: 'h1' }} textAlign="center" mb={{ base: '20px', md: '80px' }}>
        我的票券
      </Text>
      <ShareModalProvider>
        <Tabs variant="card" size="lg">
          <TabList mb="24px" justifyContent="space-between" flexWrap="wrap">
            <Flex order={{ base: '2', md: '1' }}>
              <Tab mr="8px">可使用</Tab>
              <Tab mr="8px">已過期</Tab>
            </Flex>
            <Button leftIcon={<AddIcon />} order={{ base: '1', md: '2' }} onClick={() => setIsOpen(true)}>
              兌換票券
            </Button>
          </TabList>
          <TabPanels>
            <TabPanel p={{ base: 0, md: '32px' }}>
              <TicketList isValid={VALID} />
            </TabPanel>
            <TabPanel>
              <TicketList isValid={INVALID} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <ShareTicketModal />
        <ExchangeTicketModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </ShareModalProvider>
    </Container>
  );
};

export default Tickets;
