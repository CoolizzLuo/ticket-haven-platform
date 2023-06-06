import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSelectors from './createSelectors';

export interface Area {
  id: string;
  price: number;
  name: string;
}

export interface SubArea {
  id: string;
  name: string;
  remainingSeats: number;
  color: string;
}

export interface TicketPurchasingStore {
  activityId: string | undefined;
  eventId: string | undefined;
  selectArea: Area | undefined;
  selectSubArea: SubArea | undefined;
  orderNo: string | undefined;
  setEvent: (activityId: string, eventId: string) => void;
  setArea: (area: Area, selectSubArea: SubArea) => void;
  setOrder: (orderNo: string) => void;
  clearArea: () => void;
  clear: () => void;
}

const initialValues = {
  activityId: undefined,
  eventId: undefined,
  selectArea: undefined,
  selectSubArea: undefined,
  orderNo: undefined,
};

const useTicketPurchasingStore = createSelectors(
  create<TicketPurchasingStore>()(
    devtools((set) => ({
      ...initialValues,
      setEvent: (activityId, eventId) => set(() => ({ activityId, eventId })),
      setArea: (selectArea, selectSubArea) => set(() => ({ selectArea, selectSubArea })),
      setOrder: (orderNo) => set(() => ({ orderNo })),
      clearArea: () => set(() => ({ selectArea: undefined, selectSubArea: undefined })),
      clear: () => set(() => initialValues),
    })),
  ),
);

export default useTicketPurchasingStore;
