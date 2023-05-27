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
} from '@chakra-ui/react';
import { TicketCard } from '@/types/ticketTypes';
import { CalendarIcon, LockIcon } from '@chakra-ui/icons';
import { dayFormat } from '@/lib/dayjs';
import TicketTable from './TicketTable';

const TicketCardList = ({ list }: { list: TicketCard[] }) => {
  return (
    <Accordion allowMultiple={true} defaultIndex={[0]}>
      {list &&
        list.map((item: TicketCard) => {
          return (
            <AccordionItem borderColor="transparent" mb="24px" key={item.orderId}>
              <AccordionButton
                bg="white"
                mb="4px"
                borderRadius="6px 6px 0 0"
                justifyContent="space-between"
                _hover={{ bg: 'white' }}
              >
                <Box textAlign="left">
                  <Text fontWeight="600" fontSize="24px" mb="28px" color="natural.900">
                    {item.name}
                  </Text>
                  <Flex fontSize="20px" color="natural.800">
                    <Flex alignItems="center" mr="30px">
                      <CalendarIcon mr="8px" /> <Text>{dayFormat(item.startAt)}</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <LockIcon mr="8px" />
                      <Text>{item.address}</Text>
                    </Flex>
                  </Flex>
                </Box>
                <Button
                  fontSize={20}
                  _hover={{ bg: 'primary.500' }}
                  color="white"
                  bg="primary.500"
                  height="auto"
                  px="12px"
                  py="8px"
                >
                  票券資訊
                  <AccordionIcon />
                </Button>
              </AccordionButton>

              <AccordionPanel bg="white">
                <TicketTable tickets={item.tickets} />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default TicketCardList;
