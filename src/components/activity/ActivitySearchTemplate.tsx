'use client';

import { Box, Heading, Container, Grid, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ActivityCard from '@/components/activity/ActivityCard';
import { Activities, ActivitiesSearch } from '@/types/activityTypes';
import { fetchActivities } from '@/api/activities';
import { useEffect, useState } from 'react';

type Content = {
  id: string;
  name: string;
  params: object;
};

type ActivitySearchProps = {
  title: string;
  tabs: Content[];
};

const ActivitySearchTemplate = ({ title, tabs = [] }: ActivitySearchProps) => {
  const [activitiesResult, setActivitiesResult] = useState<object>({});

  const handleFetchEvents = async (params: ActivitiesSearch) => {
    const res = await fetchActivities(params);
    const { data = [], message } = res.data;
    if (message === 'success') {
      return data;
    }
  };

  useEffect(() => {
    tabs.forEach(async (tab) => {
      const result = await handleFetchEvents({ ...tab.params, page: 1, pageSize: 6 });
      setActivitiesResult((val) => ({ ...val, [tab.id]: result }));
    });
  }, []);

  return (
    <Container maxW="1200px" py={{ base: '40px', md: '80px' }}>
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
                  _selected={{ color: 'white', bg: 'primary.500' }}
                >
                  {opt.name}
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            {Object.entries(activitiesResult).map(([key, result]) => {
              return (
                result && (
                  <TabPanel p="0" key={`tabPanel${key}`}>
                    <Grid
                      templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                      gap="30px"
                      as="ul"
                      alignItems="stretch"
                    >
                      {result.length ? (
                        result.map((r: Activities) => (
                          <ActivityCard
                            key={r.id}
                            id={r.id}
                            name={r.name}
                            sellAt={r.sellAt}
                            startAt={r.startAt}
                            soldOut={r.soldOut}
                            coverImgUrl={r.coverImgUrl}
                          />
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
