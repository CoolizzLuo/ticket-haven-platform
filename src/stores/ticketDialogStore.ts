import { create } from 'zustand';
import { ETicketInfo as ContentState } from '@/types/ticketTypes';

interface TicketDialogStore {
  dialogState: {
    content: ContentState;
    isOpen: boolean;
    confirmAction: (() => void) | null;
  };
  openTicket: (content: ContentState, onConfirm?: () => void) => void;
  closeDialog: () => void;
}

const useTicketDialogStore = create<TicketDialogStore>((set) => ({
  dialogState: {
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
    confirmAction: null,
  },
  openTicket: (content, onConfirm) =>
    set({
      dialogState: {
        content: {
          coverImageUrl: content.coverImageUrl,
          name: content.name,
          ticketNo: content.ticketNo,
          seat: content.seat,
          address: content.address,
          isUsed: content.isUsed,
          isShare: content.isShare,
          startAt: content.startAt,
        },
        isOpen: true,
        confirmAction: onConfirm || null,
      },
    }),
  closeDialog: () =>
    set((state) => ({
      dialogState: {
        ...state.dialogState,
        isOpen: false,
      },
    })),
}));

export default useTicketDialogStore;
