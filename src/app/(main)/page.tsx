'use client';

import { Text, Box, useBreakpointValue, Button, Image, Container } from '@chakra-ui/react';
import { calendarFormat, dayYMDFormat, dayAfterToday } from '@/lib/dayjs';
import NextLink from 'next/link';
import Slider from 'react-slick';
import useActivities from '@/hooks/api/useActivities';

import { usePathname, useRouter } from 'next/navigation';

import ActivitySearchForm from '@/components/activity/ActivitySearchForm';
import ActivitySearchTemplate from '@/components/activity/ActivitySearchTemplate';

const settings = {
  dots: true,
  swipeToSlide: true,
  infinite: true,
  autoplay: true,
  speed: 600,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots: number) => (
    <div style={{ position: 'absolute', bottom: '32px' }}>
      <ul>{dots}</ul>
    </div>
  ),
};
const CAROUSEL_HEIGHT = { base: '300px', md: '400px', lg: '500px' };

type CarouselProps = {
  id: string;
  url: string;
};

function Carousel({ list }: { list: CarouselProps[] }) {
  return (
    <Box position="relative" width="full" height={CAROUSEL_HEIGHT} overflow="hidden">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Slider {...settings} pauseOnDotsHover>
        {list.map((item) => (
          <NextLink href={`/activities/${item.id}`} key={item.id}>
            <Box position="relative">
              <Container maxW={{ base: 'full', md: 'container.xl' }}>
                <Image src={item.url} width="100%" height={CAROUSEL_HEIGHT} objectFit="cover" />
              </Container>
              <Box
                width="100%"
                height={CAROUSEL_HEIGHT}
                position="absolute"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="120%"
                backgroundImage={`url(${item.url})`}
                top="0"
                opacity="0.9"
                filter="blur(60px)"
                zIndex="-1"
              />
            </Box>
          </NextLink>
        ))}
      </Slider>
    </Box>
  );
}

const Home = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const pathname = usePathname();
  const router = useRouter();

  // 近期開賣
  const today = dayYMDFormat(`${new Date()}`);
  const tommorrow = dayAfterToday(1);
  const endOfWeek = dayAfterToday(7);

  const section1 = {
    title: '近期開賣',
    tabs: [
      { id: '1', name: '今天', params: { sellStartAfter: today, sellStartBefore: today, sort: 'sellAt' } },
      { id: '2', name: '明天', params: { sellStartAfter: tommorrow, sellStartBefore: tommorrow, sort: 'sellAt' } },
      {
        id: '3',
        name: '未來一週',
        params: { sellStartAfter: today, sellStartBefore: endOfWeek, sort: 'sellAt' },
      },
    ],
  };

  // 近期演出
  const section2 = {
    title: '近期演出',
    tabs: [
      { id: '1', name: '全部', params: { startAfter: today, startBefore: endOfWeek, sort: 'startAt' } },
      { id: '2', name: '北部', params: { region: 0, startAfter: today, startBefore: endOfWeek, sort: 'startAt' } },
      { id: '3', name: '中部', params: { region: 1, startAfter: today, startBefore: endOfWeek, sort: 'startAt' } },
      { id: '4', name: '南部', params: { region: 2, startAfter: today, startBefore: endOfWeek, sort: 'startAt' } },
    ],
  };

  const redirectEventsResultPage = ({ queryStr }: { queryStr: string }) => {
    router.push(`/activities?${queryStr}`);
  };

  // carousel
  const { activities = [] } = useActivities({ page: 1, pageSize: 8, startAfter: today });

  return (
    <>
      <Carousel list={activities.map((a) => ({ url: a.coverImgUrl, id: a.id }))} />
      {!isMobile && (
        <Box bg="natural.50" w="100%">
          <ActivitySearchForm
            onChange={redirectEventsResultPage}
            searchParams={{ startAfter: calendarFormat(new Date()) }}
          />
        </Box>
      )}
      <ActivitySearchTemplate title={section1.title} tabs={section1.tabs} />
      <ActivitySearchTemplate title={section2.title} tabs={section2.tabs} />
      <Box as="section" py={{ base: '40px', md: '120px' }} bgColor="natural.50" textAlign="center">
        <Container maxW="container.lg">
          <Image w="50%" src="/brand.svg" alt="Logo" margin="auto" mb="60px" />
          <Text mb="8px" textStyle="t5">
            採用 QR code 電子票券
          </Text>
          <Text mb="56px" textStyle="t5">
            掃描即可輕鬆入場
          </Text>
          <NextLink href={`/signup?redirect=${pathname}`}>
            <Button
              fontSize={20}
              fontWeight={600}
              bg="primary.500"
              color="white"
              px="40px"
              py="12px"
              _hover={{
                bg: 'black',
                color: 'white',
              }}
            >
              立刻註冊
            </Button>
          </NextLink>
        </Container>
      </Box>
    </>
  );
};

export default Home;
