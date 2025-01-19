import { queryOptions, useQuery } from "@tanstack/react-query";
import { useInjection } from "../../../core/service";
import { CollectionAPIRepositoryUID, ICollectionAPIRepository } from "../../../models/api/collections";

export function useGetCollections() {
  const router = useInjection<ICollectionAPIRepository>(CollectionAPIRepositoryUID);

  const queryOpts = queryOptions({
    queryKey: ["collection"],
    queryFn: () => router.getCollections(),
  })

  const { data, error, isLoading } = useQuery(queryOpts)

  return {
    collections: data || [],
    loadingGetCollections: isLoading,
    errorGetCollections: error ? error["message"] : "",
    getCollectionsQueryOptions: queryOptions
  }
}