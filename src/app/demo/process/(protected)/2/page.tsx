'use client';

import { useEffect } from 'react';
import { Button } from '@/lib/chakra';

import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import { useRouter } from 'next/navigation';

const Page = () => {
  const selectAreaId = useTicketPurchasingStore.use.selectAreaId();
  const selectSubAreaId = useTicketPurchasingStore.use.selectSubAreaId();
  const clearArea = useTicketPurchasingStore.use.clearArea();

  const router = useRouter();

  useEffect(() => {
    if (!selectAreaId) {
      router.push('/demo/process/1');
    }
  }, [router, selectAreaId]);

  return selectAreaId ? (
    <div>
      {selectAreaId} / {selectSubAreaId}
      <Button onClick={() => clearArea()}>clear area</Button>
    </div>
  ) : null;
};

export default Page;
