import { httpClient } from '@/lib/api/httpClient';
import axiosClient from './axiosClient';

export const getTickets = ({ page, isValid, pageSize }: { page: number; isValid: number; pageSize: number }) => {
  return axiosClient.get('tickets', { params: { page, isValid, pageSize } });
};

export const createTicketCode = (ticketCode: string) => {
  return httpClient.post(`tickets/${ticketCode}/check-in-token`);
};
