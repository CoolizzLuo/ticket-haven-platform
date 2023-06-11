import { httpClient } from '@/lib/api/httpClient';

type Args = string | [string, URLSearchParams | Record<string, any>];

const BaseFetcher = (args: Args): Promise<any> => {
  if (Array.isArray(args)) {
    const [url, searchParams] = args;
    return httpClient.get(url as string)(searchParams && { searchParams });
  }
  return httpClient.get(args as string)();
};

export const fetcher = (args: Args) => BaseFetcher(args).then((data) => data?.data);

export const paginationFetcher = (args: Args) => BaseFetcher(args);
