import { ActivitiesSearch } from '@/types/activityTypes';
import { axiosClient } from './axiosClient';

export const fetchActivities = async (search: ActivitiesSearch) => {
  return axiosClient.get('activities', { params: { ...search } });
};

export const getActivityById = async (id: string) => {
  return axiosClient.get(`activities/${id}`);
};

export const getSeatsArea = async (eventId: string) => {
  return axiosClient.get(`events/${eventId}/seat-sell-status`)
}

