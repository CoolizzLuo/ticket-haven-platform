'use client';

import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import useDialogStore, { DialogType } from '@/stores/dialogStore';

type DialogSetting = {
  title: string;
  confirmText: string;
  cancelText?: string;
};
const dialogSettings: Record<DialogType, DialogSetting> = {
  alert: {
    title: 'Alert',
    confirmText: 'OK',
  },
  confirm: {
    title: 'Confirm',
    confirmText: 'OK',
    cancelText: 'Cancel',
  },
};

const Dialog = () => {
  const cancelRef = useRef(null);
  const { dialog: state, closeDialog } = useDialogStore();
  const { type, isOpen, message, confirmAction } = state;

  const handleConfirm = () => {
    confirmAction?.();
    closeDialog();
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={closeDialog}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {dialogSettings[type].title}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            {type !== 'alert' && (
              <Button ref={cancelRef} onClick={closeDialog} minW={90}>
                {dialogSettings[type].cancelText}
              </Button>
            )}
            <Button colorScheme="red" bgColor="brand.100" onClick={handleConfirm} minW={90} ml={3}>
              {dialogSettings[type].confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Dialog;
