import { BaseResponse } from '@/api/types/baseResponse';
import { OrderStatus } from '@/constants/orderStatus';
import { httpClient } from '@/lib/api/httpClient';
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
    () =>
      httpClient
        .get(`orders/${orderNo}/payment`)<void, void, BaseResponse<PaymentInfo>>()
        .then((data) => data.data),
    [orderNo],
  );

  const deleteSeat = useCallback(
    (seatData: { subAreaId: string; row: number; seat: number }) =>
      mutate(
        async () => {
          const res = await httpClient.delete(`orders/${orderNo}/seats`)<
            { subAreaId: string; row: number; seat: number },
            void,
            BaseResponse<Order>
          >({ params: seatData });

          return res.data;
        },
        {
          revalidate: false,
          optimisticData: (prevData): any => {
            if (prevData) {
              const seat = prevData.seats.find(
                (s) => s.subAreaId === seatData.subAreaId && s.row === seatData.row && s.seat === seatData.seat,
              );
              const price = prevData.price - seat!.price;
              return {
                ...prevData,
                seats: prevData.seats.filter(
                  (s) => !(s.subAreaId === seatData.subAreaId && s.row === seatData.row && s.seat === seatData.seat),
                ),
                price,
              };
            }
          },
        },
      ),
    [orderNo],
  );

  const addSeat = useCallback(
    (params: { areaId: string; subAreaId: string; amount: number }) =>
      mutate(
        async () => {
          const res = await httpClient.patch(`orders/${orderNo}/seats`)<
            { areaId: string; subAreaId: string; amount: number },
            void,
            BaseResponse<Order>
          >({ params });

          return res.data;
        },
        {
          revalidate: false,
        },
      ),
    [orderNo],
  );

  return { order: data, cancelOder, getPaymentInfo, deleteSeat, addSeat, mutate, ...props };
};

export default useOrder;
