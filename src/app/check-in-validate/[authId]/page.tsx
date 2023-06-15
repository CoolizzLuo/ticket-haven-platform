'use client';

import { useEventInfo } from '@/hooks/api/check-in/useEventInfo';
import { Box, Skeleton } from '@/lib/chakra';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CheckIn = () => {
  const { authId } = useParams();
  const router = useRouter();

  const { event, isLoading } = useEventInfo(authId);

  useEffect(() => {
    if (!event && !isLoading) {
      router.push('/');
    }
  }, [event, isLoading]);

  return (
    <Skeleton minH="300px" isLoaded={!isLoading}>
      <Box h="250px" bgImage={event?.coverImgUrl} bgSize="cover" bgPosition="center" />
    </Skeleton>
  );
};

export default CheckIn;
