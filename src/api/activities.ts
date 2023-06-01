import { setCookie, getCookie } from 'cookies-next';
import { ActivitiesSearch, ChoseArea } from '@/types/activityTypes';
import dayjs from 'dayjs';
import { axiosClient } from './axiosClient';

export const fetchActivities = async (search: ActivitiesSearch) => {
  return axiosClient.get('activities', { params: { ...search } });
};

export const getActivityById = async (id: string) => {
  return axiosClient.get(`activities/${id}`);
};

// export const getSeatsArea = async (eventId: string) => {
//   return axiosClient.get(`activities/${eventId}/seat-sell-status`)
// }

export const areaCookie = {
    key: 'user-chose-area',
    setChoseArea(data: ChoseArea) {
      setCookie(this.key, JSON.stringify(data), {expires: dayjs().add(10, 'm').toDate()});
    },
    getChoseArea(): ChoseArea | undefined{
      const result = getCookie(this.key);
      return typeof result === 'string' ? JSON.parse(result) : null;
    }
  };
