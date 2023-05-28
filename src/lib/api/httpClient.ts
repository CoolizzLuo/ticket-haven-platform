// import { getServerSession } from 'next-auth';
// import { getSession } from 'next-auth/react';

export type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';
export type RequestData<RequestParams = void, RequestSearchParams = void> = {
  params?: RequestParams;
  searchParams?: RequestSearchParams;
};

const BASE_URL = process?.env?.API_URL || '';
const DEFAULT_HEADERS = {
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

const processResponse = <T>(response: Response) => {
  try {
    const data = parseData(response);

    console.log('Data:', data);
    return data as T;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

// const getSessionToken = async (requireAuth: boolean) => {
//   let token;
//   if (requireAuth) {
//     const isServer = typeof window === 'undefined';
//     const session = isServer ? await getServerSession() : await getSession();
//     if (!session) {
//       throw new Error('Unauthorized');
//     }
//     token = session.user;
//   }
//   return token;
// };

const createApiMethod =
  (method: Method) =>
  (endpoint: string, requireAuth = false) =>
  async <RequestParams = void, RequestSearchParams = void, ResponseData = void>(
    requestData?: RequestData<RequestParams, RequestSearchParams>,
    options: RequestInit = {},
  ) => {
    const body = requestData?.params && ['GET', 'HEAD'].includes(method) ? JSON.stringify(requestData) : undefined;

    let newEndpoint = endpoint;
    if (requestData?.searchParams) {
      const urlSearchParams = new URLSearchParams(requestData.searchParams as Record<string, string>);
      newEndpoint += `?${urlSearchParams.toString()}`;
    }

    // const token = getSessionToken(requireAuth);

    const url = new URL(newEndpoint, BASE_URL).href;
    const fetchOptions: RequestInit = {
      ...options,
      method,
      body,
      headers: {
        ...DEFAULT_HEADERS,
        // Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    };

    const response = await fetch(url, fetchOptions);
    return processResponse<ResponseData>(response);
  };

export const httpClient = {
  get: createApiMethod('GET'),
  post: createApiMethod('POST'),
  put: createApiMethod('PUT'),
  delete: createApiMethod('DELETE'),
  patch: createApiMethod('PATCH'),
};

export default httpClient;
