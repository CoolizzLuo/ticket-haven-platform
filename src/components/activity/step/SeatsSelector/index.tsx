'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VStack, Box, HStack, Button, Heading, Select } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Area, Activity } from '@/types/activityTypes';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import AreaPicker from './AreaPicker';

interface SeatsSelectorProps {
  activity: Activity;
  seats: Area[];
}

type ButtonType = 'sale' | 'soldout';
const btnStyleMap = {
  active: {
    variant: 'solid',
  },
  default: {
    variant: 'customOutline',
    colorScheme: 'natural',
  },
};
const buttonProps = (isActive: boolean) => {
  const commonStyle = {
    borderRadius: '4px',
    padding: '12px 20px',
  };
  return isActive ? { ...btnStyleMap.active, ...commonStyle } : { ...btnStyleMap.default, ...commonStyle };
};

const formatDateLocationStr = (date: string, location: string) =>
  `${dayjs(date).format('YYYY/MM/DD(ddd) HH:mm')} ${location}`;

const SeatSelector = ({ activity, seats }: SeatsSelectorProps) => {
  const [btnStatus, setBtnStatus] = useState<ButtonType>('sale');
  const router = useRouter();
  const setSelectArea = useTicketPurchasingStore.use.setArea();
  const clickHandler = (areaId: string) => (subAreaId: string) => {
    setSelectArea(areaId, subAreaId);
    router.push('/purchasing-process/select-seats');
  };
  return (
    <VStack align="stretch" gap="48px" bg="natural.50" borderRadius="6px" padding="40px 24px">
      <Heading as="h2" fontSize="28px">
        {activity.name}
      </Heading>
      <Select defaultValue={activity.events && formatDateLocationStr(activity.events[0].startTime, activity.location)}>
        {activity.events?.map(({ startTime }) => {
          const str = formatDateLocationStr(startTime, activity.location);
          return (
            <option key={startTime} value={str}>
              {str}
            </option>
          );
        })}
      </Select>
      <Box>
        <HStack spacing="16px" marginBottom="24px">
          <Button colorScheme="primary" onClick={() => setBtnStatus('sale')} {...buttonProps(btnStatus === 'sale')}>
            販售中
          </Button>
          <Button onClick={() => setBtnStatus('soldout')} {...buttonProps(btnStatus === 'soldout')}>
            已售完
          </Button>
        </HStack>
        <VStack align="stretch" gap="24px">
          {seats.map((area) => (
            <AreaPicker key={area.id} {...area} clickHandler={clickHandler(area.id)} />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default SeatSelector;
