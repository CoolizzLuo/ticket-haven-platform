import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Activity } from '@/types/activityTypes';
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
  activity: Activity | undefined;
  eventId: string | undefined;
  lastEventId: string | undefined;
  selectArea: Area | undefined;
  selectSubArea: SubArea | undefined;
  orderNo: string | undefined;
  setEvent: (activityId: string, eventId: string) => void;
  setLastEventId: (eventId: string) => void;
  setActivity: (activity: Activity) => void;
  setArea: (area: Area, selectSubArea: SubArea) => void;
  setOrder: (orderNo: string) => void;
  clearArea: () => void;
  clear: () => void;
}

const initialValues = {
  activityId: undefined,
  activity: undefined,
  eventId: undefined,
  lastEventId: undefined,
  selectArea: undefined,
  selectSubArea: undefined,
  orderNo: undefined,
};

const useTicketPurchasingStore = createSelectors(
  create<TicketPurchasingStore>()(
    devtools((set) => ({
      ...initialValues,
      setEvent: (activityId, eventId) => set(() => ({ activityId, eventId })),
      setLastEventId: (lastEventId) => set(() => ({ lastEventId })),
      setActivity: (activity) => set(() => ({ activity })),
      setArea: (selectArea, selectSubArea) => set(() => ({ selectArea, selectSubArea })),
      setOrder: (orderNo) => set(() => ({ orderNo })),
      clearArea: () => set(() => ({ selectArea: undefined, selectSubArea: undefined })),
      clear: () => set(() => initialValues),
    })),
  ),
);

export default useTicketPurchasingStore;
