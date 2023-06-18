'use client';

import React from 'react';
import { Link } from '@chakra-ui/next-js';
import { Container, VStack, Button } from '@chakra-ui/react';
import InputWithErrMsg from '@/components/common/InputWithErrMsg';
import useSignupForm from './useSignupForm';

const Signup = () => {
  const { form, onChangeHandler, onSubmit, errMsgMap } = useSignupForm();

  return (
    <Container w="50%" margin="auto" py="80px">
      <VStack spacing="4">
        <InputWithErrMsg
          placeholder="使用者名稱"
          value={form.username}
          onChange={(e) => onChangeHandler('username', e.target.value)}
          errMsg={errMsgMap.username}
        />
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
          errMsg={errMsgMap.password}
        />
        <InputWithErrMsg
          placeholder="再次輸入密碼"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => onChangeHandler('confirmPassword', e.target.value)}
          errMsg={errMsgMap.confirmPassword}
        />
        <Button onClick={onSubmit}>註冊</Button>
        <Link href="/signin" fontSize="xs">
          登入
        </Link>
      </VStack>
    </Container>
  );
};

export default Signup;
