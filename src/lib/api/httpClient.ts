type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';

const BASE_URL = process?.env?.API_URL || '';
const getDefaultHeaders = (): Record<string, string> => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const middleware = async <T>(response: Response) => {
  try {
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    // eslint-disable-next-line no-console
    console.log('Data:', data);
    return data as T;
  } catch (error) {
    // eslint-disable-next-line no-console

    console.error('Error:', error);
    throw error;
  }
};

const createApiMethod = (method: Method) => {
  return (endpoint: string) =>
    async <RequestData = void, ResponseData = void>(requestData?: RequestData, options: RequestInit = {}) => {
      const body = requestData && method !== 'GET' ? JSON.stringify(requestData) : undefined;

      const fetchOptions: RequestInit = {
        ...options,
        method,
        body,
        headers: {
          ...getDefaultHeaders(),
          ...(options.headers ?? {}),
        },
      };

      if (method === 'GET') {
        delete fetchOptions.body;
      }

      const url = new URL(endpoint, BASE_URL).href;
      const response = await fetch(url, fetchOptions);

      return middleware<ResponseData>(response);
    };
};

const httpClient = {
  get: createApiMethod('GET'),
  post: createApiMethod('POST'),
  put: createApiMethod('PUT'),
  delete: createApiMethod('DELETE'),
  patch: createApiMethod('PATCH'),
};

export default httpClient;
