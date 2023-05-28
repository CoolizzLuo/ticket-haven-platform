import { useRef } from 'react';
import QRCode from 'react-qr-code';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import { dayFormat } from '@/lib/dayjs';

type Ticket = {
  name: string;
  startAt: string;
  address: string;
  seat: string;
  ticketNo: string;
};

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  content: Ticket | undefined;
};

const TicketDetail = ({ isOpen, closeDialog, content }: Props) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={closeDialog}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            電子票券
          </AlertDialogHeader>
          <AlertDialogBody>
            <Heading size="md" mb="16px">
              {content?.name}
            </Heading>
            <Text>{content?.startAt && dayFormat(content?.startAt)}</Text>
            <Text>{content?.address}</Text>
            <Box style={{ background: 'white', padding: '16px' }}>
              {content?.ticketNo && <QRCode value={content?.ticketNo} style={{ margin: 'auto' }} />}
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button minW={90} onClick={closeDialog}>
              重新整理
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default TicketDetail;
