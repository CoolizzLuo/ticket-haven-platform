export interface BaseResponse<T = void> {
  code: string;
  message: string;
  data?: T;
}

export default BaseResponse;
