import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSelectors from './createSelectors';

export interface TicketPurchasingStore {
  activityId: string | null;
  eventId: string | null;
  selectAreaId: string | null;
  selectSubAreaId: string | null;
  orderNo: string | null;
  setEvent: (activityId: string, eventId: string) => void;
  setArea: (areaId: string, selectSubAreaId: string) => void;
  setOrder: (orderNo: string) => void;
  clearArea: () => void;
  clear: () => void;
}

const initialValues = {
  activityId: null,
  eventId: null,
  selectAreaId: null,
  selectSubAreaId: null,
  orderNo: null,
};

const useTicketPurchasingStore = createSelectors(
  create<TicketPurchasingStore>()(
    devtools((set) => ({
      ...initialValues,
      setEvent: (activityId, eventId) => set(() => ({ activityId, eventId })),
      setArea: (selectAreaId, selectSubAreaId) => set(() => ({ selectAreaId, selectSubAreaId })),
      setOrder: (orderNo) => set(() => ({ orderNo })),
      clearArea: () => set(() => ({ selectAreaId: null, selectSubAreaId: null })),
      clear: () => set(() => initialValues),
    })),
  ),
);

export default useTicketPurchasingStore;
