import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import { useEffect } from "react";

interface Props {
  page: number;
  limit: number;
  setTotalItems: (total: number) => void;
}

export default function MailsGallery ({ page, limit, setTotalItems }:Props) {
  const { data, error, isLoading } = useSWR(`http://localhost:3000/mails?start=${page*limit}&limit=${limit}`, fetcher)

  useEffect(() => {
    if(data) {
      setTotalItems(data.total)
    }
  }, [data])

  return (
    <div className="mt-0 mx-auto w-fit grid gap-4 grid-cols-4 h-[776px]">
      {isLoading && (<p>Loading ...</p>)}
      {error && (<p>Une erreur est survenue :(</p>)}
      {
        data && data.data.map((mail, key) => (
          <a href={`/${mail.id}`} key={`${key}-${mail.mailNo}`} target="_blank">
            <div className="w-64 h-96 rounded-lg bg-white">
              <div className="px-4 py-2">
                <span className="text-xs text-slate-400">{mail.date}</span>
                <p className="font-semibold text-sm text-black">{mail.subject}</p>
              </div>
              <div className="mt-4 p-4">
                <img
                  className="w-64 h-64 object-cover object-top"
                  src={mail.screenshot} alt={mail.subject}
                />
              </div>
            </div>
          </a>
        ))
      }
    </div>
  )
}