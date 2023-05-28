'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Grid, Container, Text } from '@chakra-ui/react';

import { Activities as ActType, SearchFormState } from '@/types/activityTypes';
import { fetchEvents } from '@/api/activities';

import ActivitySearchForm from '@/components/activity/ActivitySearchForm';
import ActivityCard from '@/components/activity/ActivityCard';

const Activities = () => {
  // params
  const searchParams = useSearchParams();
  const region = Number(searchParams.get('region')) || '';
  const startAfter = searchParams.get('startAfter') || '';
  const keyword = searchParams.get('q') || '';

  // searchResult
  const [result, setResult] = useState<ActType[]>([]);

  const handleFetchEvents = async (search?: SearchFormState) => {
    const res = await fetchEvents({ ...search, page: 1, pageSize: 10 });
    const { data } = res.data;
    setResult(Array.isArray(data) ? data : []);
  };

  const handleChange = ({ json }: { json: SearchFormState }) => {
    const req = Object.entries(json).reduce(
      (acc, [key, value]) => (String(value) ? { [key]: value, ...acc } : acc),
      {},
    );
    handleFetchEvents(req);
  };

  useEffect(() => {
    handleChange({ json: { region, startAfter, q: keyword } });
  }, []);

  return (
    <div>
      <ActivitySearchForm onChange={handleChange} searchParams={{ region, startAfter, q: keyword }} />
      <Container maxW="1200px" py="80px">
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="30px" as="ul" alignItems="stretch">
          {result.length ? (
            result.map((r: ActType) => (
              <ActivityCard key={r.id} id={r.id} name={r.name} startAt={r.startAt} soldOut={r.soldOut} />
            ))
          ) : (
            <Text>搜尋條件查無活動</Text>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Activities;
