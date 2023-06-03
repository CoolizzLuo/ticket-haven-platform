import axiosClient from '@/api/axiosClient';
import { OrderStatus } from '@/constants/orderStatus';
import { useCallback } from 'react';
import useSWR from 'swr';

interface User {
  id: string;
  name: string;
  email: string;
  cellphone: string;
}

interface Activity {
  name: string;
  location: string;
  eventId: string;
  eventStartTime: string;
  eventEndTime: string;
}

interface Seat {
  subAreaId: string;
  subAreaName: string;
  price: number;
  row: number;
  seat: number;
}

interface Order {
  id: string;
  orderNo: string;
  status: OrderStatus;
  createAt: string;
  price: number;
  user: User;
  activity: Activity;
  seats: Seat[];
}

const useOrder = (orderNo?: string | null) => {
  const { data, ...props } = useSWR<Order>(orderNo && `orders/${orderNo}`);

  const cancelOder = useCallback(() => axiosClient.delete(`orders/${orderNo}`), [orderNo]);

  return { order: data, cancelOder, ...props };
};

export default useOrder;
