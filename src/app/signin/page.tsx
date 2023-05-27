'use client';

import React from 'react';
import { Link } from '@chakra-ui/next-js';
import { Container, VStack, Button } from '@chakra-ui/react';
import InputWithErrMsg from '@/components/common/InputWithErrMsg';
import useSigninForm from './useSigninForm';

const Signin = () => {
  const { onChangeHandler, form, errMsgMap, onSubmit } = useSigninForm();

  return (
    <Container w="50%" margin="auto" py="80px">
      <VStack spacing="4">
        <InputWithErrMsg
          placeholder="Email"
          value={form.email}
          onChange={(e) => onChangeHandler('email', e.target.value)}
          errMsg={errMsgMap.email}
        />
        <InputWithErrMsg
          placeholder="密碼"
          type="password"
          value={form.password}
          onChange={(e) => onChangeHandler('password', e.target.value)}
          isInvalid={!!errMsgMap.email}
        />
        <Button onClick={onSubmit}>登入</Button>
        <Link href="/signup" fontSize="xs">
          註冊
        </Link>
      </VStack>
    </Container>
  );
};

export default Signin;
