import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInjection } from "src/core/service";
import { useModal } from "src/hooks/useModal";
import {
  CollectionAPIRepositoryUID,
  ICollectionAPIRepository,
} from "src/models/api/collections";

export function useDeleteCollection() {
  const router = useInjection<ICollectionAPIRepository>(
    CollectionAPIRepositoryUID,
  );
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: async (id: string) => router.deleteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collection"],
        exact: true,
        refetchType: "active",
      });
    },
    onError: () => alert("Failed to delete collection"),
    onSettled: () => closeModal(),
  });

  return {
    onDeleteCollection: (id: string) => mutateAsync(id),
    isDeletingCollection: isPending,
    isError: error,
    isSuccess,
  };
}
