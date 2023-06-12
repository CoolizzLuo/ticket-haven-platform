import { createContext } from 'react';

interface TicketContextValue {
  dialogState: any;
  openTicket: (content: any) => void;
  closeDialog: () => void;
}

const initValue: TicketContextValue = {
  dialogState: { ticketNo: '', isOpen: false },
  openTicket: () => {},
  closeDialog: () => {},
};

const TicketContext = createContext<TicketContextValue>(initValue);

export default TicketContext;
