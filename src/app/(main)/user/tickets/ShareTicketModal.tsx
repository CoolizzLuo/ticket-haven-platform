import { useState, useEffect } from 'react';
import { TicketCard } from '@/components/common/TicketCard';
import { CalendarIcon, CopyIcon, LocationIcon } from '@/components/icons';
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
  Skeleton,
  Text,
} from '@/lib/chakra';
import { dayFormat } from '@/lib/dayjs';
import api from '@/lib/api';
import { copyTextToClipboard } from '@/lib/copyTextToClipboard';
import { useShareModel } from './ShareModalContext';

export const ShareTicketModal = () => {
  const { isOpen, close, data } = useShareModel();
  const { imageUrl, activityName, startAt, address, ticketNo } = data;

  const [shareCode, setShareCode] = useState('');

  useEffect(() => {
    if (ticketNo) {
      api.createShareCode(ticketNo).then(({ data }) => {
        setShareCode(data.shareCode);
      });
    } else {
      setShareCode('');
    }
  }, [ticketNo]);

  const copyShareCode = () => {
    copyTextToClipboard(`輸入票卷編號和驗證碼進行取票\n票卷編號：${ticketNo}\n驗證碼：${shareCode}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered={true}>
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader p={0}>
          <Box h="250px" bgImage={imageUrl} bgSize="cover" bgPosition="center" />
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
                  {address}
                </Flex>
              </Box>
            }
            bottomContent={
              <Box p="24px">
                <InputGroup size="sm" mb="12px">
                  <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                    票券編號
                  </InputLeftAddon>
                  <Input value={ticketNo} readOnly />
                </InputGroup>
                <Skeleton minH="44px" isLoaded={!!shareCode}>
                  <InputGroup size="sm">
                    <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                      驗證碼
                    </InputLeftAddon>
                    <Input value={shareCode} readOnly />
                  </InputGroup>
                </Skeleton>
              </Box>
            }
          />
          <Center mt="16px">
            <Button size="sm" leftIcon={<CopyIcon />} onClick={copyShareCode}>
              複製
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
