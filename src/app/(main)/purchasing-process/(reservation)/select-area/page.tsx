'use client';

import { useState } from 'react';
import StepPage from '@/components/activity/step';
import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import SeatSelector from '@/components/activity/step/SeatsSelector';
import useActivity from '@/hooks/api/useActivity';
import useSeatAreas from '@/hooks/useSeatAreas';
import { Area } from '@/types/activityTypes';
import axiosClient from '@/api/axiosClient';

const SelectArea = () => {
  const activityId = useTicketPurchasingStore.use.activityId();
  const eventId = useTicketPurchasingStore.use.eventId();
  const setEvent = useTicketPurchasingStore.use.setEvent();
  const { activity } = useActivity(activityId);
  const { seatAreas, mutate } = useSeatAreas(eventId);
  const [seats, setSeats] = useState<Area[]>([]);

  if (activity && seatAreas && eventId) {
    if (seatAreas.seats.length !== seats.length) {
      setSeats(seatAreas.seats);
    }
    const updateSeats = (id: string) => {
      if (activityId) {
        setEvent(activityId, id);
        axiosClient
          .get(`events/${id}/seat-sell-status`)
          .then((res) => {
            if (res.data.seats) {
              mutate(res.data.seats);
              setSeats(res.data.seats);
            }
          })
          .catch((err) => console.log(err));
      }
    };
    return (
      <StepPage step={1} seatImgUrl={seatAreas.seatImgUrl}>
        <SeatSelector activity={activity} seats={seats} eventId={eventId} updateSeats={updateSeats} />
      </StepPage>
    );
  }
};

export default SelectArea;
