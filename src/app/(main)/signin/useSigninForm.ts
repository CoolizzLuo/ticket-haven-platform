import { useState, useReducer } from 'react';
import { useSearchParams } from 'next/navigation';
import { SigninForm } from '@/types/userTyps';
import { signIn } from 'next-auth/react';

const initSigninForm = {
  email: '',
  password: '',
};

const signinFormReducer = (state: SigninForm, { type, playload }: { type: string; playload: string }) => {
  return { ...state, [type]: playload };
};

interface ErrorMsg {
  email: string;
  password: string;
  [key: string]: string;
}

const initialErrMsg = {
  email: '',
  password: '',
};

const useSigninForm = () => {
  // Router
  const searchParams = useSearchParams();

  // Form Data
  const [form, dispatch] = useReducer(signinFormReducer, initSigninForm);
  const onChangeHandler = (type: string, value: string) => dispatch({ type, playload: value });

  // Error Message
  const [errMsgMap, setErrMsgMap] = useState(initialErrMsg);

  const checkError = () => {
    const result = Object.entries(form).reduce(
      (acc: ErrorMsg, [key, value]: [string, string]) => {
        if (!value) {
          acc[key] = '欄位不得為空';
          return acc;
        }
        switch (key) {
          case 'email': {
            const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!emailFormat.test(value)) {
              acc.email = '帳號或密碼錯誤！';
            }
            return acc;
          }
          case 'password': {
            const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/g;
            if (value.length < 8 || !passwordFormat.test(value)) {
              acc.email = '帳號或密碼錯誤！';
            }
            return acc;
          }
          default:
            return acc;
        }
      },
      { ...initialErrMsg },
    );
    setErrMsgMap(result);
    return !!Object.values(result).join('');
  };

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (checkError()) return;

    await signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: searchParams.get('callbackUrl') || '/',
    });
  };

  return { errMsgMap, onChangeHandler, form, onSubmit };
};

export default useSigninForm;
