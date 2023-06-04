'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Image } from '@chakra-ui/next-js';
import { Grid, Box } from '@chakra-ui/react';
import ProgressBar from '@/components/activity/step/ProgressBar';
import SeatSelector from '@/components/activity/step/SeatsSelector';
import QuantitySelector from '@/components/activity/step/QuantitySelector';
import { Area, Activity } from '@/types/activityTypes';
import { areaCookie } from '@/api/activities';

const StepPage = ({
  step,
  activity,
  areas,
  seatImgUrl,
}: {
  step: number;
  activity: Activity;
  areas: Area[];
  seatImgUrl: string;
}) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const stepSwitcher = () => {
    switch (step) {
      case 1: {
        return <SeatSelector activity={activity} areas={areas} />;
      }
      case 2: {
        const area = areaCookie.getChoseArea();
        if (area)
          return <QuantitySelector quantity={quantity} setQuantity={setQuantity} activity={activity} area={area} />;
        router.back();
        return [];
      }
      default: {
        return [];
      }
    }
  };
  return (
    <>
      <ProgressBar step={step} />
      <Grid gridTemplateColumns="1fr 1fr" margin="60px auto" gap="24px" w="1296px">
        <Box position="relative">
          <Image fill alt="seats" src={seatImgUrl} />
        </Box>
        {stepSwitcher()}
      </Grid>
    </>
  );
};

export default StepPage;
