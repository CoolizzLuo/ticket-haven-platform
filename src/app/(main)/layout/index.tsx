import Header from './Header';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: 'calc(100vh - 379px)' }}>{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
