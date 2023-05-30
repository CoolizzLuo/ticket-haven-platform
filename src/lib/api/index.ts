import { BaseResponse } from '@/lib/api/types/baseResponse';
import { UserSinginReq, UserSinginRes } from '@/lib/api/types/userSignin';
import { UserSingupReq } from '@/lib/api/types/userSignup';
import { httpClient, RequestData } from './httpClient';

interface API<Req extends RequestData, Res = void> {
  (req?: Req, options?: RequestInit): Promise<BaseResponse<Res> | undefined>;
}

interface APIEndpoints {
  demo: (id: string) => API<RequestData<void, { page: number }>, void>;
  signin: API<RequestData<UserSinginReq>, UserSinginRes>;
  signup: API<RequestData<UserSingupReq>>;
}

const api: APIEndpoints = {
  demo: (id: string) => httpClient.get(`/demo/${id}`), // GET /demo/:id?page=1
  signin: httpClient.post('/user/signin'),
  signup: httpClient.post('/user/signup'),
};

export default api;
