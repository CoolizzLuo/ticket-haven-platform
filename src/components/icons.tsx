import { ComponentProps, ComponentType } from 'react';
import { GoLocation } from 'react-icons/go';
import { BsCheckLg } from 'react-icons/bs';
import { LuCalendarDays } from 'react-icons/lu';
import { GiTicket } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import { Icon } from '@/lib/chakra';

const createIcon = (Source: ComponentType) =>
  function IconWrap(props: ComponentProps<typeof Icon>) {
    return <Icon as={Source} {...props} />;
  };

export const CheckIcon = createIcon(BsCheckLg);
export const LocationIcon = createIcon(GoLocation);
export const CalendarIcon = createIcon(LuCalendarDays);
export const TicketIcon = createIcon(GiTicket);
export const MdDeleteIcon = createIcon(MdDelete);
