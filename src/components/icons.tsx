import { GoLocation } from 'react-icons/go';
import { BsCheckLg } from 'react-icons/bs';
import { LuCalendarDays } from 'react-icons/lu';
import { Icon } from '@/lib/chakra';
import { ComponentProps, ComponentType } from 'react';

const createIcon = (Source: ComponentType) =>
  function IconWrap(props: ComponentProps<typeof Icon>) {
    return <Icon as={Source} {...props} />;
  };

export const CheckIcon = createIcon(BsCheckLg);
export const LocationIcon = createIcon(GoLocation);
export const CalendarIcon = createIcon(LuCalendarDays);
