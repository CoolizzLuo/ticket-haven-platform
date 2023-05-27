import { BaseResponse } from '@/lib/api/types/baseResponse';
import { UserSinginReq, UserSinginRes } from '@/lib/api/types/userSignin';
import { UserSingupReq } from '@/lib/api/types/userSignup';
import httpClient from './httpClient';

interface API<Req = void, Res = void> {
  (req?: Req, options?: RequestInit): Promise<BaseResponse<Res>>;
}

interface APIEndpoints {
  signin: API<UserSinginReq, UserSinginRes>;
  signup: API<UserSingupReq>;
}

const api: APIEndpoints = {
  signin: httpClient.post('/user/signin'),
  signup: httpClient.post('/user/signup'),
};

export default api;
