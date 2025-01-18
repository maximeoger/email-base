import { useMutation } from "@tanstack/react-query";
import { useInjection } from "src/core/service";
import { IMailAPIRepository, MailAPIRepositoryUID } from "src/models/api/mails";
import { AddMailToCollection } from "src/models/mail";

export function useAddMailToCollection () {
  const router = useInjection<IMailAPIRepository>(MailAPIRepositoryUID)
  //const queryClient = useQueryClient()

  const {  mutateAsync, isPending, error, isSuccess  } = useMutation({
    mutationFn: async (body: AddMailToCollection) => router.addMailToCollection(body),
    onSuccess: () => {},
    onError: () => {},
  })

  return {
    onAddMailToCollection: (body: AddMailToCollection) => mutateAsync(body),
    isAddingMailToCollection: isPending,
    isError: error,
    isSuccess
  }
}