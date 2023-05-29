import { ActivitiesSearch } from '@/types/activityTypes';
import { axiosClient } from './axiosClient';

export const fetchEvents = async (search: ActivitiesSearch) => {
  return axiosClient.get('activities', { params: { ...search } });
};

export const getEventById = async (id: string) => {
  return axiosClient.get(`activities/${id}`);
};
