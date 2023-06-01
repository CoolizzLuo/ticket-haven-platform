import React from 'react';
import { Input, Flex, Text } from '@chakra-ui/react';

interface InputWithErrMsgType {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errMsg?: string;
  type?: string;
  isInvalid?: boolean;
}

const InputWithErrMsg = ({
  placeholder,
  value,
  onChange,
  errMsg = '',
  type = '',
  isInvalid = false,
}: InputWithErrMsgType) => {
  return (
    <Flex align="start" direction="column">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        focusBorderColor="primary.500"
        errorBorderColor="red.300"
        isInvalid={isInvalid || !!errMsg}
        type={type}
      />
      {errMsg && (
        <Text fontSize="xs" color="red.500" mt="4px">
          {errMsg}
        </Text>
      )}
    </Flex>
  );
};

export default InputWithErrMsg;
