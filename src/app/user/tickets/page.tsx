'use client';

import { Container, Heading, Tabs, Tab, TabList, TabPanels, TabPanel, Flex, Button } from '@chakra-ui/react';
import { useEffect, useReducer, useState } from 'react';
import { getTickets } from '@/api/tickets';
import { AddIcon } from '@chakra-ui/icons';
import { TicketCard } from '@/types/ticketTypes';
import TicketCardList from '@/components/tickets/TicketCardList';

type TicketState = { page: number; total: number; items: TicketCard[] };
interface InitTicketsState {
  valid: TicketState;
  invalid: TicketState;
}

const initTickets: InitTicketsState = {
  valid: { page: 1, total: 0, items: [] },
  invalid: { page: 1, total: 0, items: [] },
};

const ticketsReducer = (state: InitTicketsState, { type, payload }: { type: string; payload: TicketState }) => {
  return { ...state, [type]: payload };
};

const Tickets = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tickets, dispatch] = useReducer(ticketsReducer, initTickets);

  const onChangeHandler = (type: string, payload: TicketState) => dispatch({ type, payload });
  const fetchTickets = async ({ page, isValid, pageSize }: { page: number; isValid: boolean; pageSize: number }) => {
    try {
      const res = await getTickets({ page, isValid, pageSize });
      const { data, message, totalCount } = res.data;
      if (message === 'success') {
        const type = isValid ? 'valid' : 'invalid';
        onChangeHandler(type, { page, items: data, total: totalCount });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTickets({ page: 1, isValid: true, pageSize: 3 });
    fetchTickets({ page: 1, isValid: false, pageSize: 3 });
  }, []);

  return (
    <Container maxW="1200px" py="80px">
      <Heading as="h1" textAlign="center" mb="80px">
        我的票券
      </Heading>
      <Tabs variant="unstyled" index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList mb="24px" justifyContent="space-between">
          <Flex>
            <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
              可使用
            </Tab>
            <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
              已過期
            </Tab>
          </Flex>
          <Button color="brand.100" bg="white" border="1px" height="auto" p="12px">
            <AddIcon mr="8px" />
            兌換票券
          </Button>
        </TabList>
        <TabPanels bg="#F7F4F6" borderRadius="6px" p="32px">
          <TabPanel>
            <TicketCardList list={tickets.valid.items} />
          </TabPanel>
          <TabPanel borderRadius="6px" px="0">
            <TicketCardList list={tickets.invalid.items} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Tickets;
