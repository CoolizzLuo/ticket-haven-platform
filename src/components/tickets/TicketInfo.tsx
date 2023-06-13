import { List, ListItem, Button, Tag, Text, SimpleGrid, Box, Icon } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { LuQrCode } from 'react-icons/lu';
import { SlActionRedo } from 'react-icons/sl';
import { isAfterToday } from '@/lib/dayjs';
import TicketContext from '@/app/user/tickets/TicketContext';
import { ETicketInfo as TicketProps } from '@/types/ticketTypes';
import { ShareTicketModal } from '@/app/user/tickets/ShareTicketModal';
import { useShareModel } from '@/app/user/tickets/ShareModalContext';

const TicketInfo = ({ tickets }: { tickets: TicketProps[] }) => {
  const { openTicket } = useContext(TicketContext);
  const { open: openShareModal } = useShareModel();

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
                  variant="outLine"
                  mr="16px"
                  size="sm"
                  isDisabled={ticket.isShare || ticket.isUsed || !isAfterToday(ticket.startAt)}
                  onClick={() => openTicket({ content: ticket, isOpen: true })}
                >
                  <Icon as={LuQrCode} mr="8px" />
                  使用
                </Button>
                <Button
                  variant="outLine"
                  size="sm"
                  isDisabled={ticket.isShare || ticket.isUsed || !isAfterToday(ticket.startAt)}
                  onClick={() =>
                    openShareModal({ ...ticket, imageUrl: ticket.coverImageUrl, activityName: ticket.name })
                  }
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
