import {
  useBreakpointValue,
  List,
  ListItem,
  Button,
  Tag,
  Text,
  SimpleGrid,
  Box,
  Icon,
  InputGroup,
  InputLeftAddon,
  Input,
  Flex,
} from '@chakra-ui/react';
import { LuQrCode } from 'react-icons/lu';
import { SlActionRedo } from 'react-icons/sl';
import { Ticket } from '@/hooks/api/useTickets';

const TicketStatusTag = ({ isShared, isUsed }: { isShared: boolean; isUsed: boolean }) => {
  return (
    <>
      {isShared && <Tag variant="warning">已分票</Tag>}
      {!isShared && isUsed && <Tag variant="light">已使用</Tag>}
      {!isShared && !isUsed && <Tag variant="info">未使用</Tag>}
    </>
  );
};

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
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      {!isMobile && (
        <SimpleGrid columns={4} borderBottom="1px" borderColor="natural.300" py="20px">
          <Text textStyle="h6">票券編號</Text>
          <Text textStyle="h6">座位</Text>
          <Text textStyle="h6">狀態</Text>
          <Text textStyle="h6">操作</Text>
        </SimpleGrid>
      )}

      <List>
        {tickets.map((ticket) => (
          <ListItem borderBottom="1px" borderColor="natural.300" py="24px" key={ticket.ticketNo}>
            <SimpleGrid columns={{ base: 1, md: 4 }} alignItems="center">
              {!isMobile ? (
                <>
                  <Text>#{ticket.ticketNo}</Text>
                  <Text>
                    {ticket.subArea} {ticket.row}排 {ticket.seat}號
                  </Text>
                  <Box>
                    <TicketStatusTag isShared={ticket.isShared} isUsed={ticket.isUsed} />
                  </Box>
                </>
              ) : (
                <>
                  <Flex justifyContent="end" mb="20px">
                    <TicketStatusTag isShared={ticket.isShared} isUsed={ticket.isUsed} />
                  </Flex>
                  <InputGroup size="sm" mb="20px">
                    <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                      票券編號
                    </InputLeftAddon>
                    <Input value={ticket.ticketNo} readOnly />
                  </InputGroup>
                  <InputGroup size="sm" mb="20px">
                    <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                      座位
                    </InputLeftAddon>
                    <Input value={`${ticket.subArea} ${ticket.row}排 ${ticket.seat}號`} readOnly />
                  </InputGroup>
                </>
              )}

              <Box display={{ base: 'flex', md: 'block' }}>
                <Button
                  variant="outLine"
                  mr="16px"
                  size="sm"
                  width={{ base: '50%', md: 'auto' }}
                  isDisabled={ticket.isShared || ticket.isUsed || isExpire}
                  onClick={() => onUse(ticket)}
                >
                  <Icon as={LuQrCode} mr="8px" />
                  使用
                </Button>
                <Button
                  variant="outLine"
                  size="sm"
                  width={{ base: '50%', md: 'auto' }}
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
