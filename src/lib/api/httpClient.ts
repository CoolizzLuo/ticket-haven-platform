/* eslint-disable @typescript-eslint/no-explicit-any */
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { HttpStatusError } from './HttpStatusError';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type RequestData<
  RequestParams = Record<string, any> | void,
  RequestSearchParams = Record<string, string | string[]> | void,
> = {
  params?: RequestParams | FormData;
  searchParams?: RequestSearchParams;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const parseData = (response: Response) => {
  const contentType = response.headers.get('Content-Type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  if (contentType.includes('application/octet-stream')) {
    return response.arrayBuffer();
  }

  return response.text();
};

const processResponse = async <T>(response: Response) => {
  const data = await parseData(response);
  if (!response.ok) {
    if (response.status === 401) {
      redirect('/signin?signOut=true');
    }
    throw new HttpStatusError(response.status, response.statusText, data);
  }
  return data as T;
};

const isServerSide = typeof window === 'undefined';
const getAuthToken = async () => {
  let session: Session | null;

  if (isServerSide) {
    const { getServerSession } = await import('next-auth');
    session = await getServerSession(authOptions);
  } else {
    const { getSession } = await import('next-auth/react');
    session = await getSession();
  }
  return session?.token;
};

const createRequest =
  (method: Method) =>
  (endpoint: string) =>
  async <RequestParams = void, RequestSearchParams = void, ResponseData = void>(
    requestData?: RequestData<RequestParams, RequestSearchParams>,
    options: RequestInit = {},
  ) => {
    const token = await getAuthToken();

    const fetchOptions: RequestInit = {
      ...options,
      method,
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: token ? `Bearer ${token}` : '',
        ...(options.headers ?? {}),
      },
    };

    let url = new URL(endpoint, BASE_URL).href;
    if (requestData?.searchParams) {
      const urlSearchParams = new URLSearchParams();

      Object.entries<string>(requestData.searchParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => urlSearchParams.append(key, val.toString()));
        } else {
          urlSearchParams.append(key, value.toString());
        }
      });
      url += `?${urlSearchParams.toString()}`;
    }

    if (requestData?.params instanceof FormData) {
      fetchOptions.body = requestData.params;
      // fetch will set the correct content type automatically
      if (fetchOptions?.headers) {
        delete (fetchOptions.headers as Record<string, string>)['Content-Type'];
      }
    } else if (requestData?.params && !['GET', 'HEAD'].includes(method)) {
      fetchOptions.body = JSON.stringify(requestData.params);
    }

    const response = await fetch(url, fetchOptions);
    return processResponse<ResponseData>(response);
  };

export const httpClient = {
  get: createRequest('GET'),
  post: createRequest('POST'),
  put: createRequest('PUT'),
  delete: createRequest('DELETE'),
  patch: createRequest('PATCH'),
};
