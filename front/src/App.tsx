import axios, { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react'
import './index.css'
import {resolveBaseUrl} from "vite";

interface RequestState<T> {
  loading: boolean,
  data: T,
  error: boolean,
  makeApiCall: () => Promise<void>;
}

function useRequest(url: string, params: RequestParams): RequestState<any> {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ data, setData ] = useState<any>(null);
  const [ error, setError ] = useState<boolean>(false);

  const makeApiCall = async () => {
    try {
      const response = await axios.get(url, { params });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setError(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setError(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setLoading(false);
    }

  };

  useEffect(() => {
    void makeApiCall();
  }, [])

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loading,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error,
    makeApiCall
  }
}

type ReturnType = Array<string>
type RequestParams = { from: string, limit: number }

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { loading, data, error, makeApiCall } = useRequest<ReturnType>('http://localhost:3000/mails',{from: '2023-07-01', limit: 8});

  return (
    <>
      <div className="mx-auto px-2 sm:px-4 lg:px-8">
        <span className="leading-9">e-mail base</span>
      </div>

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="mt-0 mx-auto w-fit grid gap-4 grid-cols-4">
          {loading && (<p>Loading ...</p>)}
          {error && (<p>Une erreur est survenue :(</p>)}
          {
            data && data.map(mail => (
              <div className="w-64 rounded-lg bg-white">
                <div className="px-4 py-2">
                  <span className="text-xs text-slate-400">{mail.date}</span>
                  <p className="font-semibold text-sm">{mail.subject}</p>
                </div>
                <div className="mt-4 p-4">
                  <img
                    className="w-64 h-64 object-cover object-top"
                    src={mail.screenshot} alt={mail.subject}
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div>
          <button className="button">Charger plus</button>
        </div>
      </div>
    </>
  )
}

export default App
