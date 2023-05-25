import { Metadata } from 'next';
import Header from './Header';
import Footer from './Footer';
import Providers from './providers';
import Dialog from './Dialog';

export const metadata: Metadata = {
  title: 'Ticket Haven',
  description: 'Ticket Haven',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="zh-TW">
      <body>
        <Providers>
          <Dialog />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
