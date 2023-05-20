import { ActivitiesSearch } from '@/types/activityTypes';
import axiosClient from './axiosClient';

export const fetchEvents = async (search: ActivitiesSearch) => {
  return axiosClient.get('activities', { params: { ...search } });
};
