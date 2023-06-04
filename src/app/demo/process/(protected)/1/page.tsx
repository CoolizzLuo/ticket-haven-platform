'use client';

import { Button } from '@/lib/chakra';

import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import Link from 'next/link';

const Page = () => {
  const selectAreaId = useTicketPurchasingStore.use.selectAreaId();
  const selectSubAreaId = useTicketPurchasingStore.use.selectSubAreaId();
  const setArea = useTicketPurchasingStore.use.setArea();

  return (
    <div>
      {selectAreaId} / {selectSubAreaId}
      <Button onClick={() => setArea('area 1', 'sub area 1')}>set area</Button>
      <Button as={Link} href="/demo/process/2">
        next
      </Button>
    </div>
  );
};

export default Page;
