'use client';

import { useRouter } from 'next/navigation';
import StepPage from '@/components/activity/step';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import useDialogStore from '@/stores/dialogStore';
import QuantitySelector from '@/components/activity/step/QuantitySelector';
import useActivity from '@/hooks/api/useActivity';
import axiosClient from '@/api/axiosClient';
import useOrder from '@/hooks/api/useOrder';

const SelectSeat = () => {
  const router = useRouter();
  const { openConfirm, openAlert } = useDialogStore();
  const activityId = useTicketPurchasingStore.use.activityId();
  const eventId = useTicketPurchasingStore.use.eventId();
  const orderNo = useTicketPurchasingStore.use.orderNo();
  const setOrderNo = useTicketPurchasingStore.use.setOrderNo();
  const { activity } = useActivity(activityId);

  const selectArea = useTicketPurchasingStore.use.selectArea();
  const selectSubArea = useTicketPurchasingStore.use.selectSubArea();
  const { addSeat } = useOrder(orderNo);

  if (activity) {
    const createOrder = async (quantity: number) => {
      if (!selectArea || !selectSubArea) return;

      if (!selectSubArea?.remainingSeats)
        openConfirm('已無剩餘座位', () => router.push(`/purchasing-process/select-area`));

      try {
        if (orderNo) {
          const patchData = {
            areaId: selectArea?.id,
            subAreaId: selectSubArea?.id,
            amount: quantity,
          };
          await addSeat(patchData);
        } else {
          const postData = {
            activityId: activity.id,
            eventId,
            areaId: selectArea?.id,
            subAreaId: selectSubArea?.id,
            seatAmount: quantity,
          };

          const {
            data: { data: order },
          } = await axiosClient.post('/orders', postData);

          setOrderNo(order.orderNo);
        }

        router.push('/purchasing-process/confirm');
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
