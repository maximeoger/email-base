import useRequest from "./helpers/useRequest";
import usePagination from "./helpers/usePagination";
import './index.css'
import {useEffect} from "react";

type ReturnType = Array<string>
const LIMIT = 8;

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { page, nextPage } = usePagination(0, 8);
  const { loading, data, error, makeApiCall } = useRequest<ReturnType>('http://localhost:3000/mails');

  useEffect(() => {
    if(page !== null) {
      const doFetch = async () => await makeApiCall({ start: page, limit: LIMIT });
      void doFetch()
    }
  }, [page])

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
            data && data.map((mail, key) => (
              <div className="w-64 rounded-lg bg-white" key={`${key}-${mail.mailNo}`}>
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
          <button className="button" onClick={() => nextPage()}>Charger plus</button>
        </div>
      </div>
    </>
  )
}

export default App
