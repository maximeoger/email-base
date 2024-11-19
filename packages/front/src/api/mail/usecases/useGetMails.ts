import { queryOptions, useQuery } from "@tanstack/react-query";
import { useInjection } from "../../../core/service";
import { IMailAPIRepository, MailAPIRepositoryUID } from "../../../models/api/mails";

export function useGetMails(cursor: number) {
  
  const router = useInjection<IMailAPIRepository>(MailAPIRepositoryUID);

  const queryOpts = queryOptions({
    queryKey: ["mails", cursor],
    queryFn: () => router.getMails(cursor),
    //enabled: !!cursor
  })

  const { data, error, isLoading } = useQuery(queryOpts)

  return {
    mails: data?.results || [],
    loading: isLoading,
    error: error ? error["message"] : ""
  }
}