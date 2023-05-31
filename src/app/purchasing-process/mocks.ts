export const activityId = '';
export const eventId = '';

export const activity = {
  id: '61697b11c0cb54d45f7c8dcb',
  name: '周杰倫 2023 熱情演唱會',
  coverImageUrl: 'image/61697b11c0cb54d45f7c8dcb.jpg',
  startTime: '2023-05-27T00:00:00.000Z',
  endTime: '2023-05-20T22:30:00.000Z',
  location: '台北小巨蛋',
  address: '台北市南港區研究院路三段2號',
  content:
    '周杰倫熱情演唱會將於2023年夏季在台北舉辦，這場演唱會將會有周杰倫最新的歌曲，以及經典的老歌，讓粉絲們享受一個熱情洋溢的夜晚。',
  notice:
    '1. 本場演唱會場地將會有嚴格的安檢措施，請攜帶身份證件進場。\n2. 禁止攜帶食物、酒精、寵物進場，會場內亦不得吸菸。\n3. 請提前到場，以免影響到您的入場體驗。',
  seatMapUrl: '/images/61697b11c0cb54d45f7c8dcb_seat_big.png',
  events: [
    {
      id: '646780cb2d0f3b114c2ee2db',
      startTime: '2023-05-20T19:30:00.000Z',
      endTime: '2023-05-20T22:30:00.000Z',
      sellStartTime: '2023-04-20T10:00:00.000Z',
      sellEndTime: '2023-05-20T18:00:00.000Z',
      soldOut: false,
    },
  ],
};

export const event = {
  id: '646780cb2d0f3b114c2ee2db',
  startTime: '2023-05-20T19:30:00.000Z',
  endTime: '2023-05-20T22:30:00.000Z',
  sellStartTime: '2023-04-20T10:00:00.000Z',
  sellEndTime: '2023-05-20T18:00:00.000Z',
  soldOut: false,
};

export const order = {
  id: '6466812d6a4040db3709fc0c',
  orderNo: '2023051809fc0c',
  createAt: '2023-05-18T19:49:01.400Z',
  status: 0,
  price: 3000,
  user: {
    id: '644e3f3afc13ae317e842dd1',
    name: 'lmacalroy0',
    email: 'ahuyge0@amazon.com',
    cellphone: '(886) 920123123',
  },
  activity: {
    id: '61697b11c0cb54d45f7c8dcb',
    name: '周杰倫 2023 熱情演唱會',
    location: '台北小巨蛋',
    eventId: '646780cb2d0f3b114c2ee2db',
    eventStartTime: '2023-05-20T19:30:00.000Z',
    eventEndTime: '2023-05-20T22:30:00.000Z',
  },
  seats: [
    {
      subAreaId: '646780cb2d0f3b114c2ee2dd',
      subAreaName: 'Subarea 1',
      price: 956,
      row: 1,
      seat: 2,
    },
    {
      subAreaId: '646780cb2d0f3b114c2ee2dd',
      subAreaName: 'Subarea 1',
      price: 956,
      row: 1,
      seat: 3,
    },
    {
      subAreaId: '646780cb2d0f3b114c2ee2dd',
      subAreaName: 'Subarea 1',
      price: 956,
      row: 1,
      seat: 4,
    },
  ],
};
