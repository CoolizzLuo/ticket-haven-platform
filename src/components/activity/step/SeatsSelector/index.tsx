import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { VStack, Box, HStack, Button, Heading, Select } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { Area, Activity, SubArea } from '@/types/activityTypes';
import { areaCookie, ChoseArea } from '@/api/activities';
import AreaPicker from './AreaPicker';

dayjs.locale('zh-tw');

interface SeatsSelectorProps {
  activity: Activity;
  areas: Area[];
}

type ButtonType = 'sale' | 'soldout';
const btnStyleMap = {
  active: {
    variant: 'buttonPrimary',
  },
  default: {
    variant: 'grayBtnOutline',
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
  `${dayjs(date).format('YYYY/MM/DD(dd) HH:mm')} ${location}`;

const SeatSelector = ({ activity, areas }: SeatsSelectorProps) => {
  const [btnStatus, setBtnStatus] = useState<ButtonType>('sale');
  const router = useRouter();
  const pathName = usePathname();
  const clickHandler = (selectArea: ChoseArea) => {
    localStorage.setItem('activity-choseArea', JSON.stringify(selectArea));
    areaCookie.setChoseArea(selectArea);
    router.push(pathName.replace(/\d$/g, '2'));
  };
  return (
    <VStack align="stretch" gap="48px" bg="gray1.50" borderRadius="6px" padding="40px 24px">
      <Heading as="h2" fontSize="28px">
        {activity.name}
      </Heading>
      <Select
        variant="selectPrimary"
        defaultValue={formatDateLocationStr(activity.events[0].startTime, activity.location)}
      >
        {activity.events.map(({ startTime }) => {
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
          <Button onClick={() => setBtnStatus('sale')} {...buttonProps(btnStatus === 'sale')}>
            販售中
          </Button>
          <Button onClick={() => setBtnStatus('soldout')} {...buttonProps(btnStatus === 'soldout')}>
            已售完
          </Button>
        </HStack>
        <VStack align="stretch" gap="24px">
          {areas.map(({ name, price, subAreas, id }) => (
            <AreaPicker key={id} name={name} price={price} subAreas={subAreas} clickHandler={clickHandler} />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default SeatSelector;
