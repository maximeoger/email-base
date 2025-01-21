"use client";
import { Button } from "@nextui-org/react";
import { useModal } from "../../hooks/useModal";
import CollectionResults from "src/components/collections-results";
import ModalManager from "src/components/modal-manager";
import PageServiceContainer from "src/components/page-service-container";
import CollectionModal from "src/components/modals/collection-modal";

export default function Collections() {
  const { openModal, closeModal } = useModal();

  const onOpen = () =>
    openModal(
      <CollectionModal
        title="Create collection"
        cancelText="Go Back"
        actionText="Create collectioon"
        onCancel={closeModal}
        onConfirm={() => alert("create")}
      />,
      { size: "xl" },
    );

  return (
    <PageServiceContainer>
      <section className="px-20 mt-20">
        <Button className="bg-grey-800 text-grey-100" onClick={onOpen}>Create collection</Button>
        <div className="flex gap-4 flex-wrap">
          <CollectionResults 
            onCreateCollectionClick={onOpen}
          />
        </div>
      </section>
      <ModalManager />
    </PageServiceContainer>
  );
}
