'use client';

import { Box, Heading, Container, Grid, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ActivityCard from '@/components/activity/ActivityCard';
import { Activities, ActivitiesSearch } from '@/types/activityTypes';
import { fetchActivities } from '@/api/activities';
import { useEffect, useState } from 'react';

type Content = {
  id: string;
  name: string;
  fnRule: (item: Activities) => void;
};

type ActivitySearchProps = {
  title: string;
  tabs: Content[];
  params: ActivitiesSearch;
};

const ActivitySearchTemplate = ({ params, title, tabs = [] }: ActivitySearchProps) => {
  const [result, setResult] = useState<Activities[]>([]);

  const handleFetchEvents = async () => {
    const res = await fetchActivities({ ...params, page: 1, pageSize: 10 });
    const { data = [], message } = res.data;
    if (message === 'success') {
      setResult(data);
    }
  };

  useEffect(() => {
    handleFetchEvents();
  }, []);

  return (
    <Container maxW="1200px" py="80px">
      <Box as="section">
        <Heading as="h2" fontSize="28px" mb="32px">
          {title}
        </Heading>
        <Tabs variant="unstyled">
          <TabList mb="24px">
            {tabs.map((opt) => {
              return (
                <Tab
                  key={opt.id}
                  borderWidth="1px"
                  borderRadius="md"
                  mr="8px"
                  _selected={{ color: 'white', bg: 'brand.500' }}
                >
                  {opt.name}
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            {tabs.map((tab) => {
              return (
                result && (
                  <TabPanel p="0" key={tab.id}>
                    <Grid
                      templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                      gap="30px"
                      as="ul"
                      alignItems="stretch"
                    >
                      {tab.fnRule && result.filter(tab.fnRule).length ? (
                        result
                          .filter(tab.fnRule)
                          .map((r: Activities) => (
                            <ActivityCard key={r.id} id={r.id} name={r.name} startAt={r.startAt} soldOut={r.soldOut} />
                          ))
                      ) : (
                        <>無活動資訊</>
                      )}
                    </Grid>
                  </TabPanel>
                )
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default ActivitySearchTemplate;
