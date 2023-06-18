import { useEffect, useState } from 'react';
import { chakra, Card, CardHeader, CardBody, Heading, Divider, VStack, Square, Text } from '@chakra-ui/react';
import { SubArea, Area } from '@/types/activityTypes';

interface AreaPickerProps extends Area {
  clickHandler: (subArea: SubArea) => void;
}

const statusContent = (remainingSeats: number) => {
  const getStatus = remainingSeats === 0 ? 'soldout' : remainingSeats < 10 ? 'remainFew' : 'hotsell';
  const statusMap = {
    soldout: {
      text: '完售',
      color: 'natural.600',
    },
    hotsell: {
      text: '熱賣中',
      color: 'black',
    },
    remainFew: {
      text: `剩餘${remainingSeats}`,
      color: 'primary.500',
    },
  };
  return statusMap[getStatus];
};

const AreaPicker = ({ price, name, subAreas, clickHandler }: AreaPickerProps) => {
  const [areas, setAreas] = useState<SubArea[][]>([]);
  useEffect(() => {
    const sortedObj = subAreas.reduce((acc: { [key: string]: SubArea[] }, area: SubArea) => {
      if (acc[area.color]) {
        acc[area.color].push(area);
      } else {
        acc[area.color] = [area];
      }
      return acc;
    }, {});
    setAreas(Object.values(sortedObj));
  }, [subAreas]);
  return (
    <Card variant="filled" bg="white" borderRadius="4px">
      <CardHeader padding="16px 12px">
        <Heading as="h6" fontSize="20px">
          <chakra.span marginRight="8px">${price}</chakra.span>
          {name}
        </Heading>
      </CardHeader>
      <Divider color="natural.200" />
      <CardBody padding="26px 8px" display="grid" gridTemplateColumns="1fr 1fr" gap="16px">
        {areas.length > 0 ? (
          areas.map((group: SubArea[]) => {
            return (
              <VStack key={group[0].name} align="start" spacing="0px">
                {group.map((subArea: SubArea) => {
                  const status = statusContent(subArea.remainingSeats);
                  return (
                    <chakra.button
                      key={subArea.id}
                      display="flex"
                      type="button"
                      w="100%"
                      padding="10px 8px"
                      sx={{ ':hover': { bg: 'natural.100' } }}
                      onClick={() => clickHandler(subArea)}
                    >
                      <Square size="20px" bg={subArea.color} marginRight="8px" />
                      <Text marginRight="20px">{subArea.name}</Text>
                      <Text color={status.color}>{status.text}</Text>
                    </chakra.button>
                  );
                })}
              </VStack>
            );
          })
        ) : (
          <Text size="12px" color="natural.700" marginLeft="8px">
            無符合的座位區
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

export default AreaPicker;
