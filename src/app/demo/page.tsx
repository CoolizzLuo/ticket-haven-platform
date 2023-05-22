'use client';

/* eslint-disable no-console */
import useDialogStore from '@/stores/dialogStore';
import { Button } from '@chakra-ui/react';

const Demo = () => {
  const { openAlert, openConfirm } = useDialogStore();

  return (
    <div>
      <Button type="button" onClick={() => openAlert('alert')}>
        OpenAlert
      </Button>
      <Button type="button" onClick={() => openConfirm('confirm', () => console.log('hi confirm'))}>
        OpenConfirm
      </Button>
    </div>
  );
};

export default Demo;
