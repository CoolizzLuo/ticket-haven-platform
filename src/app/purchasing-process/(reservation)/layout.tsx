'use client';

import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const activityId = useTicketPurchasingStore.use.activityId();
  const router = useRouter();

  useEffect(() => {
    if (!activityId) {
      router.push('/');
    }
  }, [activityId]);

  return children;
};

export default Layout;
