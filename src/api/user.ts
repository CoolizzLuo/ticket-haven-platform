import { User } from '@/types/userTyps';
import axiosClient from './axiosClient';

const fakeId = '644e3f3afc13ae317e842dd1';

export const getUserInfo = () => {
  return axiosClient.get('user', { headers: { authorization: fakeId } });
};

export const updatUserInfo = (data: User) => {
  return axiosClient.patch('user', data, { headers: { authorization: fakeId } });
};
