import { CheckSquareIcon } from '@/components/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from '@/lib/chakra';
import { TicketCard } from '@/components/common/TicketCard';
import { TicketInfo } from './types';

export const CheckInModal = ({
  isOpen,
  onClose,
  onCheckIn,
  data,
}: {
  isOpen: boolean;
  data?: TicketInfo;
  onClose: () => void;
  onCheckIn: () => void;
}) => {
  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="natural.100">
        <ModalHeader fontSize="lg" textAlign="center">
          票券資訊
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py="32px" px="40px">
          <TicketCard
            h="calc(100vh - 68px - 108px - 64px)"
            outerBgColor="natural.100"
            bgColor="white"
            textStyle="t6"
            fontWeight="bold"
            topContent={
              <SimpleGrid templateColumns="80px 1fr" rowGap="16px" columnGap="12px" py="24px" px="16px">
                <Text textAlign="right">活動名稱</Text>
                <Text>{data?.activityName}</Text>
                <Text textAlign="right">票券編號</Text>
                <Text>{data?.ticketNo}</Text>
                <Text textAlign="right">座位</Text>
                <Text>
                  {data?.subAreaName} {data?.row}排 {data?.seat}號
                </Text>
              </SimpleGrid>
            }
            bottomContent={
              <SimpleGrid templateColumns="80px 1fr" rowGap="16px" columnGap="12px" py="24px" px="16px">
                <Text textAlign="right">姓名</Text>
                <Text>{data?.user?.name}</Text>
                <Text textAlign="right">Email</Text>
                <Text>{data?.user?.email}</Text>
                <Text textAlign="right">狀態</Text>
                <Text>{data?.isUsed ? '已簽到' : '未簽到'}</Text>
              </SimpleGrid>
            }
          />
        </ModalBody>
        <ModalFooter justifyContent="center" py="32px">
          {data?.isUsed ? (
            <Button minW="110px" size="sm" disabled={true} onClick={onClose}>
              關閉
            </Button>
          ) : (
            <Button minW="110px" size="sm" leftIcon={<CheckSquareIcon />} onClick={onCheckIn}>
              簽到
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
