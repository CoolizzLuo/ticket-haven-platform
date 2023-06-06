import { Grid, Text, Flex, Square, InputGroup, InputLeftAddon, InputRightAddon, Input, Button } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import React from 'react';

const fieldsTitle = ['區域', '票價(NTD)', '張數(上限4張)'];

interface TicketPickerProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  area: {
    name: string;
    price: number;
  };
  subArea: {
    name: string;
    color: string;
    remainingSeats: number;
  };
}

const TicketPicker = ({ quantity, setQuantity, area, subArea }: TicketPickerProps) => {
  const maxCount = subArea.remainingSeats < 4 ? subArea.remainingSeats : 4;
  const countHandler = (type: string) => {
    switch (type) {
      case 'plus':
        setQuantity((prev) => (prev < maxCount ? prev + 1 : prev));
        break;
      case 'minus':
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
        break;
      default:
        break;
    }
  };
  return (
    <Grid bg="white" borderRadius="6px" padding="16px 16px 26px 16px" gridTemplateColumns="160px 163px 1fr" gap="16px">
      {fieldsTitle.map((title) => (
        <Text key={title} color="natural.700">
          {title}
        </Text>
      ))}
      <Flex alignItems="center">
        <Square size="20px" backgroundColor={subArea.color} marginRight="8px" />
        <Text>{subArea.name}</Text>
      </Flex>
      <Flex alignItems="center">
        <Text color="primary.500" fontSize="24px" fontWeight="bold" fontFamily="Noto Sans">
          {area.price}
        </Text>
      </Flex>
      <InputGroup display="flex">
        <InputLeftAddon height="fit-content" padding="0" borderColor="natural.100">
          <Button variant="light" colorScheme="natural" size="sm" onClick={() => countHandler('minus')}>
            <MinusIcon />
          </Button>
        </InputLeftAddon>
        <Input
          height="100%"
          borderColor="natural.100"
          type="number"
          textAlign="center"
          value={quantity}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.select();
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuantity((prev) => {
              const updateCount = Number(e.target.value);
              if (updateCount < maxCount && updateCount > 0) {
                return updateCount;
              }
              return prev;
            })
          }
        />
        <InputRightAddon height="fit-content" padding="0" borderColor="natural.100">
          <Button variant="light" colorScheme="natural" size="sm" onClick={() => countHandler('plus')}>
            <AddIcon />
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Grid>
  );
};

export default TicketPicker;
