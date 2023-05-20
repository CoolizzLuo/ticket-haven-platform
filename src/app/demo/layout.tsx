type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div style={{ width: '900px', height: '500px' }}>{children}</div>;
};

export default Layout;
