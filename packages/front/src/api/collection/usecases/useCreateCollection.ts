import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInjection } from "src/core/service";
import { CollectionAPIRepositoryUID, ICollectionAPIRepository } from "src/models/api/collections";
import { CreateCollectionDto } from "shared/types/collection";

export function useCreateCollection () {
  const router = useInjection<ICollectionAPIRepository>(CollectionAPIRepositoryUID)
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: async (collectionCreate: CreateCollectionDto) => router.createCollection(collectionCreate),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ['collection'],
      exact: true,
      refetchType: 'active',
    }),
    onError: () => alert("Failed to create collection"),
  })

  return {
    onCreateCollection: (collectionCreate: CreateCollectionDto) => mutateAsync(collectionCreate),
    isCreatingCollection: isPending,
    isError: error,
    isSuccess
  }
  
}