'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { Grid, Box } from '@chakra-ui/react';
import ProgressBar from '@/components/activity/step/ProgressBar';

const StepPage = ({ step, seatImgUrl, children }: { step: number; seatImgUrl?: string; children: ReactNode }) => {
  return (
    <>
      <ProgressBar step={step} />
      <Grid gridTemplateColumns="1fr 1fr" margin="60px auto" gap="24px" w="1296px">
        <Box position="relative">
          {seatImgUrl && (
            <Image fill style={{ objectFit: 'contain', objectPosition: 'left top' }} alt="seats" src={seatImgUrl} />
          )}
        </Box>
        {children}
      </Grid>
    </>
  );
};

export default StepPage;
