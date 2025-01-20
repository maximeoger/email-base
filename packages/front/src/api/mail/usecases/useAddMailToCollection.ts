import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInjection } from "src/core/service";
import { IMailAPIRepository, MailAPIRepositoryUID } from "src/models/api/mails";
import { AddMailToCollectionDto } from "shared/types/mail";

export function useAddMailToCollection() {
  const router = useInjection<IMailAPIRepository>(MailAPIRepositoryUID);
  const queryClient = useQueryClient();

  const invalidateGetCollections = () =>
    queryClient.invalidateQueries({ queryKey: ["collection"] });

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: async (body: AddMailToCollectionDto) =>
      router.addMailToCollection(body),
    onSuccess: invalidateGetCollections,
    onError: () => alert("Failed to add email to collection"),
  });

  return {
    onAddMailToCollection: (body: AddMailToCollectionDto) => mutateAsync(body),
    isAddingMailToCollection: isPending,
    isError: error,
    isSuccess,
  };
}
