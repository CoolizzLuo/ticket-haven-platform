'use client';

import StepPage from '@/components/activity/step';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import SeatSelector from '@/components/activity/step/SeatsSelector';
import useActivity from '@/hooks/useActivity';
import useSeatAreas from '@/hooks/useSeatAreas';

const SelectArea = () => {
  const activityId = useTicketPurchasingStore.use.activityId();
  const eventId = useTicketPurchasingStore.use.eventId();
  const { activity } = useActivity(activityId);
  const { seatAreas } = useSeatAreas(eventId);
  if (activity && seatAreas) {
    return (
      <StepPage step={1} seatImgUrl={seatAreas.seatImgUrl}>
        <SeatSelector activity={activity} seats={seatAreas.seats} />
      </StepPage>
    );
  }
};

export default SelectArea;
