import { SWRConfiguration } from 'swr';
import axiosClient from './axiosClient';

export const fetcher: SWRConfiguration['fetcher'] = (resource, init) =>
  axiosClient.get(resource, init).then((res) => res.data?.data);

export const paginationFetcher: SWRConfiguration['fetcher'] = (resource, init) =>
  axiosClient.get(resource, init).then((res) => res.data);
