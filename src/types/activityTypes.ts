export type Activities = {
  id: string;
  seatCount: number;
  name: string;
  coverImgUrl: string;
  endAt: string;
  startAt: string;
  sellAt: string;
  location: string;
  content: string;
  notice: string;
  region: number;
  soldOut: boolean;
};

export interface SearchFormState {
  region?: number | '';
  startAfter?: string;
  q?: string;
}

export type ActivitiesSearch = SearchFormState & {
  page: number;
  pageSize: number;
  startBefore?: string;
  sort?: string;
};

export interface Event {
  id: string;
  startTime: string;
  endTime: string;
  sellStartTime: string;
  sellEndTime: string;
}

export interface Activity {
  id: string;
  name: string;
  converImageUrl: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  content: string;
  notice: string;
  seatMapUrl: string;
  events: Event[];
}

export interface SubArea {
  id: string;
  name: string;
  remainingSeats: number;
  color: string;
}

export interface Area {
  id: string;
  price: number;
  name: string;
  subAreas: SubArea[];
}

