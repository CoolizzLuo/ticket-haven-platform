import { Tickets as TicketsTypes } from '@/types/ticketTypes';
import useSWRWithPage from '@/hooks/useSWRWithPage';

const useTickets = ({ page, pageSize, isValid }: { page: number; pageSize: number; isValid: number }) => {
  const { data: tickets, ...rest } = useSWRWithPage<TicketsTypes[]>(['tickets', { page, pageSize, isValid }]);
  return { tickets, ...rest };
};

export default useTickets;
