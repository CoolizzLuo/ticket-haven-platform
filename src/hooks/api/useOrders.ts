import { useState, useEffect, useMemo, useRef } from 'react';
import useSWR from 'swr';
import { paginationFetcher } from '@/api/swrFetcher';
import { OrderStatus } from '@/constants/orderStatus';
import { PaginationResponse } from '@/api/types/baseResponse';

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
  const { data: { data: orders, totalCount } = {}, isLoading } = useSWR<PaginationResponse<Order[]>>(
    ['orders', { page, pageSize, status }],
    paginationFetcher,
  );

  const countRef = useRef(totalCount);

  if (!isLoading) {
    countRef.current = totalCount;
  }

  return { orders, totalCount: countRef.current };
};

export default useOrders;
