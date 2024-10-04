"use client"
import MailsContainer from "src/containers/mails"
import DataContainer from "./data-container"
import { useGetMailsInfinite } from "../api/mail/usecases/useGetMailsInfinite"
import useInfiniteScroll from "../hooks/useInfiniteScroll"


export default function MailResults () {
  const { data, error, isFetchingNextPage, fetchNextPage, isFetching, isLoading, hasNextPage } = useGetMailsInfinite()
  const { lastElementRef } = useInfiniteScroll({ fetchNextPage, isFetching, isLoading, hasNextPage })
  return (
    <div className="px-8 w-full">
      <DataContainer 
        loading={isLoading} 
        error={error} 
        isFetchingNextPage={isFetchingNextPage}
      >
        <div className="flex flex-col items-center">
          <MailsContainer mails={data} ref={lastElementRef}/>
        </div>
      </DataContainer>
    </div>
  )
}
