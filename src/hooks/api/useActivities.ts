import useSWRWithPage from '@/hooks/useSWRWithPage';
import { Activities, ActivitiesSearch } from '@/types/activityTypes';

const useActivity = ({ page, pageSize, ...params }: ActivitiesSearch) => {
  const { data, ...props } = useSWRWithPage<Activities[]>(['activities', { page, pageSize, ...params }]);
  return { activities: data, ...props };
};

export default useActivity;
