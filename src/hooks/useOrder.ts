import axiosClient from '@/api/axiosClient';
import { BaseResponse } from '@/api/types/baseResponse';
import { OrderStatus } from '@/constants/orderStatus';
import { useCallback } from 'react';
import useSWR from 'swr';

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
  price: number;
  row: number;
  seat: number;
}

export interface Order {
  id: string;
  orderNo: string;
  status: OrderStatus;
  createAt: string;
  price: number;
  user: User;
  activity: Activity;
  seats: Seat[];
}

export interface PaymentInfo {
  MerchantOrderNo: string;
  RespondType: string;
  TimeStamp: number;
  Email: string;
  Amt: number;
  ItemDesc: string;
  tradeInfo: string;
  TradeSha: string;
}

const useOrder = (orderNo?: string | null) => {
  const { data, ...props } = useSWR<Order>(orderNo && `orders/${orderNo}`);

  const cancelOder = useCallback(() => axiosClient.delete(`orders/${orderNo}`), [orderNo]);

  const getPaymentInfo = useCallback(
    () => axiosClient.get<BaseResponse<PaymentInfo>>(`orders/${orderNo}/payment`).then((res) => res.data.data),
    [orderNo],
  );

  return { order: data, cancelOder, getPaymentInfo, ...props };
};

export default useOrder;
