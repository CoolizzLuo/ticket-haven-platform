import { TicketCard } from '@/components/common/TicketCard';
import { CalendarIcon, LocationIcon } from '@/components/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@/lib/chakra';
import { dayFormat } from '@/lib/dayjs';
import { MdContentCopy } from 'react-icons/md';

export const ShareTicketModal = ({
  ticketNo,
  activityName,
  startAt,
  location,
  imageUrl,
  ...props
}: {
  ticketNo: string;
  activityName: string;
  startAt: string;
  location: string;
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}) => {
  return (
    <Modal isCentered={true} {...props}>
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader p={0}>
          <Box h="250px" bgImage={imageUrl} bgSize="cover" />
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody py="32px" px="40px">
          <Text mb="16px" textAlign="center" fontWeight="bold">
            分票資訊
          </Text>
          <TicketCard
            topContent={
              <Box p="24px">
                <Text textStyle="h5" fontWeight="bold">
                  {activityName}
                </Text>
                <Divider my="20px" borderColor="natural.400" />
                <Flex mb="12px" align="center">
                  <CalendarIcon mr="6px" /> {dayFormat(startAt)}
                </Flex>
                <Flex align="center">
                  <LocationIcon mr="6px" />
                  {location}
                </Flex>
              </Box>
            }
            bottomContent={
              <Box p="24px">
                <InputGroup size="sm" mb="12px">
                  <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                    票券編號
                  </InputLeftAddon>
                  <Input value={ticketNo} />
                </InputGroup>
                <InputGroup size="sm">
                  <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                    驗證碼
                  </InputLeftAddon>
                  <Input value={ticketNo} />
                </InputGroup>
              </Box>
            }
          />
          <Center mt="16px">
            <Button leftIcon={<MdContentCopy />}>複製</Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
