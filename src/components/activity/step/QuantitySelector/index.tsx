'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Heading, Flex, Icon, Text, Checkbox, Button } from '@chakra-ui/react';
import { GoLocation } from 'react-icons/go';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import dayjs from 'dayjs';
import { Activity } from '@/types/activityTypes';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import TicketPicker from './TicketPicker';

interface QuantitySelectorProps {
  activity: Activity;
  createOrder: (quantity: number) => void;
}

const QuantitySelector = ({ activity, createOrder }: QuantitySelectorProps) => {
  const [isCheck, setIsCheck] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const selectArea = useTicketPurchasingStore.use.selectArea();
  const selectSubArea = useTicketPurchasingStore.use.selectSubArea();

  useEffect(() => {
    if (!selectArea || !selectSubArea) {
      router.push('/purchasing-process/select-area');
    }
  }, []);

  const actionsHandler = async (type: string) => {
    switch (type) {
      case 'back':
        router.back();
        break;
      case 'next':
        if (isCheck) {
          createOrder(quantity);
        }
        break;
      default:
        break;
    }
  };

  return (
    <VStack alignItems="flex-start" gap="40px">
      <VStack alignItems="stretch" gap="24px" bg="natural.50" borderRadius="6px" padding="40px 24px">
        <Heading as="h2" fontSize="28px">
          {activity.name}
        </Heading>
        <Box>
          <Flex alignItems="center" gap="10px" marginBottom="8px">
            <Icon as={MdOutlineCalendarMonth} />
            <Text>{dayjs(activity.events[0].startTime).format('YYYY/MM/DD(ddd.) HH:mm')}</Text>
          </Flex>
          <Flex alignItems="center" gap="10px">
            <Icon as={GoLocation} />
            <Text>{activity.location}</Text>
          </Flex>
        </Box>
        <VStack alignItems="flex-start" gap="16px">
          {selectArea && selectSubArea && (
            <TicketPicker quantity={quantity} setQuantity={setQuantity} area={selectArea} subArea={selectSubArea} />
          )}
          <Text color="primary.500">* 請注意，多視窗操作或單一頁面停留過久，可能導致購票失敗</Text>
        </VStack>
      </VStack>
      <Checkbox
        alignItems="flex-start"
        variant="normal"
        checked={isCheck}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsCheck(e.target.checked)}
      >
        我已詳細閱讀且同意會員服務條款及節目資訊公告，並同意放棄契約審閱期，且授權貴公司於條款目的範圍內，進行本人之個人資料蒐集、處理及利用。
      </Checkbox>
      <Flex justifyContent="flex-end" gap="32px" width="100%">
        <Button
          variant="outline"
          colorScheme="primary"
          width="160px"
          height="54px"
          fontSize="20px"
          onClick={() => actionsHandler('back')}
        >
          返回
        </Button>
        <Button
          colorScheme="primary"
          width="160px"
          height="54px"
          fontSize="20px"
          onClick={() => actionsHandler('next')}
          isDisabled={!isCheck}
        >
          下一步
        </Button>
      </Flex>
    </VStack>
  );
};

export default QuantitySelector;
