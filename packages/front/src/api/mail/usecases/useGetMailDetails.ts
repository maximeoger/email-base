import { queryOptions, useQuery } from "@tanstack/react-query";
import { useInjection } from "../../../core/service";
import { IMailAPIRepository, MailAPIRepositoryUID } from "../../../models/api/mails";

export function useGetMailDetails(id: string) {
  
  const router = useInjection<IMailAPIRepository>(MailAPIRepositoryUID);

  const queryOpts = queryOptions({
    queryKey: ["mail-details", id],
    queryFn: () => router.getMailDetails(id),
  })

  const { data, error, isLoading } = useQuery(queryOpts)
  
  return {
    mail: data || undefined, 
    loadingGetMailDetails: isLoading,
    errorGetMailDetails: error ? error["message"] : ""
  }
}