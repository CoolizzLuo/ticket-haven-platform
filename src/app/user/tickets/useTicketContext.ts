import { useState } from 'react';
import { ETicketInfo as ContentState } from '@/types/ticketTypes';

type DialogState = {
  content: ContentState;
  isOpen: boolean;
};

const initState = {
  content: {
    ticketNo: '',
    coverImageUrl: '',
    seat: '',
    name: '',
    address: '',
    isUsed: false,
    isShare: false,
    startAt: '',
  },
  isOpen: false,
};

const useTicketContext = () => {
  const [dialogState, setDialogState] = useState<DialogState>(initState);

  const openTicket = (content: DialogState) => {
    setDialogState(content);
  };

  const closeDialog = () => {
    setDialogState(initState);
  };

  return { dialogState, openTicket, closeDialog };
};

export default useTicketContext;
