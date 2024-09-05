import { useGetMails } from "../api/mail";
import DataContainer from "../components/data-container";
import Pagination from "../components/pagination";
import MailsContainer from "../containers/mails";
import PageLayout from "../layouts/page-layout"


export default function Home() {
  const { mails, loading, error } = useGetMails(`?min=${0}&max=${100}`)

  return (
    <PageLayout>
      <div className="px-8">
        <DataContainer loading={loading} error={error} >
          <div className="flex flex-col gap-4 items-center">
            <MailsContainer mails={mails} />
            <Pagination/>
          </div>
        </DataContainer>
      </div>
    </PageLayout>
  )
}