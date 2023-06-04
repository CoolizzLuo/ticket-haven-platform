import { redirect } from 'next/navigation';
import StepPage from '@/components/activity/step';
import { Area, Activity } from '@/types/activityTypes';
import { getActivityById, getSeatsArea } from '@/api/activities';

const getBasciInfo = async (activityId: string, eventId?: string) => {
  const {
    data: { data: activity },
  } = await getActivityById(activityId);
  let seatsData;
  if (eventId) {
    const {
      data: { data },
    } = await getSeatsArea(eventId);
    seatsData = data;
  }
  return { activity, areas: seatsData?.seats, seatImgUrl: seatsData?.seatImgUrl };
};

type PageProps = {
  params: { id: string; step: string };
  searchParams: { eventId: string; [key: string]: string };
};

const Step = async ({ params, searchParams }: PageProps) => {
  if (params.step === '1' && !searchParams.eventId) redirect(`/activities/${params.id}`);
  const data: { activity: Activity; areas: Area[]; seatImgUrl: string } = await getBasciInfo(
    params.id,
    searchParams.eventId,
  );
  return <StepPage step={Number(params.step)} {...data} />;
};

export default Step;
