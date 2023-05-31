'use client';

/* eslint-disable no-console */
import useDialogStore from '@/stores/dialogStore';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import { Button, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Demo = () => {
  const { openAlert, openConfirm } = useDialogStore();
  const purchasingStore = useTicketPurchasingStore();
  const router = useRouter();

  return (
    <div>
      <Button type="button" onClick={() => openAlert('alert')}>
        OpenAlert
      </Button>
      <Button type="button" onClick={() => openConfirm('confirm', () => console.log('hi confirm'))}>
        OpenConfirm
      </Button>
      <Divider my="24px" />
      <Button
        type="button"
        onClick={() => {
          purchasingStore.setEvent('activity', 'event');
          router.push('/demo/process/1');
        }}
      >
        start ticket purchasing process
      </Button>
    </div>
  );
};

export default Demo;
