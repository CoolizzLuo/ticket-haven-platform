import dayjs, { Dayjs } from 'dayjs';

import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export const dayFormat = (date: string | Date | Dayjs) => dayjs(date).format('YYYY/MM/DD HH:mm A (ddd.)');
export const dayYMDFormat = (date: string | Date | Dayjs) => dayjs(date).format('YYYY/MM/DD');

export const dayAfterToday = (num: number) =>
  dayjs()
    .utc(false)
    .add(dayjs.duration({ days: num }))
    .format('YYYY/MM/DD');

export const isBeforeToday = (date: string | Date) => {
  return dayjs().isSameOrBefore(dayjs(date));
};

export const isAfterToday = (date: string | Date) => {
  return dayjs().isAfter(dayjs(date));
};

export const dayFromNow = (date: string | Date) => {
  return dayjs(date).fromNow(true);
};
