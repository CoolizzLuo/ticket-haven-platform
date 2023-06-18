import { createContext, useContext, ReactNode, useState, useCallback, useMemo } from 'react';

export type ShareModalData = {
  ticketNo: string;
  activityName: string;
  startAt: string;
  address: string;
  imageUrl: string;
};

export type ShareModalContextValues = {
  isOpen: boolean;
  data: ShareModalData;
  open: (data: ShareModalData) => void;
  close: () => void;
};

const initialData = {
  ticketNo: '',
  activityName: '',
  startAt: '',
  address: '',
  imageUrl: '',
};

const Context = createContext<ShareModalContextValues>({
  isOpen: false,
  open: () => {},
  close: () => {},
  data: initialData,
});

export const useShareModel = () => useContext(Context);

export const ShareModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{ isOpen: boolean; data: ShareModalData }>({
    isOpen: false,
    data: initialData,
  });

  const open = useCallback((data: ShareModalData) => {
    setState({ isOpen: true, data });
  }, []);

  const close = useCallback(() => {
    setState({ isOpen: false, data: initialData });
  }, []);

  const value = useMemo(
    () => ({
      open,
      close,
      ...state,
    }),
    [state],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
