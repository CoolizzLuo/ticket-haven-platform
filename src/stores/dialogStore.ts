import { create } from 'zustand';

export type DialogType = 'alert' | 'confirm';
export type DialogState = {
  isOpen: boolean;
  type: DialogType;
  message: string;
  confirmAction: (() => void) | null;
};
export interface DialogStore {
  dialog: DialogState;
  openAlert: (message: string, onConfirm?: () => void) => void;
  openConfirm: (message: string, onConfirm?: () => void) => void;
  closeDialog: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  dialog: {
    isOpen: false,
    type: 'alert',
    message: '',
    confirmAction: null,
  },
  openAlert: (message, onConfirm) =>
    set({
      dialog: {
        isOpen: true,
        type: 'alert',
        message,
        confirmAction: onConfirm || null,
      },
    }),
  openConfirm: (message, onConfirm) =>
    set({
      dialog: {
        isOpen: true,
        type: 'confirm',
        message,
        confirmAction: onConfirm || null,
      },
    }),
  closeDialog: () =>
    set((state) => ({
      dialog: {
        ...state.dialog,
        isOpen: false,
      },
    })),
}));

export default useDialogStore;
