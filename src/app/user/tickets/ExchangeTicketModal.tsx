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
  Text,
} from '@/lib/chakra';
import api from '@/lib/api';

type ExchangeFormValues = {
  ticketNo: string;
  shareCode: string;
};

export const ExchangeTicketModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ExchangeFormValues>({
    defaultValues: {
      ticketNo: '',
      shareCode: '',
    },
  });

  const onSubmit: SubmitHandler<ExchangeFormValues> = async (data) => {
    try {
      await api.exchangeTicket({ params: data });
      onClose();
    } catch (error) {
      setError('root.submitError', { type: 'fail' });
    }
  };

  const clearSubmitError = () => {
    clearErrors('root.submitError');
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
              <Input {...register('ticketNo', { required: true, onChange: clearSubmitError })} />
            </InputGroup>
            <InputGroup size="sm">
              <InputLeftAddon w="90px" justifyContent="center" bgColor="natural.600" color="white">
                驗證碼
              </InputLeftAddon>
              <Input {...register('shareCode', { required: true, onChange: clearSubmitError })} />
            </InputGroup>
            <Center mt="24px" flexDirection="column">
              <Button type="submit" size="sm" leftIcon={<PlusIcon />} disabled={isSubmitting}>
                兌換
              </Button>
              {errors?.root?.submitError && (
                <Text mt="8px" color="alert">
                  票卷編號或驗證碼錯誤
                </Text>
              )}
            </Center>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
