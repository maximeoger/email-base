import { queryOptions, useQuery } from "@tanstack/react-query";
import { useInjection } from "../../../core/service";
import { ISenderAPIRepository, SenderAPIRepositoryUID } from "src/models/api/senders";

export function useGetSenders() {
  const router = useInjection<ISenderAPIRepository>(SenderAPIRepositoryUID);

  const queryOpts = queryOptions({
    queryKey: ["senders"],
    queryFn: () => router.getSenders(),
    //enabled: !!cursor
  });

  const { data, error, isLoading } = useQuery(queryOpts);

  return {
    senders: data?.results || [],
    loading: isLoading,
    error: error ? error["message"] : "",
  };
}
