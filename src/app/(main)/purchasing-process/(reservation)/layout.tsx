'use client';

import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import useActivity from '@/hooks/api/useActivity';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const Layout = ({ children }: { children: ReactNode }) => {
  const activityId = useTicketPurchasingStore.use.activityId();
  const setActivity = useTicketPurchasingStore.use.setActivity();
  const router = useRouter();
  const { activity } = useActivity(activityId);

  useEffect(() => {
    if (!activityId) {
      router.push('/');
    } else if (activity) {
      setActivity(activity);
    }
  }, [activityId, activity]);

  return (
    <>
      <Breadcrumb style={{ padding: '30px 20px' }}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">首頁 </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/activities/${activityId}`}>{activity?.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" fontWeight="700">
            購票流程
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {children}
    </>
  );
};

export default Layout;
