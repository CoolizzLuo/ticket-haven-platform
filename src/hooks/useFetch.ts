import { useRef, useState, useEffect, useCallback, useMemo } from 'react';

type ApiCall<T, U> = (request?: T, options?: RequestInit) => Promise<U>;

const useFetch = <T, U>(apiCall: ApiCall<T, U>, request?: T, options?: RequestInit) => {
  const [data, setData] = useState<U | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const memoizedApiCall = useMemo(() => apiCall, []);
  const memoizedRequest = useMemo(() => request, []);
  const memoizedOptions = useMemo(() => options, []);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setError(error);
    } else {
      setError(new Error('Unknown error'));
    }
  }, []);

  const execute = useCallback(
    async (request?: T) => {
      abortController.current?.abort();
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await memoizedApiCall(request || memoizedRequest, {
          signal: abortController.current.signal,
          ...memoizedOptions,
        });
        setData(response);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [memoizedApiCall, memoizedRequest, memoizedOptions],
  );

  useEffect(() => {
    execute();

    return () => abortController.current?.abort();
  }, [execute]);

  return { isLoading, error, data, execute };
};

export default useFetch;
