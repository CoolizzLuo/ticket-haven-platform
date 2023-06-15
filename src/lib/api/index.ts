import { BaseResponse } from '@/lib/api/types/baseResponse';
import { UserSinginReq, UserSinginRes } from '@/lib/api/types/userSignin';
import { UserSingupReq } from '@/lib/api/types/userSignup';
import { httpClient, RequestData } from './httpClient';
import { CreateShareCodeRes, ExchangeTicketReq } from './types/shareTicket';

interface API<Req extends RequestData, Res = void> {
  (req: Req, options?: RequestInit): Promise<BaseResponse<Res>>;
}

interface APIEndpoints {
  signin: API<RequestData<UserSinginReq>, UserSinginRes>;
  signup: API<RequestData<UserSingupReq>>;
  createShareCode: (ticketNo: string) => Promise<BaseResponse<CreateShareCodeRes>>;
  exchangeTicket: API<RequestData<ExchangeTicketReq>>;
}

const api: APIEndpoints = {
  signin: httpClient.post('/user/signin'),
  signup: httpClient.post('/user/signup'),
  createShareCode: (ticketNo) => httpClient.post(`/tickets/${ticketNo}/share-code`)(),
  exchangeTicket: httpClient.post('/exchange-ticket'),
};

export default api;
