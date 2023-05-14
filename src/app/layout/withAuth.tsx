'use client';

import { getTokenFromLS } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { ComponentType } from 'react';

const withAuth = <P extends object>(WrapComponents: ComponentType<P>) => {
  const Auth = (props: P) => {
    const router = useRouter();

    const token = getTokenFromLS();
    if (!token) {
      router.push('/signin');
      return null;
    }
    return <WrapComponents {...props} />;
  };
  return Auth;
};

export default withAuth;
