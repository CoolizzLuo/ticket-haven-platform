import { User, SigninForm, SignupForm } from '@/types/userTyps';
import { axiosClient } from './axiosClient';

export const getUserInfo = () => {
  return axiosClient.get('user');
};

export const updatUserInfo = (data: User) => {
  return axiosClient.patch('user', data);
};

export const userSignin = (data: SigninForm) => {
  return axiosClient.post('user/signin', data);
};

export const userSignup = (data: SignupForm) => {
  return axiosClient.post('user/signup', data);
};
