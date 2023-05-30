/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getServerSession } from 'next-auth';
// import { getSession } from 'next-auth/react';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type RequestData<
  RequestParams = Record<string, any> | void,
  RequestSearchParams = Record<string, string | string[]> | void,
> = {
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

const processResponse = async <T>(response: Response) => {
  try {
    const data = await parseData(response);

    console.log('Data:', data);
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

const objectToFormData = (object: Record<string, string | Blob>) => {
  const formData = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

const createRequest =
  (method: Method) =>
  (
    endpoint: string,
    options: Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>;
    } = {},
  ) =>
  async <RequestParams = void, RequestSearchParams = void, ResponseData = void>(
    requestData?: RequestData<RequestParams, RequestSearchParams>,
  ) => {
    // const token = await getSessionToken(requireAuth);

    const fetchOptions = {
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

    if (!['GET', 'HEAD'].includes(method) && requestData?.params) {
      let body: FormData | string;

      if (fetchOptions.headers?.['Content-Type'] === 'multipart/form-data') {
        const formData =
          requestData.params instanceof FormData ? requestData.params : objectToFormData(requestData.params);
        body = formData;
      } else {
        body = JSON.stringify(requestData.params);
      }

      fetchOptions.body = body;
    }

    const response = await fetch(url, fetchOptions);
    return processResponse<ResponseData>(response);
  };

export const httpClient = {
  get: createRequest('GET'),
  post: createRequest('POST'),
  postFormData: (
    e: string,
    o: Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>;
    } = {},
  ) =>
    createRequest('POST')(e, {
      ...o,
      headers: {
        ...(o.headers || {}),
        'Content-Type': 'multipart/form-data',
      },
    }),
  put: createRequest('PUT'),
  delete: createRequest('DELETE'),
  patch: createRequest('PATCH'),
};

export default httpClient;
