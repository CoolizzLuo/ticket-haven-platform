import { Ticket } from '@/types/ticketTypes';
import { Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tag } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const TicketTable = ({ tickets, showTicket }: { tickets: Ticket[]; showTicket: (item: Ticket) => void }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead color="natraul.700">
          <Tr>
            <Th>票券編號</Th>
            <Th>座位</Th>
            <Th>狀態</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tickets.map((ticket) => (
            <Tr key={ticket.ticketNo}>
              <Td>#{ticket.ticketNo}</Td>
              <Td>{ticket.seat}</Td>
              <Td>
                {ticket.isShare && (
                  <Tag size="md" px="12px" py="4px" bg="yellow.light" color="yellow.dark">
                    分票中
                  </Tag>
                )}
                {ticket.isUsed && (
                  <Tag size="md" px="12px" py="4px" bg="natural.100" color="natural.500">
                    已使用
                  </Tag>
                )}
                {!ticket.isUsed && !ticket.isShare && (
                  <Tag size="md" px="12px" py="4px" bg="natural.100" color="natural.800">
                    未使用
                  </Tag>
                )}
              </Td>
              <Td>
                <Button
                  color="primary.500"
                  bg="white"
                  border="1px"
                  _hover={{ bg: 'primary.500', color: 'white' }}
                  height="auto"
                  py="12px"
                  px="16px"
                  mr="16px"
                  isDisabled={ticket.isShare || ticket.isUsed}
                  onClick={() => showTicket(ticket)}
                >
                  <InfoIcon mr="8px" />
                  使用
                </Button>
                <Button
                  color="primary.500"
                  bg="white"
                  border="1px"
                  height="auto"
                  py="12px"
                  px="16px"
                  isDisabled={ticket.isShare || ticket.isUsed}
                  _hover={{ bg: 'primary.500', color: 'white' }}
                >
                  <InfoIcon mr="8px" />
                  分票
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable;
