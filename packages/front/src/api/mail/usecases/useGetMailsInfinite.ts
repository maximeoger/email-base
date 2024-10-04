import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { useInjection } from "../../../core/service";
import { IMailAPIRepository, MailAPIRepositoryUID } from "../../../models/api/mails";
import { useMemo } from "react";

export function useGetMailsInfinite() {
  const router = useInjection<IMailAPIRepository>(MailAPIRepositoryUID);

  const queryOpts = infiniteQueryOptions({
    queryKey: ["mails"],
    queryFn: ({ pageParam }) => router.getMails(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })

  const { 
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(queryOpts)

  const mails = useMemo(() => {
    return data?.pages.reduce((acc, { results }) => {
      return [...acc, ...results];
    }, []);
  }, [data]);

  return {
    fetchNextPage,
    hasNextPage,
    data: mails,
    isFetching,
    isFetchingNextPage,
    isLoading,
    error: error ? error["message"] : ""
  }
}