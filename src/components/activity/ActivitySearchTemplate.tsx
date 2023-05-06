'use client';

import { Text, HStack, Box, Heading, Badge, Container, Stack, useRadioGroup, Grid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { fetchEvents } from '@/api/index';
import ActivityCard from '@/components/activity/ActivityCard';
import RadioCard from '@/components/common/RadioCard';
import { Activities } from '@/types/activityTypes';

const ActivitySearchTemplate = () => {
  const [result, setResult] = useState<Activities[]>([]);
  const [sellsValue, setSellsValue] = useState<string>('1');

  const sellsOptions = [
    { id: '1', name: '今天', params: { startTime: '2023-05-04' } },
    { id: '2', name: '明天', params: { startTime: '2023-05-05' } },
    { id: '3', name: '未來一週', params: { startTime: '2023-05-04', endTime: '2023-05-11' } },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'pickSellingType',
    defaultValue: sellsValue,
    onChange: (val: string) => {
      setSellsValue(val);
    },
  });

  const group = getRootProps();
  const handleFetchEvents = async () => {
    const data = await fetchEvents();
    setResult(Array.isArray(data.mock) ? data.mock : []);
  };
  useEffect(() => {
    handleFetchEvents();
  }, []);

  return (
    <Container maxW="1200px" py="80px">
      <Box as="section">
        <Heading as="h2" fontSize="28px" mb="32px">
          近期開賣
        </Heading>

        <HStack {...group} w="100%" mb="24px">
          {sellsOptions.map((opt) => {
            const radio = getRadioProps({ value: opt.id });
            return (
              <RadioCard key={opt.id} {...radio}>
                {opt.name}
              </RadioCard>
            );
          })}
        </HStack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="30px" as="ul" alignItems="stretch">
          {result.map((r: Activities) => (
            <Box as="li" listStyleType="none" key={r.id}>
              <ActivityCard>
                <Stack py="3" align="flex-start">
                  <Text size="20px" fontWeight="400">
                    {r.created_at}
                  </Text>
                  <Heading size="3" fontWeight="700" color="brand.100" mb="12px">
                    {r.name}
                  </Heading>
                  {r.status === 1 ? (
                    <Badge py="6px" px="4" bgColor="#FFF1C1" borderRadius="20px">
                      熱賣
                    </Badge>
                  ) : (
                    <Badge py="6px" px="4" bgColor="#F7F2F0" borderRadius="20px">
                      售罄
                    </Badge>
                  )}
                </Stack>
              </ActivityCard>
            </Box>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ActivitySearchTemplate;
