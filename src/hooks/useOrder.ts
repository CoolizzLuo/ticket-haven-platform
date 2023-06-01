import { OrderStatus } from '@/constants/orderStatus';
import { BaseResponse } from '@/lib/api/types/baseResponse';
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

const useOrder = (orderNo?: string) => {
  const { data } = useSWR<BaseResponse<Order>>(orderNo && `orders/${orderNo}`);
  return { order: data?.data };
};

export default useOrder;
