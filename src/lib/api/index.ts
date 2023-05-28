import { BaseResponse } from '@/lib/api/types/baseResponse';
import { UserSinginReq, UserSinginRes } from '@/lib/api/types/userSignin';
import { UserSingupReq } from '@/lib/api/types/userSignup';
import { httpClient, RequestData } from './httpClient';

interface API<ReqParams = void, ReqSearchParams = void, Res = void> {
  (req?: RequestData<ReqParams, ReqSearchParams>, options?: RequestInit): Promise<BaseResponse<Res> | undefined>;
}
interface APIEndpoints {
  signin: API<UserSinginReq, void, UserSinginRes>;
  signup: API<UserSingupReq>;
}

const api: APIEndpoints = {
  signin: httpClient.post('/user/signin'),
  signup: httpClient.post('/user/signup'),
};

export default api;
