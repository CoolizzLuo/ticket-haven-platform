'use client';

import { useSearchParams } from 'next/navigation';

const Activities = () => {
  const searchParams = useSearchParams();
  const region = searchParams.get('region');
  const startTime = searchParams.get('startTime');
  const keyword = searchParams.get('keyword');

  return (
    <div>
      result::: region: {region || '-'} + startTime: {startTime || '-'} | keyword: {keyword || '-'}
    </div>
  );
};

export default Activities;
