import { useEffect, useRef, useState, useContext } from 'react';
import QRCode from 'react-qr-code';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Text,
  Icon,
  Image,
  Divider,
  HStack,
  VStack,
  Stack,
} from '@chakra-ui/react';
import { createTicketCode } from '@/api/tickets';

import { dateFormatWithoutday } from '@/lib/dayjs';
import { LuRefreshCw, LuCalendarDays } from 'react-icons/lu';
import { GoLocation } from 'react-icons/go';
import { GrClose } from 'react-icons/gr';
import useDialogStore from '@/stores/dialogStore';
import TicketContext from '@/app/(main)/user/tickets/TicketContext';

const circleStyle = {
  content: `''`,
  position: 'absolute',
  border: '2px solid',
  borderColor: 'natural.500',
  w: '20px',
  h: '20px',
  backgroundColor: 'white',
  borderRadius: '50%',
};

const TicketDialog = () => {
  const { openAlert } = useDialogStore();
  const cancelRef = useRef(null);
  const [qrcode, setQrcode] = useState<string>('');

  // context
  const { dialogState, closeDialog } = useContext(TicketContext);
  const { isOpen, content } = dialogState;

  const getQrcode = async (ticketCode: string) => {
    try {
      const { message, data } = await createTicketCode(ticketCode)<void, void, { message: string; data: any }>();
      if (message === 'success') {
        setQrcode(data);
      } else {
        openAlert(message);
      }
    } catch (error) {
      openAlert('系統發生異常');
    }
  };

  useEffect(() => {
    if (isOpen && content.ticketNo) {
      getQrcode(content.ticketNo);
    }
  }, [isOpen, content.ticketNo]);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={closeDialog}>
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius="lg" maxWidth="390px">
          <AlertDialogHeader p={0} maxH="270px">
            <Image src={content.coverImageUrl} alt={`${content.name}coverImage`} borderTopRadius="lg" />
            <Icon as={GrClose} position="absolute" top="40px" right="40px" cursor="pointer" onClick={closeDialog} />
          </AlertDialogHeader>
          <AlertDialogBody pb="32px" px="40px">
            <VStack py="32px" gap="16px">
              <Text textStyle="t6" fontWeight="700">
                電子票券
              </Text>
              <Box overflow="hidden" w="100%">
                <Stack
                  w="100%"
                  border="2px solid"
                  borderColor="natural.500"
                  borderRadius="8px"
                  pb="16px"
                  position="relative"
                  _before={{ ...circleStyle, top: '50%', right: '0', transform: 'translateX(50%)' }}
                  _after={{ ...circleStyle, top: '50%', left: '0', transform: 'translateX(-50%)' }}
                >
                  <Box
                    borderBottom="1px dashed"
                    py="20px"
                    borderRadius="8px 8px 0 0"
                    borderColor="natural.600"
                    bg="white"
                  >
                    {content.ticketNo && (
                      <QRCode
                        value={qrcode}
                        style={{ margin: 'auto', height: 'auto', maxWidth: '140px', paddingBottom: '12px' }}
                      />
                    )}
                    <Text color="natural.800" textStyle="h5" textAlign="center">
                      {content.seat}
                    </Text>
                  </Box>
                  <Box p="20px" w="100%" mb="16px">
                    <Text textStyle="t6" borderBottom="">
                      {content.name}
                    </Text>
                    <Divider my="16px" />
                    <HStack alignItems="center" mb="8px">
                      <Icon as={LuCalendarDays} mr="8px" />
                      <Text textStyle="t6"> {dateFormatWithoutday(content.startAt)}</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <Icon as={GoLocation} mr="8px" />
                      <Text textStyle="t6"> {content.address}</Text>
                    </HStack>
                  </Box>
                </Stack>
              </Box>

              <Button minW={90} onClick={() => getQrcode(content.ticketNo)} leftIcon={<LuRefreshCw />}>
                重新整理
              </Button>
            </VStack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default TicketDialog;
