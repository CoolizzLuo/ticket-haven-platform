export interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationResponse<T> extends BaseResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
