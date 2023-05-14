import { User } from '@/types/userTyps';
import axiosClient from './axiosClient';

export const getUserInfo = () => {
  return axiosClient.get('user');
};

export const updatUserInfo = (data: User) => {
  return axiosClient.patch('user', data);
};
