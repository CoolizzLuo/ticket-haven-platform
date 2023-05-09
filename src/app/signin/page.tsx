'use client';

import React, { useReducer } from 'react';
import axios from 'axios';
import { Link } from '@chakra-ui/next-js';
import { Input, InputGroup, Container, VStack, Button } from '@chakra-ui/react';

interface SigninForm {
  email: string;
  password: string;
}

const initSigninForm = {
  email: '',
  password: '',
};

const signinFormReducer = (state: SigninForm, { type, playload }: { type: string; playload: string }) => {
  return { ...state, [type]: playload };
};

const Signin = () => {
  const [form, dispatch] = useReducer(signinFormReducer, initSigninForm);
  const onChangeHandler = (type: string, value: string) => dispatch({ type, playload: value });
  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .post('https://ticket-haven.onrender.com/user/signin', form)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert(res.data.message);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <Container w="50%" margin="auto">
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
