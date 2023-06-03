export interface BaseResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationResponse<T = unknown> extends BaseResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
