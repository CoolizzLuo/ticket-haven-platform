import { Card, CardBody, Image, Text, Heading, Badge, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { dayFormat, isBeforeToday } from '@/lib/dayjs';

type Props = {
  id: string;
  name: string;
  startAt: string;
  soldOut: boolean;
};

const EventCards = ({ id, name, startAt, soldOut }: Props) => {
  return (
    <Link href={`/activities/${id}`} scroll={true}>
      <Card border="none" boxShadow="none">
        <CardBody p="0">
          <Image src={`image/${id}.jpg`} borderRadius="lg" alt="eventImg" width="100%" h="200px" objectFit="cover" />
          <Stack py="3" align="flex-start">
            <Text size="20px" fontWeight="400" color="#9F9D9E">
              {dayFormat(startAt)}
            </Text>
            <Heading size="3" fontWeight="700" color="#565355" mb="12px">
              {name}
            </Heading>

            {isBeforeToday(startAt) && (
              <Badge py="6px" px="4" bgColor="#F5F2F4" color="#565355" borderRadius="20px">
                即將開賣
              </Badge>
            )}

            {!isBeforeToday(startAt) && !soldOut && (
              <Badge py="6px" px="4" bgColor="#FFF1C1" color="#BF7506" borderRadius="20px">
                熱賣中
              </Badge>
            )}

            {!isBeforeToday(startAt) && soldOut && (
              <Badge py="6px" px="4" bgColor="#F7F2F0" color="#BFBCBD" borderRadius="20px">
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
