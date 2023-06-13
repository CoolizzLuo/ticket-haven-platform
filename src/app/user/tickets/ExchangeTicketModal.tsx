import { PlusIcon } from '@/components/icons';
import {
  Button,
  Center,
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
} from '@/lib/chakra';

export const ExchangeTicketModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const ticketNo = '123456789';
  const shareCode = '123456789';

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader pt="40px" textAlign="center">
          兌換票卷
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="32px" px="40px">
          <InputGroup size="sm" mb="12px">
            <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
              票券編號
            </InputLeftAddon>
            <Input value={ticketNo} />
          </InputGroup>
          <Skeleton minH="44px" isLoaded={!!shareCode}>
            <InputGroup size="sm">
              <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                驗證碼
              </InputLeftAddon>
              <Input value={shareCode} />
            </InputGroup>
          </Skeleton>
          <Center mt="24px">
            <Button size="sm" leftIcon={<PlusIcon />}>
              兌換
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
