'use client';

import ProgressBar from '@/components/activity/step/ProgressBar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from '@/lib/chakra';
import { usePathname } from 'next/navigation';
import { activity } from './mocks';

const pages: Record<string, { step: number; title: string }> = {
  'select-area': { step: 1, title: '選擇區域' },
  'select-seats': { step: 2, title: '選擇張數' },
  confirm: { step: 3, title: '購票確認' },
  completed: { step: 5, title: '購票完成' },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const page = pages[pathname.split('/').pop() as string];

  return (
    <section>
      <Container maxW="container.xl" mt="40px" mb="24px">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">首頁</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/activities/${activity.id}`}>{activity.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink fontWeight="700">{page.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
      <ProgressBar step={page.step} />
      {children}
    </section>
  );
};

export default Layout;
