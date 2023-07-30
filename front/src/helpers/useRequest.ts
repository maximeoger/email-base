import {useEffect, useState} from "react";
import axios, { CancelTokenSource } from "axios";

export interface RequestState<T> {
  loading: boolean,
  data: T,
  error: boolean,
  makeApiCall: () => Promise<void>;
}

function useRequest(url: string): { data: any[]; makeApiCall: (params) => Promise<void>; loading: boolean; error: boolean } {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ data, setData ] = useState<any[]>(null);
  const [ error, setError ] = useState<boolean>(false);
  let cancelTokenSource: CancelTokenSource;

  const makeApiCall = async (_params) => {
    try {
      setLoading(true);
      cancelTokenSource = axios.CancelToken.source();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await axios.get(url, { params: _params });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment
      setData((prevState) => [...(prevState ? prevState : []), ...response.data]);
      setError(false);
    } catch (err) {
      if(!axios.isCancel(err)) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Request canceled due to component unmount.')
      }
    }
  }, [])

  return {
    loading,
    data,
    error,
    makeApiCall
  }
}

export default useRequest;
