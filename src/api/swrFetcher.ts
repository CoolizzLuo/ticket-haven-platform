import { objectToUrlSearchParams } from '@/lib/tools';
import axiosClient from './axiosClient';

type Args = string | [string, URLSearchParams | Record<string, any>];

const BaseFetcher = (args: Args) => {
  let url = args;
  let params: URLSearchParams | undefined;

  if (Array.isArray(args)) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [_url, _params] = args;
    url = _url;
    if (_params instanceof URLSearchParams) {
      params = _params;
    } else {
      params = objectToUrlSearchParams(_params);
    }
  }

  return axiosClient.get(url as string, params && { params });
};

export const fetcher = (args: Args) => BaseFetcher(args).then((res) => res.data?.data);

export const paginationFetcher = (args: Args) => BaseFetcher(args).then((res) => res.data);
