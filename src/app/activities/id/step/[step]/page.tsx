'use client';

import { usePathname } from 'next/navigation';
import { Grid } from '@chakra-ui/react';
import ProgressBar from '@/components/activity/step/ProgressBar';
import SeatSelector from '@/components/activity/step/SeatsSelector';

const events = [
  {
    startAt: '2023-05-20T19:30:00.000Z',
    location: '台北小巨蛋',
  },
  { startAt: '2023-05-20T19:30:00.000Z', location: '台北小巨蛋' },
];

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

const Step = () => {
  const step = 1;
  return (
    <>
      <ProgressBar step={step} />
      <Grid gridTemplateColumns="1fr 1fr" margin="60px auto" gap="24px" w="1296px">
        <img
          alt="seats"
          src="https://images.unsplash.com/photo-1542029123374-26f7a8e05fdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
        />
        <SeatSelector events={events} areas={areas} activityName="BLACKPINK WORLD TOUR [BORN PINK] KAOHSIUNG" />
      </Grid>
    </>
  );
};

export default Step;
