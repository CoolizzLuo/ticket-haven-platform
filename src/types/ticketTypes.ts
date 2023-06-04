export type Ticket = {
  ticketNo: string;
  seat: string;
  isUsed: boolean;
  isShare: boolean;
};

export interface TicketCard {
  orderId: string;
  activityId: string;
  name: string;
  startAt: string;
  endAt: string;
  address: string;
  tickets: Ticket[];
}
