'use client';

import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProcessGuard = ({ children }: { children: React.ReactNode }) => {
  const store = useTicketPurchasingStore();
  const router = useRouter();

  useEffect(() => {
    if (!store.activityId) {
      router.push('/demo');
    }
  }, [router, store.activityId]);

  return children;
};

export default ProcessGuard;
