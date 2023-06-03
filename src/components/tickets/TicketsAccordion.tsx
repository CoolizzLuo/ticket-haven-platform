import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
  Button,
  Icon,
} from '@chakra-ui/react';
import { TicketCard } from '@/types/ticketTypes';
import { dayFormat } from '@/lib/dayjs';
import { LuCalendarDays } from 'react-icons/lu';
import { GoLocation } from 'react-icons/go';
import TicketInfo from './TicketInfo';

const TicketsAccordion = ({ list }: { list: TicketCard[] }) => {
  return (
    <Accordion allowMultiple>
      {list &&
        list.map((item: TicketCard) => {
          return (
            <AccordionItem borderColor="transparent" mb="24px" key={item.orderId} bg="none">
              <Flex p="24px" align="center" bg="white" mb="4px">
                <Box flex={1} textAlign="left">
                  <Text fontWeight="600" fontSize="24px" mb="28px" color="natural.900">
                    {item.name}
                  </Text>
                  <Flex fontSize="20px" color="natural.800">
                    <Flex alignItems="center" mr="30px">
                      <Icon as={LuCalendarDays} mr="8px" />
                      <Text textStyle="t5">{dayFormat(item.startAt)}</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Icon as={GoLocation} mr="8px" />
                      <Text>{item.address}</Text>
                    </Flex>
                  </Flex>
                </Box>
                <AccordionButton>
                  <Button rightIcon={<AccordionIcon />}>票券資訊</Button>
                </AccordionButton>
              </Flex>

              <AccordionPanel bg="white" p="24px">
                <TicketInfo tickets={item.tickets} />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default TicketsAccordion;
