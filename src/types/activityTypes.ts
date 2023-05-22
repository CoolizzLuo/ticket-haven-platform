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
