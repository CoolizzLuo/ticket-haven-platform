import { List, ListItem, Button, Tag, Text, SimpleGrid, Box, Icon } from '@chakra-ui/react';
import { LuQrCode } from 'react-icons/lu';
import { SlActionRedo } from 'react-icons/sl';
import { Ticket } from '@/hooks/api/useTickets';

const TicketInfo = ({
  tickets,
  isExpire,
  onUse,
  onShare,
}: {
  tickets: Ticket[];
  isExpire: boolean;
  onUse: (ticket: Ticket) => void;
  onShare: (ticket: Ticket) => void;
}) => {
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
                {ticket.isShared ? (
                  <Tag variant="warning">已分票</Tag>
                ) : ticket.isUsed ? (
                  <Tag variant="light">已使用</Tag>
                ) : (
                  <Tag variant="info">未使用</Tag>
                )}
              </Box>
              <Box>
                <Button
                  variant="outLine"
                  mr="16px"
                  size="sm"
                  isDisabled={ticket.isShared || ticket.isUsed || isExpire}
                  onClick={() => onUse(ticket)}
                >
                  <Icon as={LuQrCode} mr="8px" />
                  使用
                </Button>
                <Button
                  variant="outLine"
                  size="sm"
                  isDisabled={ticket.isShared || ticket.isUsed || !!ticket.sharedBy || isExpire}
                  onClick={() => onShare(ticket)}
                >
                  <Icon as={SlActionRedo} mr="8px" /> 分票
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
