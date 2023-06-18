export interface CreateShareCodeRes {
  shareCode: string;
  createAt: string;
}

export interface ExchangeTicketReq {
  shareCode: string;
  ticketNo: string;
}
