import { Grid, Text, Flex, Square, InputGroup, InputLeftAddon, InputRightAddon, Input, Button } from '@chakra-ui/react';


const fieldsTitle = ['區域', '票價(NTD)', '張數(上限4張)'];
const TicketPicker = () => {
  return (
    <Grid bg="white" borderRadius="6px" padding="16px 16px 26px 16px">
      {fieldsTitle.map((title) => <Text>{title}</Text>)}
      <Flex>
        <Square></Square>
        <Text></Text>
      </Flex>
      <Text></Text>
      <InputGroup >
      <InputLeftAddon>
        <Button></Button>
      </InputLeftAddon>
      <Input />
      <InputRightAddon>
      <Button></Button>
      </InputRightAddon>
      </InputGroup>
    </Grid>
  );
};

export default TicketPicker;
