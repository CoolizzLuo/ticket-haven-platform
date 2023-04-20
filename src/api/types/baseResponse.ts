// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BaseResponse<T = any> {
  request_id?: string;
  code: number;
  message: string;
  data?: T;
}

export default BaseResponse;
