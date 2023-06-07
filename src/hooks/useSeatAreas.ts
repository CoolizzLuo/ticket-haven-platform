import useSWR from 'swr';
import { SeatAreas } from '@/types/activityTypes';

const useSeatAreas = (id?: string) => {
  const { data, ...props } = useSWR<SeatAreas>(id && `events/${id}/seat-sell-status`);
  return { seatAreas: data, ...props };
};

export default useSeatAreas;
