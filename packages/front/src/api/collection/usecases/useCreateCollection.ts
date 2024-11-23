import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInjection } from "src/core/service";
import { useModal } from "src/hooks/useModal";
import { CollectionAPIRepositoryUID, ICollectionAPIRepository } from "src/models/api/collections";
import { CollectionFormValues } from "src/models/collection";

export function useCreateCollection () {
  const router = useInjection<ICollectionAPIRepository>(CollectionAPIRepositoryUID)
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: async (collectionCreate: CollectionFormValues) => router.createCollection(collectionCreate),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ['collection'],
      exact: true,
      refetchType: 'active',
    }),
    onError: () => alert("Failed to create collection"),
    onSettled: () => closeModal()
  })

  return {
    onCreateCollection: (collectionCreate: CollectionFormValues) => mutateAsync(collectionCreate),
    isCreatingCollection: isPending,
    isError: error,
    isSuccess
  }
  
}