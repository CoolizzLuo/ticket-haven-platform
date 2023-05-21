import { useState } from 'react';
import { VStack, Box, HStack, Button, Heading, Select } from '@chakra-ui/react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import AreaPicker from './AreaPicker';
import { Area, Event } from './types';

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
  `${format(new Date(date), 'yyyy/MM/dd(eeeee) kk:mm', { locale: zhTW })} ${location}`;

const SeatSelector = ({ activityName, events, areas }: { activityName: string; events: Event[]; areas: Area[] }) => {
  const [btnStatus, setBtnStatus] = useState<ButtonType>('sale');
  return (
    <VStack align="stretch" gap="48px" bg="gray1.50" borderRadius="6px" padding="40px 24px">
      <Heading as="h2" fontSize="28px">
        {activityName}
      </Heading>
      <Select variant="selectPrimary" defaultValue={formatDateLocationStr(events[0].startAt, events[0].location)}>
        {events.map(({ startAt, location }) => {
          const str = formatDateLocationStr(startAt, location);
          return (
            <option key={startAt} value={str}>
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
            <AreaPicker key={id} name={name} price={price} subAreas={subAreas} />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default SeatSelector;
