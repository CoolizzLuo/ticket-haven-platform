import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { Activities } from '@/types/activityTypes';

const Step = () => {
  const router = useRouter();
  const { step } = router.query;
  return <div>Step:{step}</div>;
};

// export const getServerSideProps: GetServerSideProps<activity> = async (context) => {
//   const id = context.query;
//   console.log(getServerSideProps)
//   return {seatImg: 'image'}
// };

export default Step;
