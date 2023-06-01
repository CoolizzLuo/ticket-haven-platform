import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSelectors from './createSelectors';

export interface TicketPurchasingStore {
  activityId: string | undefined;
  eventId: string | undefined;
  selectAreaId: string | undefined;
  selectSubAreaId: string | undefined;
  orderNo: string | undefined;
  setEvent: (activityId: string, eventId: string) => void;
  setArea: (areaId: string, selectSubAreaId: string) => void;
  setOrder: (orderNo: string) => void;
  clearArea: () => void;
  clear: () => void;
}

const initialValues = {
  activityId: undefined,
  eventId: undefined,
  selectAreaId: undefined,
  selectSubAreaId: undefined,
  orderNo: undefined,
};

const useTicketPurchasingStore = createSelectors(
  create<TicketPurchasingStore>()(
    devtools((set) => ({
      ...initialValues,
      setEvent: (activityId, eventId) => set(() => ({ activityId, eventId })),
      setArea: (selectAreaId, selectSubAreaId) => set(() => ({ selectAreaId, selectSubAreaId })),
      setOrder: (orderNo) => set(() => ({ orderNo })),
      clearArea: () => set(() => ({ selectAreaId: undefined, selectSubAreaId: undefined })),
      clear: () => set(() => initialValues),
    })),
  ),
);

export default useTicketPurchasingStore;
