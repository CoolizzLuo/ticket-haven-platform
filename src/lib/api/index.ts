import { BaseResponse } from '@/lib/api/types/baseResponse';
import { UserSinginReq, UserSinginRes } from '@/lib/api/types/userSignin';
import { UserSingupReq } from '@/lib/api/types/userSignup';
import { httpClient, RequestData } from './httpClient';

interface API<Req extends RequestData, Res = void> {
  (req?: Req, options?: RequestInit): Promise<BaseResponse<Res> | undefined>;
}

interface APIEndpoints {
  demo: (id: string) => API<RequestData<void, { page: string }>, void>;
  signin: API<RequestData<UserSinginReq>, UserSinginRes>;
  signup: API<RequestData<UserSingupReq>>;
  uploadFile: API<RequestData<FormData>>;
}

const api: APIEndpoints = {
  demo: (id: string) => httpClient.get(`/demo/${id}`), // GET /demo/:id?page=1
  signin: httpClient.post('/user/signin'),
  signup: httpClient.post('/user/signup'),
  uploadFile: httpClient.post('/file/upload'),
};

export default api;
