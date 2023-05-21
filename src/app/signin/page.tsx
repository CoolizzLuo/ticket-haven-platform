'use client';

import React, { useReducer } from 'react';
import { saveTokenToLS } from '@/api/auth';
import { Link } from '@chakra-ui/next-js';
import { Input, InputGroup, Container, VStack, Button } from '@chakra-ui/react';
import { useRouter, useParams } from 'next/navigation';
import { SigninForm } from '@/types/userTyps';
import { userSignin } from '@/api/user';
import { AxiosError } from 'axios';

const initSigninForm = {
  email: '',
  password: '',
};

const signinFormReducer = (state: SigninForm, { type, playload }: { type: string; playload: string }) => {
  return { ...state, [type]: playload };
};

const Signin = () => {
  // Router
  const router = useRouter();
  const params = useParams();

  const { redirect } = params;
  const previousPage = redirect || '/';

  // Form Data
  const [form, dispatch] = useReducer(signinFormReducer, initSigninForm);
  const onChangeHandler = (type: string, value: string) => dispatch({ type, playload: value });

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await userSignin(form);
      const {
        message,
        data: { token },
      } = res.data;
      alert(message);
      saveTokenToLS(token);
      router.push(previousPage);
    } catch (err) {
      if (err instanceof AxiosError) {
        let message = '發生錯誤，請稍後再試';
        switch(err.response?.data.status){
          case '0002':
            message = '帳號/密碼錯誤';
            break;
          case '0003':
            message = '帳號不存在，請重新註冊';
            router.push('/signup');
            break;
          default:
            break;
        }
        alert(message);
        console.error(err);
      }
    }
  };

  return (
    <Container w="50%" margin="auto" py="80px">
      <VStack spacing="4">
        <InputGroup>
          <Input placeholder="Email" value={form.email} onChange={(e) => onChangeHandler('email', e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="密碼"
            type="password"
            value={form.password}
            onChange={(e) => onChangeHandler('password', e.target.value)}
          />
        </InputGroup>
        <Button onClick={onSubmit}>登入</Button>
        <Link href="/signup" fontSize="xs">
          註冊
        </Link>
      </VStack>
    </Container>
  );
};

export default Signin;
