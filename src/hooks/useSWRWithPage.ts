import { paginationFetcher } from '@/api/swrFetcher';
import { PaginationResponse } from '@/api/types/baseResponse';
import { useRef } from 'react';
import useSWR, { Key, SWRConfiguration } from 'swr';

const useSWRWithPage = <Data = any, Error = any>(
  props: Key,
  config?: SWRConfiguration<PaginationResponse<Data>, Error>,
) => {
  const { data, isLoading, ...others } = useSWR<PaginationResponse<Data>, Error>(props, paginationFetcher, config);

  const prefetchCountRef = useRef(data?.totalCount);

  if (!isLoading) {
    prefetchCountRef.current = data?.totalCount;
  }

  return {
    data: data?.data,
    isLoading,
    totalCount: prefetchCountRef.current,
    ...others,
  };
};

export default useSWRWithPage;
