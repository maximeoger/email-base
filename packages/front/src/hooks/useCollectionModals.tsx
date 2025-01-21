import ConfirmModal from "src/components/modals/confirm-modal";
import { useModal } from "./useModal";
import { useDeleteCollection } from "src/api/collection/usecases/useDeleteCollection";
import CollectionModal from "src/components/modals/collection-modal";
import { CollectionDto, CreateCollectionDto, UpdateCollectionDto } from "shared/types/collection";
import { useUpdateCollection } from "src/api/collection/usecases/useUpdateCollection";
import { useCreateCollection } from "src/api/collection/usecases/useCreateCollection";

interface IProps {
  data: CollectionDto
}

export const useCollectionModals = (props?: Partial<IProps>) => {
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
        title="Create collection"
        cancelText="Go Back"
        actionText="Create collectioon"
        onCancel={closeModal}
        onConfirm={handleConfirmCreate}
      />,
      { size: "xl" },
    );

  const openConfirmModal = () =>
    openModal(
      <ConfirmModal
        title="Delete collection"
        message={`Are you sure you want to delete collection ${name} ?`}
        cancelText="No get back"
        actionText="yes delete it"
        onCancel={handleClose}
        onConfirm={handleConfirmDelete}
      />,
      { size: "xl" },
    );

  const openEditCollectionModal = () => 
    openModal(
      <CollectionModal
        title="Edit collection"
        actionText="Update collection"
        cancelText="Cancel"
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