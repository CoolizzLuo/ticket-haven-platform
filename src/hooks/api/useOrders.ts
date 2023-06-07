import { OrderStatus } from '@/constants/orderStatus';
import useSWRWithPage from '@/hooks/useSWRWithPage';

export interface User {
  id: string;
  name: string;
  email: string;
  cellphone: string;
}

export interface Activity {
  name: string;
  location: string;
  eventId: string;
  eventStartTime: string;
  eventEndTime: string;
}

export interface Seat {
  subAreaId: string;
  subAreaName: string;
  row: number;
  seat: number;
}

export interface Order {
  id: string;
  orderNo: string;
  status: OrderStatus;
  createAt: string;
  price: number;
  activity: Activity;
  seats: Seat[];
}

const useOrders = ({ page, pageSize, status }: { page: number; pageSize: number; status: 'unpaid' | 'completed' }) => {
  const { data: orders, ...others } = useSWRWithPage<Order[]>(['orders', { page, pageSize, status }]);

  return { orders, ...others };
};

export default useOrders;
