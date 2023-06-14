import { createContext } from 'react';
import { DialogState } from './useTicketContext';

interface TicketContextValue {
  dialogState: any;
  openTicket: (content: DialogState) => void;
  closeDialog: () => void;
}

const initValue: TicketContextValue = {
  dialogState: { ticketNo: '', isOpen: false },
  openTicket: () => {},
  closeDialog: () => {},
};

const TicketContext = createContext<TicketContextValue>(initValue);

export default TicketContext;
