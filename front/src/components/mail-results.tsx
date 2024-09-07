import MailsContainer from "src/containers/mails"
import DataContainer from "./data-container"
import Pagination from "./pagination"
import { useGetMails } from "src/api/mail/usecases/useGetMails"
import { useState } from "react"


export default function MailResults () {
  const [ page, setPage ] = useState(0)
  const { mails, loading, error } = useGetMails(`?page=${page}&limit=${10}`)

  return (
    <div className="px-8">
      <DataContainer loading={loading} error={error} >
        <div className="flex flex-col gap-4 items-center">
          <MailsContainer mails={mails} />
          <Pagination page={page} onChange={(page) => setPage(page)}/>
        </div>
      </DataContainer>
    </div>
  )
}
