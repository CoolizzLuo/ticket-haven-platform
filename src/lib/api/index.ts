import { BaseResponse } from '@/lib/api/types/baseResponse';
import { UserSinginReq, UserSinginRes } from '@/lib/api/types/userSignin';
import { UserSingupReq } from '@/lib/api/types/userSignup';
import { httpClient, RequestData } from './httpClient';
import { CreateShareCodeRes } from './types/createShareCode';

interface API<Req extends RequestData | void, Res = void> {
  (req?: Req, options?: RequestInit): Promise<BaseResponse<Res>>;
}

interface APIEndpoints {
  signin: API<RequestData<UserSinginReq>, UserSinginRes>;
  signup: API<RequestData<UserSingupReq>>;
  createShareCode: (ticketNo: string) => Promise<BaseResponse<CreateShareCodeRes>>;
}

const api: APIEndpoints = {
  signin: httpClient.post('/user/signin'),
  signup: httpClient.post('/user/signup'),
  createShareCode: (ticketNo) => httpClient.post(`/tickets/${ticketNo}/share-code`)(),
};

export default api;
