import useSWRWithPage from '@/hooks/useSWRWithPage';

export type Ticket = {
  ticketNo: string;
  orderId: string;
  areaId: string;
  subareaId: string;
  areaName: string;
  subArea: string;
  row: number;
  seat: number;
  isUsed: boolean;
  isShared: boolean;
  sharedBy: string;
};

export interface TicketGroup {
  activity: {
    id: string;
    eventId: string;
    name: string;
    coverImgUrl: string;
    startAt: string;
    endAt: string;
    address: string;
    location: string;
  };
  tickets: Ticket[];
}

const useTicketGroups = ({ page, pageSize, isValid }: { page: number; pageSize: number; isValid: number }) => {
  const { data: ticketGroups, ...rest } = useSWRWithPage<TicketGroup[]>(['tickets', { page, pageSize, isValid }]);
  return { ticketGroups, ...rest };
};

export default useTicketGroups;
