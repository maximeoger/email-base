import ConfirmModal from "src/components/modals/confirm-modal";
import { useModal } from "./useModal";
import { useDeleteCollection } from "src/api/collection/usecases/useDeleteCollection";
import CollectionModal from "src/components/modals/collection-modal";
import { CollectionDto, CreateCollectionDto, UpdateCollectionDto } from "shared/types/collection";
import { useUpdateCollection } from "src/api/collection/usecases/useUpdateCollection";
import { useCreateCollection } from "src/api/collection/usecases/useCreateCollection";
import { useTranslations } from "next-intl";

interface IProps {
  data: CollectionDto
}

export const useCollectionModals = (props?: Partial<IProps>) => {
  const t = useTranslations("modals");
  const { onDeleteCollection } = useDeleteCollection();
  const { onUpdateCollection } = useUpdateCollection();
  const { onCreateCollection } = useCreateCollection();
  
  const { openModal, closeModal } = useModal();

  const { data } = props || {};

  const handleClose = () => closeModal();

  
  const handleConfirmDelete = () =>
    onDeleteCollection(`${data?.id}`).then(handleClose);

  const handleConfirmEdit = (values: UpdateCollectionDto) => 
    onUpdateCollection(values, data?.id || 0).then(handleClose);

  const handleConfirmCreate = (values: CreateCollectionDto) => 
    onCreateCollection(values).then(handleClose)



  const openCreateCollectionModal = () =>
    openModal(
      <CollectionModal
        title={t('create_collection_modal.title')}
        cancelText={t('create_collection_modal.cancel')}
        actionText={t('create_collection_modal.confirm')}
        onCancel={closeModal}
        onConfirm={handleConfirmCreate}
      />,
      { size: "xl" },
    );

  const openConfirmModal = (name: string) =>
    openModal(
      <ConfirmModal
        title={t('delete_collection_modal.title')}
        message={t('delete_collection_modal.message', { name })}
        cancelText={t('delete_collection_modal.cancel')}
        actionText={t('delete_collection_modal.confirm')}
        onCancel={handleClose}
        onConfirm={handleConfirmDelete}
      />,
      { size: "xl" },
    );

  const openEditCollectionModal = () => 
    openModal(
      <CollectionModal
        title={t('update_collection_modal.title')}
        actionText={t('update_collection_modal.confirm')}
        cancelText={t('create_collection_modal.cancel')}
        defaultValues={{
          name: data?.name || "",
          description: data?.description || ""
        }}
        onCancel={handleClose}
        onConfirm={handleConfirmEdit}
      />,
      { size: "xl" },
    )  


    return {
      openCreateCollectionModal,
      openConfirmModal,
      openEditCollectionModal
    }
}