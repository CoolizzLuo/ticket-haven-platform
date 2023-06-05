'use client';

import { useRouter } from 'next/navigation';
import StepPage from '@/components/activity/step';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import useDialogStore from '@/stores/dialogStore';
import QuantitySelector from '@/components/activity/step/QuantitySelector';
import useActivity from '@/hooks/useActivity';
import useSelectedAreas from '@/hooks/useSelectedAreas';
import axiosClient from '@/api/axiosClient';

const SelectSeat = () => {
  const router = useRouter();
  const { openConfirm, openAlert } = useDialogStore();
  const activityId = useTicketPurchasingStore.use.activityId();
  const eventId = useTicketPurchasingStore.use.eventId();
  const setOrder = useTicketPurchasingStore.use.setOrder();
  const { activity } = useActivity(activityId);
  const selectSeatArea = useSelectedAreas(eventId);

  if (activity && selectSeatArea) {
    const { area, seatImgUrl } = selectSeatArea;
    if (!area.subArea.remainingSeats) openConfirm('已無剩餘座位', () => router.push(`/activities/${activity.id}`));
    const createOrder = async (quantity: number) => {
      try {
        if (activity.id && eventId && area.id && area.subArea.id) {
          const postData = {
            activityId: activity.id,
            eventId,
            areaId: area.id,
            subAreaId: area.subArea.id,
            seatAmount: quantity,
          };
          const data = await axiosClient.post('/orders', postData);
          if (data) {
            const { data: order } = data;
            if (order) {
              setOrder(order.orderNo);
              router.push('/purchasing-process/confirm');
            }
          }
        }
      } catch (err: any) {
        if (err) {
          const message = '系統發生問題，請稍後再試';
          openAlert(message, () => router.push(`/activities/${activityId}`));
          console.log(err);
        }
      }
    };
    return (
      <StepPage step={2} seatImgUrl={seatImgUrl}>
        <QuantitySelector activity={activity} selectArea={area} createOrder={createOrder} />
      </StepPage>
    );
  }
};

export default SelectSeat;
