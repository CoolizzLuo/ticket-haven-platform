// import { useRouter } from 'next/navigation';
import StepPage from '@/components/activity/step';
import { Area, Activity } from '@/types/activityTypes';
import { getActivityById, getSeatsArea } from '@/api/activities';

const getBasciInfo = async (id: string) => {
  const { data: activity } = await getActivityById(id);
  // const { data: areas} = await getSeatsArea()
  const areas = [
    {
      id: '1uhwue2',
      price: 5500,
      name: '特區',
      subAreas: [
        {
          id: '1231edadef',
          name: '紫1B',
          remainingSeats: 3,
          color: '#dedede',
        },
        {
          id: '1231edadfef',
          name: '紫1B',
          remainingSeats: 3,
          color: '#dedede',
        },
        {
          id: '1231edakdef',
          name: '紫1B',
          remainingSeats: 3,
          color: '#dedede',
        },
        {
          id: '1231edadef',
          name: '紫1B',
          remainingSeats: 3,
          color: '#aaaaaa',
        },
        {
          id: '1231egdadef',
          name: '紫1B',
          remainingSeats: 3,
          color: '#aaaaaa',
        },
        {
          id: '1231ewedadef',
          name: '紫1B',
          remainingSeats: 11,
          color: '#000000',
        },
        {
          id: '1231edaadef',
          name: '紫1B',
          remainingSeats: 10,
          color: '#000000',
        },
      ],
    },
    {
      id: 'jiweh11',
      price: 4800,
      name: '搖滾區',
      subAreas: [
        {
          id: 'jio2i3h41',
          name: '紫1B',
          remainingSeats: 3,
          color: '#dedede',
        },
        {
          id: 'iawewejhfk3',
          name: '紫1B',
          remainingSeats: 3,
          color: '#dedede',
        },
        {
          id: '1i2lueyhlawer',
          name: '紫1B',
          remainingSeats: 3,
          color: '#dedede',
        },
        {
          id: '23luieha3r',
          name: '紫1B',
          remainingSeats: 3,
          color: '#aaaaaa',
        },
        {
          id: '12a;owiejfo31egdadef',
          name: '紫1B',
          remainingSeats: 3,
          color: '#aaaaaa',
        },
        {
          id: 'lauiwhef',
          name: '紫1B',
          remainingSeats: 11,
          color: '#000000',
        },
        {
          id: 'awehla.kwjhr',
          name: '紫1B',
          remainingSeats: 10,
          color: '#000000',
        },
      ],
    },
  ];
  return { activity, areas };
};

type PageProps = {
  params: { id: string; step: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Step = async ({ params }: PageProps) => {
  const data: { activity: Activity; areas: Area[] } = await getBasciInfo(params.id);
  return <StepPage step={Number(params.step)} {...data} />;
};

export default Step;
