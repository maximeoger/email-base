import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInjection } from "src/core/service";
import { CollectionAPIRepositoryUID, ICollectionAPIRepository } from "src/models/api/collections";

export function useDeleteCollection () {
  const router = useInjection<ICollectionAPIRepository>(CollectionAPIRepositoryUID)
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: async (id: string) => router.deleteCollection(id),
    onSuccess: () => {
      alert("Successfully deleted collection");
      queryClient.invalidateQueries({
        queryKey: ['collection'],
        exact: true,
        refetchType: 'active',
      })
    },
    onError: () => alert("Failed to delete collection")
  })

  return {
    onDeleteCollection: (id: string) => mutateAsync(id),
    isDeletingCollection: isPending,
    isError: error,
    isSuccess
  }
  
}