import { useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { SignupForm } from '@/types/userTyps';
import { userSignup } from '@/api/user';

const initSignupForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const signupFormReducer = (state: SignupForm, { type, playload }: { type: string; playload: string }) => {
  return { ...state, [type]: playload };
};

interface ErrorMsg {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

const initialErrMsg = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const useSignupForm = () => {
  // Router
  const router = useRouter();

  // Form Data
  const [form, dispatch] = useReducer(signupFormReducer, initSignupForm);
  const onChangeHandler = (type: string, value: string) => dispatch({ type, playload: value });

  // Error Message
  const [errMsgMap, setErrMsgMap] = useState(initialErrMsg);
  const checkError = () => {
    const error = Object.entries(form).reduce(
      (acc: ErrorMsg, [key, value]: [string, string]) => {
        if (!value) {
          acc[key] = '欄位不得為空';
          return acc;
        }
        switch (key) {
          case 'email': {
            const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!emailFormat.test(value)) acc.email = 'email 格式錯誤，請重新填寫!';
            return acc;
          }
          case 'password': {
            const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/g;
            if (value.length < 8) {
              acc.password = '密碼不可小於 8 個字';
              onChangeHandler('password', '');
              onChangeHandler('confirmPassword', '');
            } else if (!passwordFormat.test(value)) {
              acc.password = '密碼至少包含 1 個大小寫英文字母和數字';
              onChangeHandler('password', '');
              onChangeHandler('confirmPassword', '');
            }
            return acc;
          }
          case 'confirmPassword': {
            if (value !== form.password) {
              acc.confirmPassword = '您輸入的密碼不一致！請重新輸入';
              onChangeHandler('confirmPassword', '');
            }
            return acc;
          }
          default:
            return acc;
        }
      },
      { ...initialErrMsg },
    );
    setErrMsgMap(error);
    return !!Object.values(error).join('');
  };

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!checkError()) {
      try {
        const res = await userSignup(form);
        if (res.status === 200) {
          alert('註冊成功，請重新登入!');
          router.push('/signin');
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          let message = '發生錯誤，請稍後再試';
          if (err.response?.data.status === '0002') {
            message = 'Email 已存在，請重新輸入';
          }
          alert(message);
        }
      }
    }
  };

  return { errMsgMap, form, onSubmit, onChangeHandler };
};

export default useSignupForm;
