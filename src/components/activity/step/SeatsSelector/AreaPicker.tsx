import { useEffect, useState } from 'react';
import { chakra, Card, CardHeader, CardBody, Heading, Divider, VStack, Square, Text } from '@chakra-ui/react';
import { SubArea, Area } from './types';

const AreaPicker = ({ price, name, subAreas }: Area) => {
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
      <Divider color="gray1.200" />
      <CardBody padding="26px 8px" display="grid" gridTemplateColumns="1fr 1fr" gap="16px">
        {areas.map((group: SubArea[]) => {
          return (
            <VStack key={group[0].name} align="start" spacing="0px">
              {group.map((subArea: SubArea) => {
                const getStatus = () => {
                  if (subArea.remainingSeats === 0) return 'soldout';
                  if (subArea.remainingSeats < 10) return 'remainFew';
                  return 'hotsell';
                };
                const statusMap = {
                  soldout: {
                    text: '完售',
                    color: 'gray1.600',
                  },
                  hotsell: {
                    text: '熱賣中',
                    color: 'black',
                  },
                  remainFew: {
                    text: `剩餘${subArea.remainingSeats}`,
                    color: 'brand.100',
                  },
                };
                return (
                  <chakra.button
                    key={subArea.id}
                    display="flex"
                    type="button"
                    w="100%"
                    padding="10px 8px"
                    sx={{ ':hover': { bg: 'gray1.100' } }}
                  >
                    <Square size="20px" bg={subArea.color} marginRight="8px" />
                    <Text marginRight="20px">{subArea.name}</Text>
                    <Text color={statusMap[getStatus()].color}>{statusMap[getStatus()].text}</Text>
                  </chakra.button>
                );
              })}
            </VStack>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default AreaPicker;
