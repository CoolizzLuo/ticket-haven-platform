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

export type PaymentInfo = {
  MerchantOrderNo: string;
  RespondType: string;
  TimeStamp: number;
  Email: string;
  Amt: number;
  Version: string;
  ItemDesc: string;
  MerchantID: string;
  TradeInfo: string;
  TradeSha: string;
};

const useOrder = (orderNo?: string | null) => {
  const { data, mutate, ...props } = useSWR<Order>(orderNo && `orders/${orderNo}`);

  const cancelOder = useCallback(() => httpClient.delete(`orders/${orderNo}`)(), [orderNo]);

  const getPaymentInfo = useCallback(
    () => axiosClient.get<BaseResponse<PaymentInfo>>(`orders/${orderNo}/payment`).then((res) => res.data.data),
    [orderNo],
  );

  const deleteSeat = useCallback(
    async (seatData: { subAreaId: string; row: number; seat: number }) => {
      axiosClient
        .delete<BaseResponse<boolean>>(`orders/${orderNo}/seats`, { data: seatData })
        .then((res) => res.data.data);
      mutate((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            seats: prevData.seats.filter(
              (s) => !(s.subAreaId === seatData.subAreaId && s.row === seatData.row && s.seat === seatData.seat),
            ),
          };
        }
      });
    },
    [orderNo],
  );

  return { order: data, cancelOder, getPaymentInfo, deleteSeat, mutate, ...props };
};

export default useOrder;
