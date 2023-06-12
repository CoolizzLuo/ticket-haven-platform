export type Ticket = {
  ticketNo: string;
  seat: string;
  isUsed: boolean;
  isShare: boolean;
};

export type ETicketInfo = Ticket & {
  coverImageUrl: string;
  name: string;
  address: string;
  startAt: string;
};

export interface Tickets {
  activityId: string;
  orderId: string;
  address: string;
  eventId: string;
  name: string;
  startAt: string;
  endAt: string;
  coverImageUrl: string;
  tickets: Ticket[];
}
