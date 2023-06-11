/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getServerSession } from 'next-auth';
// import { getSession } from 'next-auth/react';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type RequestData<
  RequestParams = Record<string, any> | void,
  RequestSearchParams = Record<string, string | string[]> | void,
> = {
  params?: RequestParams | FormData;
  searchParams?: RequestSearchParams;
};

const BASE_URL = process?.env?.NEXT_PUBLIC_API_URL || '';
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
  try {
    const data = await parseData(response);

    return data as T;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// export const getSessionToken = async (requireAuth: boolean) => {
//   let token;
//   if (requireAuth) {
//     const isServerSide = typeof window === 'undefined';
//     const session = isServerSide ? await getServerSession() : await getSession();
//     if (!session) {
//       throw new Error('Unauthorized');
//     }
//     token = session.user;
//   }
//   return token;
// };

const createRequest =
  (method: Method) =>
  (endpoint: string, requireAuth = false) =>
  async <RequestParams = void, RequestSearchParams = void, ResponseData = void>(
    requestData?: RequestData<RequestParams, RequestSearchParams>,
    options: RequestInit = {},
  ) => {
    // const token = await getSessionToken(requireAuth);

    const fetchOptions: RequestInit = {
      ...options,
      method,
      headers: {
        ...DEFAULT_HEADERS,
        // Authorization: `Bearer ${token}`,
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

export default httpClient;
