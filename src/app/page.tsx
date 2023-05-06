'use client';

import {
  Text,
  HStack,
  Box,
  Heading,
  Badge,
  Container,
  Stack,
  useBreakpointValue,
  useRadioGroup,
  Grid,
  Button,
  Image,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { fetchEvents } from '@/api/index';
import ActivityCard from '@/components/activity/ActivityCard';
import ActivitySearchForm from '@/components/activity/ActivitySearchForm';
import ActivitySearchTemplate from '@/components/activity/ActivitySearchTemplate';
import RadioCard from '@/components/common/RadioCard';
import { Activities } from '@/types/activityTypes';

const Home = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [mounted, setMounted] = useState(false);

  // The Hito / Recent Activities
  const [result, setResult] = useState<any>([]);
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
    setResult(data.mock);
  };
  useEffect(() => {
    setMounted(true);
    handleFetchEvents();
  }, []);

  return (
    mounted && (
      <>
        {!isMobile && <ActivitySearchForm />}
        <ActivitySearchTemplate />
        <ActivitySearchTemplate />
        <Box as="section" py="120px" bgColor="#F7F4F6" textAlign="center">
          <Image w="200px" src="/brand.svg" alt="Logo" margin="auto" mb="60px" />
          <Text>採用 QR code 電子票券</Text>
          <Text mb="60px">掃描即可輕鬆入場</Text>
          <Button
            as="a"
            fontSize={20}
            fontWeight={600}
            bg="brand.100"
            color="white"
            height="auto"
            px={8}
            py={2}
            href="#"
            _hover={{
              bg: 'black',
              color: 'white',
            }}
          >
            立刻註冊
          </Button>
        </Box>
      </>
    )
  );
};

export default Home;
