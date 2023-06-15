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
