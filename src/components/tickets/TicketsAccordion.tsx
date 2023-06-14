import { useContext } from 'react';
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
import { dayFormat, isBeforeToday } from '@/lib/dayjs';
import { LuCalendarDays } from 'react-icons/lu';
import { GoLocation } from 'react-icons/go';
import { TicketGroup } from '@/hooks/api/useTickets';
import { useShareModel } from '@/app/user/tickets/ShareModalContext';
import TicketContext from '@/app/user/tickets/TicketContext';
import TicketInfo from './TicketInfo';

const TicketsAccordion = ({ list }: { list: TicketGroup[] }) => {
  const { open: openShareModal } = useShareModel();
  const { openTicket } = useContext(TicketContext);

  return (
    <Accordion allowMultiple>
      {list &&
        list.map(({ activity, tickets }) => {
          return (
            <AccordionItem borderColor="transparent" mb="24px" key={activity.eventId} bg="none">
              <Flex p="24px" align="center" bg="white" mb="4px">
                <Box flex={1} textAlign="left">
                  <Text fontWeight="600" fontSize="24px" mb="28px" color="natural.900">
                    {activity.name}
                  </Text>
                  <Flex fontSize="20px" color="natural.800">
                    <Flex alignItems="center" mr="30px">
                      <Icon as={LuCalendarDays} mr="8px" />
                      <Text textStyle="t5">{dayFormat(activity.startAt)}</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Icon as={GoLocation} mr="8px" />
                      <Text>{activity.address}</Text>
                    </Flex>
                  </Flex>
                </Box>
                <AccordionButton as="div">
                  <Button rightIcon={<AccordionIcon />}>票券資訊</Button>
                </AccordionButton>
              </Flex>

              <AccordionPanel bg="white" p="24px">
                <TicketInfo
                  tickets={tickets}
                  isExpire={isBeforeToday(activity.endAt)}
                  onUse={(ticket) =>
                    openTicket({
                      isOpen: true,
                      content: {
                        ticketNo: ticket.ticketNo,
                        coverImageUrl: activity.coverImgUrl,
                        seat: `${ticket.row}排 ${ticket.seat}號`,
                        name: activity.name,
                        address: activity.address,
                        isUsed: ticket.isUsed,
                        isShare: ticket.isShared,
                        startAt: activity.startAt,
                      },
                    })
                  }
                  onShare={(ticket) =>
                    openShareModal({
                      ticketNo: ticket.ticketNo,
                      activityName: activity.name,
                      startAt: activity.startAt,
                      address: activity.address,
                      imageUrl: activity.coverImgUrl,
                    })
                  }
                />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default TicketsAccordion;
