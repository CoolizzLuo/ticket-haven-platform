'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VStack, Box, HStack, Button, Heading, Select } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Area, Activity, SubArea } from '@/types/activityTypes';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import AreaPicker from './AreaPicker';

interface SeatsSelectorProps {
  activity: Activity;
  seats: Area[];
  updateSeats: (id: string) => void;
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

const SeatSelector = ({ activity, seats, updateSeats }: SeatsSelectorProps) => {
  const [seatsFiltered, setSeatsFiltered] = useState<Area[]>([]);
  const [btnStatus, setBtnStatus] = useState<ButtonType>('sale');
  const router = useRouter();
  const setSelectArea = useTicketPurchasingStore.use.setArea();

  const clickHandler = (area: Area) => (subArea: SubArea) => {
    setSelectArea(area, subArea);
    router.push('/purchasing-process/select-seats');
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSeats(e.target.value);
  };

  useEffect(() => {
    const conditions = (remainingSeats: number) => {
      if (btnStatus === 'soldout') {
        return remainingSeats === 0;
      }
      if (btnStatus === 'sale') {
        return remainingSeats > 0;
      }
    };
    if (seats.length > 0) {
      const filtered = seats.map((area: Area) => {
        const filterdSubAreas = area.subAreas.reduce((acc: SubArea[], subArea: SubArea) => {
          if (conditions(subArea.remainingSeats)) {
            acc.push(subArea);
          }
          return acc;
        }, []);
        return { ...area, subAreas: filterdSubAreas };
      }, []);
      setSeatsFiltered(filtered);
    }
  }, [seats, btnStatus, setSeatsFiltered]);
  return (
    <VStack align="stretch" gap="48px" bg="natural.50" borderRadius="6px" padding="40px 24px">
      <Heading as="h2" fontSize="28px">
        {activity.name}
      </Heading>
      <Select defaultValue={activity.events && activity.events[0].id} onChange={selectHandler}>
        {activity.events?.map(({ startTime, id }) => {
          const str = formatDateLocationStr(startTime, activity.location);
          return (
            <option key={startTime} value={id}>
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
          {seatsFiltered.map((area) => (
            <AreaPicker key={area.id} {...area} clickHandler={clickHandler(area)} />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default SeatSelector;
