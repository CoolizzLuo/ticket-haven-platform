import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Gender } from '@/constants/gender';
import { Region } from '@/constants/region';

export interface User {
  id: string;
  username: string;
  email: string;
  emailVerify: boolean;
  phoneVerify: boolean;
  phone?: string;
  gender?: Gender;
  bankCode?: string;
  bankAccount?: string;
  activityRegion?: Region;
  avatarUrl?: string;
}

export const useUser = () => {
  const { status } = useSession();
  const { data, ...props } = useSWR<User>(status === 'authenticated' && 'user');
  return { user: data, ...props };
};
