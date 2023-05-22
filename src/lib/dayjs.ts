import dayjs, { Dayjs } from 'dayjs';

import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export const dayFormat = (date: string | Date | Dayjs) => dayjs(date).utc(false).format('YYYY-MM-DD HH:mm');
export const dayYMDFormat = (date: string | Date | Dayjs) => dayjs(date).utc(false).format('YYYY-MM-DD');

export const dayAfterToday = (num: number) =>
  dayjs()
    .utc(false)
    .add(dayjs.duration({ days: num }))
    .format('YYYY-MM-DD');

export const isBeforeToday = (date: string | Date) => {
  return dayjs().utc(true).isSameOrBefore(dayjs(date).utc(false));
};
