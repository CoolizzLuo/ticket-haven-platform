'use client';

import { useRouter } from 'next/navigation';
import StepPage from '@/components/activity/step';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import useDialogStore from '@/stores/dialogStore';
import QuantitySelector from '@/components/activity/step/QuantitySelector';
import useActivity from '@/hooks/api/useActivity';
import axiosClient from '@/api/axiosClient';

const SelectSeat = () => {
  const router = useRouter();
  const { openConfirm, openAlert } = useDialogStore();
  const activityId = useTicketPurchasingStore.use.activityId();
  const eventId = useTicketPurchasingStore.use.eventId();
  const orderNo = useTicketPurchasingStore.use.orderNo();
  const setOrder = useTicketPurchasingStore.use.setOrder();
  const { activity } = useActivity(activityId);

  const selectArea = useTicketPurchasingStore.use.selectArea();
  const selectSubArea = useTicketPurchasingStore.use.selectSubArea();

  if (activity) {
    const createOrder = async (quantity: number) => {
      if (!selectSubArea?.remainingSeats)
        openConfirm('已無剩餘座位', () => router.push(`/purchasing-process/select-area`));

      try {
        let response;
        if (orderNo) {
          const patchData = {
            areaId: selectArea?.id,
            subAreaId: selectSubArea?.id,
            amount: quantity,
          };
          response = await axiosClient.patch(`/orders/${orderNo}/seats`, patchData);
        } else {
          const postData = {
            activityId: activity.id,
            eventId,
            areaId: selectArea?.id,
            subAreaId: selectSubArea?.id,
            seatAmount: quantity,
          };
          response = await axiosClient.post('/orders', postData);
        }

        if (response) {
          const {
            data: { data: order },
          } = response;
          if (order) {
            if (order.orderNo) setOrder(order.orderNo);
            router.push('/purchasing-process/confirm');
          }
        }
      } catch (err: any) {
        if (err) {
          switch (err.response.status) {
            case 401:
              openAlert('請先登入', () => router.push(`/signin`));
              break;
            default:
              openAlert('系統發生問題，請稍後再試', () => router.push(`/activities/${activityId}`));
              break;
          }
          console.log(err);
        }
      }
    };
    return (
      <StepPage step={2} seatImgUrl={activity.selectSeatImageUrl}>
        <QuantitySelector activity={activity} createOrder={createOrder} />
      </StepPage>
    );
  }
};

export default SelectSeat;