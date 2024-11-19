import { queryOptions, useQuery } from "@tanstack/react-query";
import * as services from "../../../core/service";
import { CollectionAPIRepositoryUID, ICollectionAPIRepository } from "../../../models/api/collections";

export function useGetCollections() {
  const router = services.useInjection<ICollectionAPIRepository>(CollectionAPIRepositoryUID)
  
  const queryOpts = queryOptions({
    queryKey: ["collection"],
    queryFn: () => router.getCollections()
  })

  const { data, error, isLoading } = useQuery(queryOpts)

  return {
    collections: data || [],
    loading: isLoading,
    error: error ? error["message"] : "",
    getCollectionsQueryOptions: queryOptions
  }
}