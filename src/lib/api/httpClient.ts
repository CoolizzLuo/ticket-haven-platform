/* eslint-disable @typescript-eslint/no-explicit-any */
import { processResponse } from './utils';

export type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';
export type RequestData<
  RequestParams = Record<string, any> | void,
  RequestSearchParams = Record<string, string | number | boolean> | void,
> = {
  params?: RequestParams;
  searchParams?: RequestSearchParams;
};

const BASE_URL = process?.env?.API_URL || '';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

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
      const searchParams = new URLSearchParams(requestData.searchParams).toString();
      url += `?${searchParams}`;
    }

    if (requestData?.params && !['GET', 'HEAD'].includes(method)) {
      fetchOptions.body = JSON.stringify(requestData?.params);
    }

    const response = await fetch(url, fetchOptions);
    return processResponse<ResponseData>(response);
  };

const createFileUploadRequest =
  (endpoint: string, requireAuth = false) =>
  async <RequestParams = void, RequestSearchParams = void, ResponseData = void>(
    file: File,
    requestData?: RequestData<RequestParams, RequestSearchParams>,
    options: RequestInit = {},
  ) => {
    // const token = await getSessionToken(requireAuth);

    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions: RequestInit = {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    };

    let url = new URL(endpoint, BASE_URL).href;
    if (requestData?.searchParams) {
      const urlSearchParams = new URLSearchParams(requestData.searchParams as Record<string, string>);
      url += `?${urlSearchParams.toString()}`;
    }

    const response = await fetch(url, fetchOptions);
    return processResponse<ResponseData>(response);
  };

export const httpClient = {
  get: createRequest('GET'),
  post: createRequest('POST'),
  postFile: createFileUploadRequest,
  put: createRequest('PUT'),
  delete: createRequest('DELETE'),
  patch: createRequest('PATCH'),
};

export default httpClient;
