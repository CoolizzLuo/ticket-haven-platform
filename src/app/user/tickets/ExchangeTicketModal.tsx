import { useForm, SubmitHandler } from 'react-hook-form';
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
} from '@/lib/chakra';

type ExchangeFormValues = {
  ticketNo: string;
  shareCode: string;
};

export const ExchangeTicketModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit } = useForm<ExchangeFormValues>({
    defaultValues: {
      ticketNo: '',
      shareCode: '',
    },
  });

  const onSubmit: SubmitHandler<ExchangeFormValues> = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader pt="40px" textAlign="center">
          兌換票卷
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="32px" px="40px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup size="sm" mb="12px">
              <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                票券編號
              </InputLeftAddon>
              <Input {...register('ticketNo', { required: true })} />
            </InputGroup>
            <InputGroup size="sm">
              <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                驗證碼
              </InputLeftAddon>
              <Input {...register('shareCode', { required: true })} />
            </InputGroup>
            <Center mt="24px">
              <Button type="submit" size="sm" leftIcon={<PlusIcon />}>
                兌換
              </Button>
            </Center>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
