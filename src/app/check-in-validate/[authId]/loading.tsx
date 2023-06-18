import { Loading as LoadingComp } from './LoadingComp';

const Loading = () => {
  return <LoadingComp isOpen={true} position="fixed" inset={0} />;
};

export default Loading;
