'use client';

import { Text, Box, useBreakpointValue, Button, Image } from '@chakra-ui/react';
import { dayYMDFormat, dayAfterToday } from '@/lib/dayjs';
import NextLink from 'next/link';

import { Activities } from '@/types/activityTypes';
import { usePathname, useRouter } from 'next/navigation';

import ActivitySearchForm from '@/components/activity/ActivitySearchForm';
import ActivitySearchTemplate from '@/components/activity/ActivitySearchTemplate';

const Home = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const pathname = usePathname();
  const router = useRouter();

  const defaultParams = () => ({
    page: 1,
    pageSize: 10,
    sort: 'startAt',
  });

  // 近期開賣
  const today = dayYMDFormat(`${new Date()}`);
  const tommorrow = dayAfterToday(1);
  const endOfWeek = dayAfterToday(7);

  const section1 = {
    title: '近期開賣',
    params: { startAfter: today, startBefore: endOfWeek },
    tabs: [
      { id: '1', name: '今天', rule: (item: Activities) => dayYMDFormat(item.startAt) === today },
      { id: '2', name: '明天', rule: (item: Activities) => dayYMDFormat(item.startAt) === tommorrow },
      {
        id: '3',
        name: '未來一週',
        rule: (item: Activities) => dayYMDFormat(item.startAt) >= today && dayYMDFormat(item.startAt) < endOfWeek,
      },
    ],
  };

  // 近期演出
  const section2 = {
    title: '近期演出',
    params: {},
    tabs: [
      { id: '1', name: '全部', rule: (item: Activities) => item },
      { id: '2', name: '北部', rule: (item: Activities) => item.region === 0 },
      { id: '3', name: '中部', rule: (item: Activities) => item.region === 1 },
      { id: '4', name: '南部', rule: (item: Activities) => item.region === 2 },
    ],
  };

  const redirectEventsResultPage = ({ queryStr }: { queryStr: string }) => {
    router.push(`/activities?${queryStr}`);
  };

  return (
    <>
      {!isMobile && <ActivitySearchForm onChange={redirectEventsResultPage} />}
      <ActivitySearchTemplate
        title={section1.title}
        tabs={section1.tabs}
        params={{ ...defaultParams(), ...section1.params }}
      />
      <ActivitySearchTemplate title={section2.title} tabs={section2.tabs} params={defaultParams()} />
      <Box as="section" py="120px" bgColor="#F7F4F6" textAlign="center">
        <Image w="200px" src="/brand.svg" alt="Logo" margin="auto" mb="60px" />
        <Text>採用 QR code 電子票券</Text>
        <Text mb="60px">掃描即可輕鬆入場</Text>
        <NextLink href={`/signup?redirect=${pathname}`}>
          <Button
            fontSize={20}
            fontWeight={600}
            bg="brand.100"
            color="white"
            height="auto"
            px={8}
            py={2}
            _hover={{
              bg: 'black',
              color: 'white',
            }}
          >
            立刻註冊
          </Button>
        </NextLink>
      </Box>
    </>
  );
};

export default Home;
