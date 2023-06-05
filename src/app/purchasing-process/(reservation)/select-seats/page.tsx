'use client';

import { useRouter } from 'next/navigation';
import StepPage from '@/components/activity/step';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import useDialogStore from '@/stores/dialogStore';
import QuantitySelector from '@/components/activity/step/QuantitySelector';
import useActivity from '@/hooks/useActivity';
import useSelectedAreas from '@/hooks/useSelectedAreas';

const SelectSeat = () => {
  const router = useRouter();
  const { openConfirm } = useDialogStore();
  const activityId = useTicketPurchasingStore.use.activityId();
  const eventId = useTicketPurchasingStore.use.eventId();
  const { activity } = useActivity(activityId);
  const selectSeatArea = useSelectedAreas(eventId);

  if (activity && selectSeatArea) {
    const { area, seatImgUrl } = selectSeatArea;
    if (!area.subArea.remainingSeats) openConfirm('已無剩餘座位', () => router.push(`/activities/${activity.id}`));
    return (
      <StepPage step={2} seatImgUrl={seatImgUrl}>
        <QuantitySelector activity={activity} selectArea={area} />
      </StepPage>
    );
  }
};

export default SelectSeat;
