import { Card, CardBody, Image, Text, Heading, Badge, Stack, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { dateAndDay, isBeforeToday, isAfterToday } from '@/lib/dayjs';

type Props = {
  id: string;
  name: string;
  startAt: string;
  sellAt: string;
  soldOut: boolean;
  coverImgUrl: string;
};

const EventCards = ({ id, name, startAt, sellAt, soldOut, coverImgUrl }: Props) => {
  return (
    <Link href={`/activities/${id}`} scroll={true}>
      <Card border="none" boxShadow="none">
        <CardBody p="0">
          <Box overflow="hidden" borderRadius="lg">
            <Image
              src={coverImgUrl}
              borderRadius="lg"
              alt="eventImg"
              width="100%"
              h="200px"
              objectFit="cover"
              _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}
            />
          </Box>
          <Stack py={{ base: '2', md: '3' }} pb={{ base: 0 }} align="flex-start">
            <Text size="20px" fontWeight="400" color="natural.600">
              {dateAndDay(startAt)}
            </Text>
            <Heading size="3" fontWeight="700" color="natural.800" mb="12px" _hover={{ color: 'primary.500' }}>
              {name}
            </Heading>

            {isAfterToday(sellAt) && (
              <Badge py="6px" px="4" bgColor="#F5F2F4" color="natural.800" borderRadius="20px">
                即將開賣
              </Badge>
            )}

            {isBeforeToday(sellAt) && !soldOut && (
              <Badge py="6px" px="4" bgColor="#FFF1C1" color="yellow.dark" borderRadius="20px">
                熱賣中
              </Badge>
            )}

            {soldOut && (
              <Badge py="6px" px="4" bgColor="#F7F2F0" color="natural.500" borderRadius="20px">
                售罄
              </Badge>
            )}
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};
export default EventCards;
