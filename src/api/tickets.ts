import axiosClient from './axiosClient';

export const getTickets = ({ page, isValid, pageSize }: { page: number; isValid: boolean; pageSize: number }) => {
  return axiosClient.get('tickets', { params: { page, isValid, pageSize } });
};
