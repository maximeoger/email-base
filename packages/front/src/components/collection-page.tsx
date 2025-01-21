import { Button } from "@nextui-org/react";
import CollectionResults from "./collections-results";
import ModalManager from "./modal-manager";
import { useCollectionModals } from "src/hooks/useCollectionModals";

export default function CollectionPage () {
  const { openCreateCollectionModal } = useCollectionModals()

  return (
    <>
      <section className="px-20 mt-20">
        <Button className="bg-grey-800 text-grey-100" onClick={openCreateCollectionModal}>Create collection</Button>
        <div className="flex gap-4 flex-wrap">
          <CollectionResults 
            onCreateCollectionClick={openCreateCollectionModal}
          />
        </div>
      </section>
      <ModalManager />
    </>
  )
}