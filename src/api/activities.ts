import { ActivitiesSearch } from '@/types/activityTypes';
import { axiosClient } from './axiosClient';

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
