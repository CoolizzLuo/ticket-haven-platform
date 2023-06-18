export type TicketInfo = {
  user: {
    name: string;
    email: string;
  };
  activityName: string;
  ticketNo: string;
  subAreaName: string;
  row: number;
  seat: number;
  isUsed: boolean;
};
