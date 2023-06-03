import { Ticket } from '@/types/ticketTypes';
import { List, ListItem, Button, Tag, Text, SimpleGrid, Box, Icon } from '@chakra-ui/react';
import { LuQrCode } from 'react-icons/lu';
import { SlActionRedo } from 'react-icons/sl';

const TicketInfo = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <Box>
      <SimpleGrid columns={4} borderBottom="1px" borderColor="natural.300" py="20px">
        <Text textStyle="h6">票券編號</Text>
        <Text textStyle="h6">座位</Text>
        <Text textStyle="h6">狀態</Text>
        <Text textStyle="h6">操作</Text>
      </SimpleGrid>

      <List>
        {tickets.map((ticket) => (
          <ListItem borderBottom="1px" borderColor="natural.300" py="20px" key={ticket.ticketNo}>
            <SimpleGrid columns={4} alignItems="center">
              <Text>#{ticket.ticketNo}</Text>
              <Text>{ticket.seat}</Text>
              <Box>
                {ticket.isShare && <Tag variant="warning">分票中</Tag>}
                {ticket.isUsed && <Tag variant="light">已使用</Tag>}
                {!ticket.isUsed && !ticket.isShare && <Tag variant="info">未使用</Tag>}
              </Box>
              <Box>
                <Button
                  color="primary.500"
                  bg="white"
                  border="1px"
                  _hover={{ bg: 'primary.500', color: 'white' }}
                  mr="16px"
                  isDisabled={ticket.isShare || ticket.isUsed}
                >
                  <Icon as={LuQrCode} mr="8px" />
                  使用
                </Button>
                <Button
                  color="primary.500"
                  bg="white"
                  border="1px"
                  isDisabled={ticket.isShare || ticket.isUsed}
                  _hover={{ bg: 'primary.500', color: 'white' }}
                >
                  <Icon as={SlActionRedo} mr="8px" />
                  分票
                </Button>
              </Box>
            </SimpleGrid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TicketInfo;
