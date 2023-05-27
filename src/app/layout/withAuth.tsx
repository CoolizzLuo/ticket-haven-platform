'use client';

import { useSession } from 'next-auth/react';
import { ComponentType } from 'react';

const withAuth = <P extends object>(WrapComponents: ComponentType<P>) => {
  return function WithAuth(props: P) {
    const { status } = useSession({ required: true });

    return status !== 'loading' && <WrapComponents {...props} />;
  };
};

export default withAuth;
