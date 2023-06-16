import { ComponentProps, ComponentType } from 'react';
import { GoLocation } from 'react-icons/go';
import { BsCheckLg, BsCheck2Square } from 'react-icons/bs';
import { LuCalendarDays } from 'react-icons/lu';
import { GiTicket } from 'react-icons/gi';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdDelete, MdContentCopy } from 'react-icons/md';
import { AiOutlineScan } from 'react-icons/ai';
import { Icon } from '@/lib/chakra';

const createIcon = (Source: ComponentType) =>
  function IconWrap(props: ComponentProps<typeof Icon>) {
    return <Icon as={Source} {...props} />;
  };

export const CheckIcon = createIcon(BsCheckLg);
export const LocationIcon = createIcon(GoLocation);
export const CalendarIcon = createIcon(LuCalendarDays);
export const TicketIcon = createIcon(GiTicket);
export const DeleteIcon = createIcon(MdDelete);
export const CopyIcon = createIcon(MdContentCopy);
export const PlusIcon = createIcon(HiOutlinePlus);
export const ScanIcon = createIcon(AiOutlineScan);
export const CheckSquareIcon = createIcon(BsCheck2Square);
