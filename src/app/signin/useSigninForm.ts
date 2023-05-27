import { useState, useReducer } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { saveTokenToLS } from '@/api/auth';
import { userSignin } from '@/api/user';
import { SigninForm } from '@/types/userTyps';


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
  const router = useRouter();
  const params = useParams();

  const { redirect } = params;
  const previousPage = redirect || '/';

  // Form Data
  const [form, dispatch] = useReducer(signinFormReducer, initSigninForm);
  const onChangeHandler = (type: string, value: string) => dispatch({ type, playload: value });

  // Error Message
  const [errMsgMap, setErrMsgMap] = useState(initialErrMsg);

  const checkError = () => {
    const result =  Object.entries(form).reduce(
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
    if (!checkError()) {
      try {
        const res = await userSignin(form);
        const {
          data: { token },
        } = res.data;
        alert('登入成功！');
        saveTokenToLS(token);
        router.push(previousPage);
      } catch (err) {
        if (err instanceof AxiosError) {
          let message = '發生錯誤，請稍後再試';
          if (err.response?.data.status === '0002') {
            message = '帳號/密碼錯誤';
          }
          alert(message);
        }
      }
    }
  };

  return { errMsgMap, onChangeHandler, form, onSubmit };
};

export default useSigninForm;
