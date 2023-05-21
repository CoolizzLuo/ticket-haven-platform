'use client';

import React, { useReducer } from 'react';
import { Link } from '@chakra-ui/next-js';
import { Input, InputGroup, Container, VStack, Button } from '@chakra-ui/react';
import { SignupForm } from '@/types/userTyps';
import { userSignup } from '@/api/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const initSignupForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const signupFormReducer = (state: SignupForm, { type, playload }: { type: string; playload: string }) => {
  return { ...state, [type]: playload };
};

const Signup = () => {
  const [form, dispatch] = useReducer(signupFormReducer, initSignupForm);
  const router = useRouter();
  const onChangeHandler = (type: string, value: string) => dispatch({ type, playload: value });
  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let errorMsg = '';
    const { confirmPassword, ...postForm } = form;
    if (postForm.password === confirmPassword) {
      if (confirmPassword.length < 8) {
        errorMsg = '密碼不可小於 8 個字';
      } else {
        try {
          const res = await userSignup(postForm);
          if (res.status === 200) {
            alert("登入成功!");
            router.push('/signin');
          }
        } catch (err) {
          if (err instanceof AxiosError) {
            let message = '發生錯誤，請稍後再試';
            switch(err.response?.data.status){
              case '0002':
                message = 'Email 已存在，請重新輸入';
                break;
              default:
                break;
            }
            alert(message);
            console.log(err);
          }
        }
      }
    } else {
      errorMsg = '您輸入的密碼不一致！請重新輸入';
      dispatch({ type: 'password', playload: '' });
      dispatch({ type: 'confirmPassword', playload: '' });
    }
    if (errorMsg) {
      alert(errorMsg);
    }
  };
  return (
    <Container w="50%" margin="auto" py="80px">
      <VStack spacing="4">
        <InputGroup>
          <Input
            placeholder="使用者名稱"
            value={form.username}
            onChange={(e) => onChangeHandler('username', e.target.value)}
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
