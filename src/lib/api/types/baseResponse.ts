export interface BaseResponse<T = void> {
  code: string;
  message: string;
  data?: T;
}

export interface PaginationResponse<T> extends BaseResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
