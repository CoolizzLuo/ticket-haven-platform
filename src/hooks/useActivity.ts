import useSWR from 'swr';
import { Activity } from '@/types/activityTypes';

const useActivity = (id?: string) => {
  const { data, ...props } = useSWR<Activity>(id && `activities/${id}`);
  return { activity: data, ...props };
};

export default useActivity;
