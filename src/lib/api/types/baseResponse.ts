export interface BaseResponse<T = void> {
  request_id: string;
  code: number;
  message: string;
  data?: T;
}

export default BaseResponse;
