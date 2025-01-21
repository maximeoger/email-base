import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInjection } from "src/core/service";
import {
  CollectionAPIRepositoryUID,
  ICollectionAPIRepository,
} from "src/models/api/collections";
import { UpdateCollectionDto } from "shared/types/collection";


interface MutationParams {
  body: UpdateCollectionDto;
  id: number;
}

export function useUpdateCollection() {
  const router = useInjection<ICollectionAPIRepository>(
    CollectionAPIRepositoryUID,
  );
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: async ({ body, id }: MutationParams) => router.updateCollection(body, id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["collection"],
        exact: true,
        refetchType: "active",
      }),
    onError: () => alert("Failed to update collection"),
  });

  return {
    onUpdateCollection: (collectionUpdate: UpdateCollectionDto, id: number) => mutateAsync({ body: collectionUpdate, id }),
    isUpdatingCollection: isPending,
    isError: error,
    isSuccess,
  };
}
