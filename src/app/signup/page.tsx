'use client';

import React, { useReducer } from 'react';
import { Link } from '@chakra-ui/next-js';
import { Input, InputGroup, Container, VStack, Button } from '@chakra-ui/react';
import axios from 'axios';

interface SignupForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initSignupForm = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const signupFormReducer = (state: SignupForm, { type, playload }: { type: string; playload: string }) => {
  return { ...state, [type]: playload };
};

const Signup = () => {
  const [form, dispatch] = useReducer(signupFormReducer, initSignupForm);
  const onChangeHandler = (type: string, value: string) => dispatch({ type, playload: value });
  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (form.password === form.confirmPassword) {
      axios
        .post('http://localhost:3000/api/user/signup', form)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert(res.data.message);
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert('您輸入的密碼不一致！請重新輸入');
      dispatch({ type: 'password', playload: '' });
      dispatch({ type: 'confirmPassword', playload: '' });
    }
  };
  return (
    <Container w="50%" margin="auto">
      <VStack spacing="4">
        <InputGroup>
          <Input
            placeholder="使用者名稱"
            value={form.userName}
            onChange={(e) => onChangeHandler('userName', e.target.value)}
          />
        </InputGroup>
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
        <InputGroup>
          <Input
            placeholder="再次輸入密碼"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => onChangeHandler('confirmPassword', e.target.value)}
          />
        </InputGroup>
        <Button onClick={onSubmit}>註冊</Button>
        <Link href="/signin" fontSize="xs">
          登入
        </Link>
      </VStack>
    </Container>
  );
};

export default Signup;
