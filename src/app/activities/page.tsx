'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Grid, Container, Text, Box } from '@chakra-ui/react';

import { Activities as ActType, SearchFormState } from '@/types/activityTypes';
import { fetchActivities } from '@/api/activities';

import ActivitySearchForm from '@/components/activity/ActivitySearchForm';
import ActivityCard from '@/components/activity/ActivityCard';
import Pagination from '@/components/common/Pagination';

type Page = {
  page: number;
  totalCount: number;
};

const validJSON = ({ json }: { json: object }) => {
  return Object.entries(json).reduce((acc, [key, value]) => (String(value) ? { [key]: value, ...acc } : acc), {});
};

const Activities = () => {
  // params
  const PAGE_SIZE = 12;
  const searchParams = useSearchParams();
  const [region, setRegion] = useState(Number(searchParams.get('region') || ''));
  const [startAfter, setStartAfter] = useState(searchParams.get('startAfter') || '');
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');

  // searchResult
  const [pageInfo, setPageInfo] = useState<Page>({ page: 1, totalCount: 0 });
  const [result, setResult] = useState<ActType[]>([]);

  const handleFetchEvents = async (search?: SearchFormState) => {
    const res = await fetchActivities({ ...search, page: search?.page || 1, pageSize: PAGE_SIZE, sort: 'start_at' });
    const { data, totalCount, page } = res.data;
    setPageInfo({ page, totalCount });
    setResult(Array.isArray(data) ? data : []);
  };

  const handleSearchChange = ({ json }: { json: SearchFormState }) => {
    setRegion(Number(json.region));
    setStartAfter(String(json.startAfter));
    setKeyword(String(json.q));
    const req = validJSON({ json });
    handleFetchEvents(req);
  };

  const changePage = (page: number) => {
    const req = validJSON({ json: { region, startAfter, q: keyword } });
    handleFetchEvents({ ...req, page });
  };

  useEffect(() => {
    handleSearchChange({ json: { region, startAfter, q: keyword } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ActivitySearchForm onChange={handleSearchChange} searchParams={{ region, startAfter, q: keyword }} />
      <Container maxW="1200px" py="80px">
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="30px" as="ul" alignItems="stretch">
          {result.length ? (
            result.map((r: ActType) => (
              <ActivityCard
                key={r.id}
                id={r.id}
                name={r.name}
                startAt={r.startAt}
                soldOut={r.soldOut}
                coverImgUrl={r.coverImgUrl}
                sellAt={r.sellAt}
              />
            ))
          ) : (
            <Text>搜尋條件查無活動</Text>
          )}
        </Grid>
        {!!result.length && (
          <Box py="20px">
            <Pagination
              page={pageInfo.page}
              totalCount={pageInfo.totalCount}
              pageSize={PAGE_SIZE}
              onPageChange={changePage}
            />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Activities;
