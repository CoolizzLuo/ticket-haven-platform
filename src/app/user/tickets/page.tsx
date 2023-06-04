'use client';

import { Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel, Flex, Button, Center } from '@chakra-ui/react';
import { useEffect, useReducer, useState } from 'react';
import { getTickets } from '@/api/tickets';
import { AddIcon } from '@chakra-ui/icons';
import { TicketCard } from '@/types/ticketTypes';
import TicketsAccordion from '@/components/tickets/TicketsAccordion';

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
  const fetchTickets = async ({ page, isValid, pageSize }: { page: number; isValid: number; pageSize: number }) => {
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
    fetchTickets({ page: 1, isValid: 1, pageSize: 3 });
    fetchTickets({ page: 1, isValid: 0, pageSize: 3 });
  }, []);

  return (
    <Container maxW="1200px" py="80px">
      <Center mb="80px">
        <Text textStyle="h1">我的票券</Text>
      </Center>
      <Tabs variant="card" size="lg" index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList mb="24px" justifyContent="space-between">
          <Flex>
            <Tab mr="8px">可使用</Tab>
            <Tab mr="8px">已過期</Tab>
          </Flex>
          <Button leftIcon={<AddIcon />}>兌換票券</Button>
        </TabList>
        <TabPanels>
          <TabPanel>
            {tickets.valid.items.length ? <TicketsAccordion list={tickets.valid.items} /> : <Text>沒有票券</Text>}
          </TabPanel>
          <TabPanel>
            {tickets.invalid.items.length ? <TicketsAccordion list={tickets.invalid.items} /> : <Text>沒有票券</Text>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Tickets;
