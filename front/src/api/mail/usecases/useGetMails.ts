import { queryOptions, useQuery } from "@tanstack/react-query";
import { useInjection } from "../../../core/service";
import { IMailAPIRepository, MailAPIRepositoryUID } from "../../../models/api/mails";

export function useGetMails (query: string) {
  const router = useInjection<IMailAPIRepository>(MailAPIRepositoryUID);

  const queryOpts = queryOptions({
    queryKey: ["mails", query],
    queryFn: () => router.getMails(query),
    enabled: !!query
  })

  const { data, error, isLoading } = useQuery(queryOpts)

  return {
    mails: data || [],
    loading: isLoading,
    error: error ? error["message"] : ""
  }
}