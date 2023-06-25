import type { Metadata } from 'next';
import Providers from '../providers';

export const metadata: Metadata = {
  title: 'Ticket Haven - 演唱會售票網頁',
  description: 'Ticket Haven 是一個專業的演唱會售票平台，提供各種熱門演唱會的票務資訊和售票服務。',
  keywords: ['演唱會', '售票', '票務', 'Ticket Haven'],
  authors: [
    {
      name: 'Ya2',
      url: 'https://github.com/CoolizzLuo',
    },
    {
      name: 'Evonne',
      url: 'https://github.com/hsuifang',
    },
    {
      name: 'Page',
      url: 'https://github.com/pageshih',
    },
    {
      name: 'Peter',
      url: 'https://github.com/yurychang',
    },
    {
      name: 'Enzo',
      url: 'https://github.com/CoolizzLuo',
    },
  ],
  creator: '北十四',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
