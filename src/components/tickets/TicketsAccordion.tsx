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
import { dateFormatWithoutday, isBeforeToday } from '@/lib/dayjs';
import { LuCalendarDays } from 'react-icons/lu';
import { GoLocation } from 'react-icons/go';
import { TicketGroup } from '@/hooks/api/useTickets';
import { useShareModel } from '@/app/(main)/user/tickets/ShareModalContext';
import TicketContext from '@/app/(main)/user/tickets/TicketContext';
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
              <Box display={{ md: 'flex' }} p="24px" alignItems="center" bg="white" mb="4px">
                <Box flex={1} textAlign="left">
                  <Text
                    fontWeight="600"
                    textStyle={{ base: 't5', md: 't4' }}
                    mb={{ base: '18px', md: '28px' }}
                    color="natural.900"
                  >
                    {activity.name}
                  </Text>
                  <Box display={{ md: 'flex' }} textStyle={{ base: 't6', md: 't5' }} color="natural.800">
                    <Flex alignItems="center" mr="30px" mb={{ base: '12px', md: 0 }}>
                      <Icon as={LuCalendarDays} mr="8px" />
                      <Text>{dateFormatWithoutday(activity.startAt)}</Text>
                    </Flex>
                    <Flex alignItems="center" mb={{ base: '12px', md: 0 }}>
                      <Icon as={GoLocation} mr="8px" />
                      <Text>{activity.address}</Text>
                    </Flex>
                  </Box>
                </Box>
                <AccordionButton as="div">
                  <Button rightIcon={<AccordionIcon />} width="100%">
                    票券資訊
                  </Button>
                </AccordionButton>
              </Box>

              <AccordionPanel bg="white" px="24px" py={{ md: '24px' }}>
                <TicketInfo
                  tickets={tickets}
                  isExpire={isBeforeToday(activity.endAt)}
                  onUse={(ticket) =>
                    openTicket({
                      isOpen: true,
                      content: {
                        ticketNo: ticket.ticketNo,
                        coverImageUrl: activity.coverImgUrl,
                        seat: `${ticket.subArea} ${ticket.row}排 ${ticket.seat}號`,
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
