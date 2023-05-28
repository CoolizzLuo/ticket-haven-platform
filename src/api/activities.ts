import { setCookie, getCookie } from 'cookies-next';
import { ActivitiesSearch, SubArea } from '@/types/activityTypes';
import dayjs from 'dayjs';
import axiosClient from './axiosClient';

export const fetchEvents = async (search: ActivitiesSearch) => {
  return axiosClient.get('activities', { params: { ...search } });
};

export const getEventById = async () => {
  return {
    status: '0000',
    message: '成功',
    data: {
      id: '61697b11c0cb54d45f7c8dd0',
      seatCount: 182,
      name: '林宥嘉 2023 動次打次演唱會',
      coverImgUrl: '/images/61697b11c0cb54d45f7c8dd0_cover.jpg',
      startAt: '2023-05-21T19:30:00.000Z',
      endAt: '2023-05-21T22:30:00.000Z',
      sellAt: '2023-04-15T10:00:00.000Z',
      location: '台北小巨蛋',
      region: 2,
      soldOut: false,
      content:
        '欲購票者，需先完成加入會員及手機號碼驗證，驗證成功後才可開始購票，請提早完成手機驗證，以免影響購票。（手機號碼僅限首次加入會員者需要驗證。）',
      notice: 'notice',
      seatMapUrl: '/images/xxx.jpg',
      importantNotice: '...',
      events: [
        {
          id: 'event_id',
          startTime: '2023-04-20 17:00',
          endTime: '2023-04-20 19:00',
          sellStartTime: '2023-04-20 17:00',
          sellEndTime: '2023-04-20 19:00',
        },
      ],
    },
  };
};

export const getActivityInfo = async (id: string) => {
  return {
    status: '0000',
    message: '成功',
    data: {
      id: '61697b11c0cb54d45f7c8dd0',
      name: '林宥嘉 2023 動次打次演唱會',
      converImageUrl: '/images/61697b11c0cb54d45f7c8dd0_cover.jpg',
      startTime: '2023-05-21T19:30:00.000Z',
      endTime: '2023-05-21T22:30:00.000Z',
      location: '台北小巨蛋',
      address: '台北市南港區研究院路三段2號',
      content: '欲購票者，需先完成加入會員及手機號碼驗證，驗證成功後才可開始購票，請提早完成手機驗證，以免影響購票。（手機號碼僅限首次加入會員者需要驗證。）',
      notice: 'notice',
      seatMapUrl: 'https://images.unsplash.com/photo-1542029123374-26f7a8e05fdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
      events: [
        {
          id: 'event_id',
          startTime: '2023-04-20 17:00',
          endTime: '2023-04-20 19:00',
          sellStartTime: '2023-04-20 17:00',
          sellEndTime: '2023-04-20 19:00',
        },
      ],
    },
  };
}


export interface ChoseArea extends SubArea {
  price: number;
}

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
